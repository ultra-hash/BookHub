import {Component} from 'react'

import './index.css'

class Login extends Component {
  render() {
    return (
      <div className="login-container">
        <div className="image-container">
          <img
            className="login-image"
            src="https://res.cloudinary.com/dxcascpje/image/upload/f_auto,q_auto/v1/BookHub/login-page-image"
            alt="website login"
          />
        </div>
        <div className="login-form-container">
          <form className="login-form">
            <img
              className="login-website-logo mb-32px md-mb-56px"
              src="https://res.cloudinary.com/dxcascpje/image/upload/f_auto,q_auto/v1/BookHub/logo"
              alt="login website logo"
            />
            <div className="login-form-item">
              <label className="login-form-label" htmlFor="login-form-username">
                Username*
              </label>
              <input
                className="login-form-input"
                id="login-form-username"
                type="username"
                placeholder="username"
              />
            </div>
            <div className="login-form-item mt-16px md-mt-24px">
              <label className="login-form-label" htmlFor="login-form-password">
                Password*
              </label>
              <input
                className="login-form-input"
                id="login-form-password"
                type="password"
                placeholder="password"
              />
            </div>
            <p className="login-form-error-message">Error Message </p>
            <div className="login-form-item mt-24px">
              <button className="login-form-btn" type="submit">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
