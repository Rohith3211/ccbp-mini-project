/* eslint-disable no-lone-blocks */
import {Component} from 'react'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Header from '../Header'
import Stories from '../Stories'
import Posts from '../Posts'

import './index.css'

class MyProfile extends Component {
  state = {profile: {}, status: 'INITIAL'}

  componentDidMount() {
    this.getApiCall()
  }

  getApiCall = async () => {
    const url = 'https://apis.ccbp.in/insta-share/my-profile'

    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${Cookies.get('jwt_token')}`},
    }

    const request = await fetch(url, options)

    if (request.ok === true) {
      const data = await request.json()
      console.log(data)
      const profileObj = {
        userName: data.profile.user_name,
        userId: data.profile.user_id,
        id: data.profile.id,
        userBio: data.profile.user_bio,
        followersCount: data.profile.followers_count,
        followingCount: data.profile.following_count,
        postsCount: data.profile.posts_count,
        posts: data.profile.posts,
        profilePic: data.profile.profile_pic,
        stories: data.profile.stories,
      }

      this.setState({profile: profileObj, status: 'SUCCESS'})
    } else {
      this.setState({status: 'FAIL'})
    }
  }

  loadingSpinner = () => (
    <div>
      <Header />
      <div className="loading-card">
        <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
      </div>
    </div>
  )

  componentRender = () => {
    const {profile} = this.state

    const {
      userName,
      stories,
      userBio,
      followersCount,
      followingCount,
      postsCount,
      posts,
      profilePic,
    } = profile
    return (
      <div>
        <Header />
        <div className="p-card">
          <div className="profile-card">
            <div className="profile-card1">
              <img className="image" src={profilePic} alt={profilePic} />
              <div className="rahul-card">
                <h1 className="head">{userName}</h1>
                <ul className="posts-card">
                  <li>
                    {postsCount} <span>posts</span>
                  </li>
                  <li>
                    {followersCount} <span>followers</span>
                  </li>
                  <li>
                    {followingCount} <span>following</span>
                  </li>
                </ul>
                <h2 className="head-2">{userName}</h2>
                <p className="bio">{userBio}</p>
              </div>
            </div>

            <ul className="stories-card">
              {stories.map(each => (
                <Stories key={each.id} details={each} />
              ))}
            </ul>

            <hr />
            <div className="post-box">
              <img
                src="https://res.cloudinary.com/ddijifpqi/image/upload/v1702394484/u8jzkbpifr1hthqeu0ym.png"
                alt="post"
              />
              <h4>Posts</h4>
            </div>
            <div className="my-posts">
              {posts.map(eachP => (
                <Posts details={eachP} key={eachP.id} />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  failureView = () => (
    <div>
      <Header />
      <div className="fail-img">
        <img
          src="https://res.cloudinary.com/ddijifpqi/image/upload/v1701612905/sqow6g3v7kpkzphzlffd.png"
          alt="fail"
        />
        <h4>Something went wrong. Please try again</h4>
        <button className="try-btn" type="button" onClick={this.getApiCall}>
          Try again
        </button>
      </div>
    </div>
  )

  render() {
    const {status} = this.state

    {
      switch (status) {
        case 'INITIAL':
          return this.loadingSpinner()
        case 'SUCCESS':
          return this.componentRender()
        case 'FAIL':
          return this.failureView()
        default:
          return null
      }
    }
  }
}

export default MyProfile
