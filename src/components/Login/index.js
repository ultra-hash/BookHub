import {Component} from 'react'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', showError: false, errorMessage: ''}

  render() {
    const {username, password, showError, errorMessage} = this.state

    const handleOnChangeUsername = event => {
      this.setState({username: event.target.value})
    }

    const handleOnChangePassword = event => {
      this.setState({password: event.target.value})
    }

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
                value={username}
                onChange={handleOnChangeUsername}
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
                value={password}
                onChange={handleOnChangePassword}
              />
            </div>
            {showError && (
              <p className="login-form-error-message">{errorMessage}</p>
            )}
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
