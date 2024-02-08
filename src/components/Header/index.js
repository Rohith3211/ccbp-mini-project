/* eslint-disable react/no-unused-state */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/button-has-type */
import {withRouter, Link} from 'react-router-dom'
import {Component} from 'react'
import Cookies from 'js-cookie'

import {IoIosSearch} from 'react-icons/io'
import {FiMenu} from 'react-icons/fi'
import {MdCancel} from 'react-icons/md'

import './index.css'

class Header extends Component {
  state = {isShow: false, searchKey: ''}

  showTheItems = () => {
    this.setState(prevState => ({isShow: !prevState.isShow}))
  }

  toClickLogOut = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  toNavigate = () => {
    const {history} = this.props
    history.push('/')
  }

  searchingWord = event => {
    this.setState({searchKey: event.target.value})
  }

  toSearchClick = () => {
    const {searchKey} = this.state
    const {searchingResultFunction} = this.props
    if (searchKey.length >= 1) {
      searchingResultFunction(searchKey)
    }
  }

  render() {
    const {isShow, searchKey} = this.state

    return (
      <nav className="nav-item">
        <div className="navbar">
          <div className="nav-img-card">
            <button onClick={this.toNavigate}>
              <img
                src="https://res.cloudinary.com/ddijifpqi/image/upload/v1701613049/Group_zffi6s.png"
                alt="icon"
              />
            </button>
            <h1>Insta Share</h1>
          </div>
          <div className="nav-card-two">
            <div className="search-box">
              <input
                type="search"
                placeholder="Search Caption"
                onChange={this.searchingWord}
                value={searchKey}
              />

              <button
                className="search-btn"
                type="button"
                onClick={this.toSearchClick}
              >
                <IoIosSearch className="icon" />
              </button>
            </div>
            <Link className="style" to="/">
              <p className="home">Home</p>
            </Link>
            <Link className="style" to="/profile">
              <p>Profile</p>
            </Link>
            <button
              className="logout"
              type="button"
              onClick={this.toClickLogOut}
            >
              Logout
            </button>
          </div>
          <button className="nav-icon-btn" onClick={this.showTheItems}>
            <FiMenu />
          </button>
        </div>
        {isShow === true ? (
          <div>
            <div className="nav-card-second">
              <Link className="style" to="/">
                <p>Home</p>
              </Link>
              <Link className="style" to="/search">
                <p className="home">Search</p>
              </Link>

              <Link className="style" to="/profile">
                <p>Profile</p>
              </Link>

              <button
                className="logout"
                type="button"
                onClick={this.toClickLogOut}
              >
                Logout
              </button>
              <MdCancel onClick={this.showTheItems} />
            </div>
          </div>
        ) : null}
      </nav>
    )
  }
}

export default withRouter(Header)
