/* eslint-disable react/button-has-type */
import {Component} from 'react'
import './index.css'

class NotFound extends Component {
  getCall = () => {
    const {history} = this.props

    history.replace('/')
  }

  render() {
    return (
      <div className="not-found">
        <img
          src="https://res.cloudinary.com/ddijifpqi/image/upload/v1701612915/vynppnxlnbhqfeupupr0.png"
          alt="page not found"
        />
        <h1>Page Not Found</h1>
        <p>
          we are sorry, the page you requested could not be found. Please go
          back to the homepage.
        </p>

        <button className="home-btn" onClick={this.getCall}>
          Home Page
        </button>
      </div>
    )
  }
}

export default NotFound
