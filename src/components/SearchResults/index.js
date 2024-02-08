/* eslint-disable jsx-a11y/control-has-associated-label */
import {Component} from 'react'
import {IoIosSearch} from 'react-icons/io'
import Cookies from 'js-cookie'
import Header from '../Header'
import UserPosts from '../UserPosts'

import './index.css'

class SearchResults extends Component {
  state = {userSearch: '', search: false, result: []}

  clickToChange = event => {
    this.setState({userSearch: event.target.value})
  }

  getApiCalling = async () => {
    const {userSearch} = this.state

    if (userSearch.length >= 1) {
      const url = `https://apis.ccbp.in/insta-share/posts?search=${userSearch}`
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

      this.setState({search: true, result: postList})
    }
  }

  apiCallingForLikeUnlike = async (id, status) => {
    const {result} = this.state
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

    const updatedPostList = result.map(eachObj => {
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
    this.setState({result: updatedPostList})
  }

  render() {
    const {result, search, userSearch} = this.state
    return (
      <div>
        <Header />
        <div className="main-search-card">
          <h1 className="h-text">Search Results</h1>

          <div className="s-card">
            <div className="search-box-mobile">
              <input
                className="search-input-box"
                type="search"
                value={userSearch}
                placeholder="Search Caption"
                onChange={this.clickToChange}
              />
              <button
                className="search-button"
                type="button"
                onClick={this.getApiCalling}
              >
                <IoIosSearch className="icon" />
              </button>
            </div>

            {search ? (
              <div>
                {result.length >= 1 ? (
                  <div>
                    {result.map(each => (
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
                  </div>
                )}
              </div>
            ) : (
              <div className="under-card">
                <img
                  src="https://res.cloudinary.com/ddijifpqi/image/upload/v1706104902/Frame_1473_yfvtxs.png"
                  alt="search"
                />
                <p>Search Results will be appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default SearchResults
