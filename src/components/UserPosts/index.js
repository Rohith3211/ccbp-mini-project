/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/button-has-type */
import {Component} from 'react'
import {BsChat} from 'react-icons/bs'
import {Link} from 'react-router-dom'
import {IoShareSocial} from 'react-icons/io5'
import {FcLike} from 'react-icons/fc'
import {VscHeart} from 'react-icons/vsc'
import Comments from '../Comments'
import './index.css'

class UserPosts extends Component {
  state = {love: false}

  changeLike = () => {
    const {apiCallingForLikeUnlike, details} = this.props
    this.setState({love: true})
    apiCallingForLikeUnlike(details.postId, true)
  }

  changeToUnlike = () => {
    const {apiCallingForLikeUnlike, details} = this.props
    this.setState({love: false})
    apiCallingForLikeUnlike(details.postId, false)
  }

  render() {
    const {details} = this.props
    const {
      comments,
      createdAt,
      likesCount,
      postDetails,
      profilePic,
      userId,
      userName,
    } = details

    const {love} = this.state

    return (
      <div className="users-post-card">
        <div className="post-card1">
          <div className="post-profile-card">
            <img src={profilePic} alt="name" />
          </div>

          <Link className="name" to={`/user/${userId}`}>
            <h4>{userName}</h4>
          </Link>
        </div>

        <img className="image-post" src={postDetails.image_url} alt="name" />

        <div className="lines">
          <div>
            {love ? (
              <button className="love-btn" onClick={this.changeToUnlike}>
                <FcLike className="icons" />
              </button>
            ) : (
              <button className="love-btn" onClick={this.changeLike}>
                <VscHeart className="icons" />
              </button>
            )}

            <BsChat className="icons" />
            <IoShareSocial className="icons" />
          </div>

          <p>{likesCount} likes</p>
          <p className="li-para">{postDetails.caption}</p>

          {comments.map(each => (
            <Comments key={each.user_id} details={each} />
          ))}
          <p className="ago">{createdAt}</p>
        </div>
      </div>
    )
  }
}

export default UserPosts
