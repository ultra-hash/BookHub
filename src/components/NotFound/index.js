import {Component} from 'react'
import {Link} from 'react-router-dom'

import './index.css'

class NotFound extends Component {
  render() {
    return (
      <div className="not-found-page">
        <img
          className="not-found-image"
          src="https://res.cloudinary.com/dxcascpje/image/upload/f_auto,q_auto/v1/BookHub/Page-Not-Found"
          alt="not found"
        />
        <h1 className="not-found-heading">Page Not Found</h1>
        <p className="not-found-message">
          we are sorry, the page you requested could not be found. Please go
          back to the homepage.
        </p>
        <Link to="/" className="not-found-goto-home-link">
          <button type="button" className="not-found-goto-home-button">
            Go Back To Home
          </button>
        </Link>
      </div>
    )
  }
}

export default NotFound
