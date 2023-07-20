import {Component} from 'react'
import Cookies from 'js-cookie'

import './index.css'

class LoginView extends Component {
  state = {username: '', password: '', errorMsg: '', showErrorMsg: false}

  onSubmitLoginForm = async event => {
    event.preventDefault()
    this.setState({showErrorMsg: false})

    const {username, password} = this.state

    const url = 'https://apis.ccbp.in/login'
    const userDetails = {
      username,
      password,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      this.onSuccess(data.jwt_token)
    } else {
      this.onFailure(data.error_msg)
    }
  }

  onSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 1})
    const {history} = this.props
    history.replace('/')
  }

  onFailure = errorMsg => {
    this.setState({errorMsg, showErrorMsg: true})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, errorMsg, showErrorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      const {history} = this.props
      history.replace('/')
    }
    return (
      <div className="loginView-outerContainer">
        <div className="loginView-imageContainer">
          <img
            className="loginView-image"
            src="https://res.cloudinary.com/dxcascpje/image/upload/v1689770930/BookHub/login-page-image.png"
            alt="website login"
          />
        </div>
        <div className="loginView-loginContainer">
          <div className="loginView-loginFormContainer">
            <img
              className="loginView-logo"
              src="https://res.cloudinary.com/dxcascpje/image/upload/f_auto,q_auto/v1/BookHub/logo"
              alt="login website logo"
            />
            <form className="loginView-form" onSubmit={this.onSubmitLoginForm}>
              <div className="loginView-formItemContainer">
                <label
                  htmlFor="loginView-username"
                  className="loginView-formLabel"
                >
                  Username*
                </label>
                <input
                  className="loginView-inputItem"
                  type="text"
                  placeholder="Username"
                  id="loginView-username"
                  value={username}
                  onChange={this.onChangeUsername}
                />
              </div>
              <div className="loginView-formItemContainer">
                <label
                  htmlFor="loginView-password"
                  className="loginView-formLabel"
                >
                  Password*
                </label>
                <input
                  className="loginView-inputItem"
                  type="password"
                  placeholder="Password"
                  id="loginView-password"
                  value={password}
                  onChange={this.onChangePassword}
                />
              </div>

              {showErrorMsg && (
                <p className="loginView-errorMessage">{errorMsg}</p>
              )}

              <button className="loginView-loginButton" type="submit">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default LoginView
