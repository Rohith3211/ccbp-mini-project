/* eslint-disable import/no-unresolved */
import {Component} from 'react'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import Loader from 'react-loader-spinner'
import UserStories from '../UserStories'
import UserPosts from '../UserPosts'
import Header from '../Header'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

class HomePage extends Component {
  state = {
    storyList: [],
    postList: [],
    postStatus: 'LOAD',
    storyStatus: 'LOAD',
  }

  componentDidMount() {
    this.getApiCalls()
    this.getApiCallsTwo()
  }

  getApiCalls = async () => {
    const url = 'https://apis.ccbp.in/insta-share/stories'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${Cookies.get('jwt_token')}`,
      },
    }

    const request = await fetch(url, options)

    if (request.ok === true) {
      const data = await request.json()

      const storyList = data.users_stories.map(each => ({
        id: each.user_id,
        userName: each.user_name,
        storyUrl: each.story_url,
      }))

      this.setState({storyList, storyStatus: 'SUCCESS'})
    } else {
      this.setState({storyStatus: 'FAIL'})
    }
  }

  getApiCallsTwo = async () => {
    const url = 'https://apis.ccbp.in/insta-share/posts'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${Cookies.get('jwt_token')}`,
      },
    }

    const request = await fetch(url, options)

    if (request.ok === true) {
      const data = await request.json()
      console.log(data)
      const postList = data.posts.map(eachPost => ({
        comments: eachPost.comments,
        createdAt: eachPost.created_at,
        likesCount: eachPost.likes_count,
        postDetails: eachPost.post_details,
        postId: eachPost.post_id,
        profilePic: eachPost.profile_pic,
        userId: eachPost.user_id,
        userName: eachPost.user_name,
      }))

      this.setState({postList, postStatus: 'SUCCESS'})
    } else {
      this.setState({postStatus: 'FAIL'})
    }
  }

  apiCallingForLikeUnlike = async (id, status) => {
    const {postList} = this.state
    console.log(id, status)

    const likeStatus = {
      like_status: status,
    }

    const url = `https://apis.ccbp.in/insta-share/posts/${id}/like`
    const options = {
      method: 'POST',

      headers: {
        Authorization: `Bearer ${Cookies.get('jwt_token')}`,
      },
      body: JSON.stringify(likeStatus),
    }

    const data = await fetch(url, options)
    const response = await data.json()
    console.log(response)

    const updatedPostList = postList.map(eachObj => {
      if (eachObj.postId === id && status) {
        return {
          ...eachObj,
          likesCount: eachObj.likesCount + 1,
        }
      }
      if (eachObj.postId === id && !status) {
        return {
          ...eachObj,
          likesCount: eachObj.likesCount - 1,
        }
      }
      return {...eachObj}
    })
    this.setState({postList: updatedPostList})
  }

  successView = () => {
    const {postList} = this.state
    return (
      <div>
        {postList.length >= 1 ? (
          <div>
            {postList.map(each => (
              <UserPosts
                key={each.postId}
                details={each}
                apiCallingForLikeUnlike={this.apiCallingForLikeUnlike}
              />
            ))}
          </div>
        ) : (
          <div className="result-search">
            <img
              src="https://res.cloudinary.com/ddijifpqi/image/upload/v1701613034/Group_1_e1gykq.png"
              alt="no"
            />
            <h3>Search Not Found</h3>
            <p>Try different keyword or search again</p>
            <button
              type="button"
              className="retry-btn"
              onClick={this.getApiCallsTwo}
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    )
  }

  spinnerLoading = () => (
    <div className="get-card">
      <div className="loading-card">
        <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
      </div>
    </div>
  )

  failureView = () => (
    <div className="get-card">
      <img
        src="https://res.cloudinary.com/ddijifpqi/image/upload/v1701612886/ifzo9idafkcfphfk3y3s.png"
        alt="fail"
      />
      <p>Something went wrong. Please try again</p>
      <button type="button" className="retry-btn" onClick={this.getApiCallsTwo}>
        Try again
      </button>
    </div>
  )

  reactSlider = () => {
    const {storyList} = this.state
    return (
      <div className="slider-container">
        <Slider
          slidesToShow={7}
          responsive={[
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
              },
            },
          ]}
          slidesToScroll={1}
        >
          {storyList.map(eachStory => (
            <UserStories key={eachStory.id} details={eachStory} />
          ))}
        </Slider>
      </div>
    )
  }

  smallSpinner = () => (
    <div className="card-load">
      <Loader type="TailSpin" color="#00BFFF" height={30} width={30} />
    </div>
  )

  functionOfStory = () => {
    const {storyStatus} = this.state

    switch (storyStatus) {
      case 'LOAD':
        return this.smallSpinner()
      case 'SUCCESS':
        return this.reactSlider()
      default:
        return null
    }
  }

  functionOfPost = () => {
    const {postStatus} = this.state

    switch (postStatus) {
      case 'LOAD':
        return this.spinnerLoading()
      case 'SUCCESS':
        return this.successView()
      case 'FAIL':
        return this.failureView()
      default:
        return null
    }
  }

  searchingResultFunction = async key => {
    console.log(key)

    this.setState({postStatus: 'LOAD'})

    const url = `https://apis.ccbp.in/insta-share/posts?search=${key}`
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${Cookies.get('jwt_token')}`},
    }

    const request = await fetch(url, options)

    const data = await request.json()

    const postList = data.posts.map(eachPost => ({
      comments: eachPost.comments,
      createdAt: eachPost.created_at,
      likesCount: eachPost.likes_count,
      postDetails: eachPost.post_details,
      postId: eachPost.post_id,
      profilePic: eachPost.profile_pic,
      userId: eachPost.user_id,
      userName: eachPost.user_name,
    }))

    this.setState({postList, postStatus: 'SUCCESS'})
  }

  render() {
    return (
      <>
        <Header searchingResultFunction={this.searchingResultFunction} />
        <div className="home-card">
          <div className="inner-home-card">
            {this.functionOfStory()}
            {this.functionOfPost()}
          </div>
        </div>
      </>
    )
  }
}

export default HomePage
