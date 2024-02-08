/* eslint-disable react/no-unused-state */
/* eslint-disable jsx-a11y/alt-text */
import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class LoginPage extends Component {
  state = {username: '', password: '', response: false}

  onSubmitFunction = event => {
    event.preventDefault()
    this.getApiCall()
  }

  getApiCall = async () => {
    const {username, password} = this.state

    const userDetails = {username, password}

    const url = 'https://apis.ccbp.in/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const request = await fetch(url, options)
    const data = await request.json()

    if (request.ok === true) {
      Cookies.set('jwt_token', data.jwt_token, {expires: 10})
      const {history} = this.props
      history.replace('/')
    } else {
      this.setState({response: data.error_msg})
    }
  }

  updatingUserName = event => {
    this.setState({username: event.target.value})
  }

  updatingPassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, response} = this.state

    console.log(username, password)

    if (Cookies.get('jwt_token') !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-container">
        <div className="login-image">
          <img
            className="login-img"
            src="https://res.cloudinary.com/ddijifpqi/image/upload/v1701613058/Illustration_l4h6iq.png"
            alt="website login"
          />
        </div>
        <div className="login-card">
          <div className="main-head-logo">
            <img
              className="small-img"
              src="https://res.cloudinary.com/ddijifpqi/image/upload/v1701613049/Group_zffi6s.png"
              alt="website logo"
            />
            <h1 className="inst-head">Insta Share</h1>
          </div>
          <form onSubmit={this.onSubmitFunction}>
            <div className="input-card">
              <label className="label" htmlFor="name">
                USERNAME
              </label>
              <br />
              <input
                className="input-box"
                id="name"
                type="text"
                onChange={this.updatingUserName}
              />
            </div>
            <div className="input-card">
              <label className="label" htmlFor="password">
                PASSWORD
              </label>
              <br />
              <input
                className="input-box"
                id="password"
                type="password"
                onChange={this.updatingPassword}
              />
            </div>
            {response && <p className="error-msg">{response}</p>}
            <button className="log-button" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default LoginPage
