import {Component} from 'react'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', showError: false, errorMessage: ''}

  componentDidMount() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken) {
      const {history} = this.props
      history.replace('/')
    }
  }

  handleOnLoginSuccess = jwtToken => {
    Cookies.set('jwt_token', `Bearer ${jwtToken}`, {expires: 1})
    const {history} = this.props
    history.replace('/')
  }

  handleOnLoginFailure = errorMsg => {
    this.setState({errorMessage: errorMsg, showError: true})
  }

  handleOnSubmitForm = async event => {
    event.preventDefault()

    const {username, password} = this.state
    const userDetails = {
      username,
      password,
    }
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (data.jwt_token) {
      return this.handleOnLoginSuccess(data.jwt_token)
    }
    return this.handleOnLoginFailure(data.error_msg)
  }

  handleOnChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  handleOnChangePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, showError, errorMessage} = this.state

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
          <form className="login-form" onSubmit={this.handleOnSubmitForm}>
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
                onChange={this.handleOnChangeUsername}
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
                onChange={this.handleOnChangePassword}
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
