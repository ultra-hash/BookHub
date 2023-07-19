import {Component} from 'react'

import './index.css'

class LoginView extends Component {
  state = {username: '', password: ''}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password} = this.state
    return (
      <div className="loginView-outerContainer">
        <div className="loginView-imageContainer">
          <img
            className="loginView-image"
            src="https://res.cloudinary.com/dxcascpje/image/upload/v1689770930/BookHub/login-page-image.png"
            alt="login"
          />
        </div>
        <div className="loginView-loginContainer">
          <div className="loginView-loginFormContainer">
            <img
              className="loginView-logo"
              src="https://res.cloudinary.com/dxcascpje/image/upload/f_auto,q_auto/v1/BookHub/logo"
              alt="website logo"
            />
            <form className="loginView-form">
              <div className="loginView-formItemContainer">
                <label htmlFor="loginView-username">Username*</label>
                <input
                  className="loginView-inputItem"
                  type="text"
                  placeholder="USERNAME"
                  id="loginView-username"
                  value={username}
                  onChange={this.onChangeUsername}
                />
              </div>
              <div className="loginView-formItemContainer">
                <label htmlFor="loginView-password">Password*</label>
                <input
                  className="loginView-inputItem"
                  type="password"
                  placeholder="PASSWORD"
                  id="loginView-password"
                  value={password}
                  onChange={this.onChangePassword}
                />
              </div>
              <div className="loginView-formItemContainer">
                <button className="loginView-loginButton" type="submit">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default LoginView
