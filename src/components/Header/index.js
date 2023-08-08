import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {RiCloseCircleFill} from 'react-icons/ri'
import {GiHamburgerMenu} from 'react-icons/gi'
import Cookies from 'js-cookie'

import './index.css'

class Header extends Component {
  state = {showMenu: false}

  toggleMenu = () => {
    this.setState(prevState => ({
      showMenu: !prevState.showMenu,
    }))
  }

  onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    console.log()
    history.replace('/login')
  }

  checkIsActiveLink = link => {
    const {match} = this.props
    const {path} = match
    if (link === path) {
      return true
    }
    return false
  }

  render() {
    const {showMenu} = this.state

    return (
      <nav>
        <div className="Header-section-main">
          <div className="Header-section">
            <img
              className="Header-websiteLogo"
              src="https://res.cloudinary.com/dxcascpje/image/upload/f_auto,q_auto/v1/BookHub/logo"
              alt="website logo"
            />
            <ul className="Header-UnorderedList Header-show-above-md">
              <li>
                <Link
                  to="/"
                  className={
                    this.checkIsActiveLink('/')
                      ? 'Header-Link Header-Link-Active'
                      : 'Header-Link'
                  }
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/shelf"
                  className={
                    this.checkIsActiveLink('/shelf')
                      ? 'Header-Link Header-Link-Active'
                      : 'Header-Link'
                  }
                >
                  BookShelf
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  className="Header-Logout-Btn"
                  onClick={this.onClickLogout}
                >
                  Logout
                </button>
              </li>
            </ul>
            <GiHamburgerMenu
              size={16}
              className="Header-show-below-md"
              onClick={this.toggleMenu}
            />
          </div>
        </div>
        {showMenu && (
          <div className="Header-section Header-show-below-md">
            <ul className="Header-UnorderedList">
              <li>
                <Link
                  to="/"
                  className={
                    this.checkIsActiveLink('/')
                      ? 'Header-Link Header-Link-Active'
                      : 'Header-Link'
                  }
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/shelf"
                  className={
                    this.checkIsActiveLink('/shelf')
                      ? 'Header-Link Header-Link-Active'
                      : 'Header-Link'
                  }
                >
                  BookShelf
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  className="Header-Logout-Btn"
                  onClick={this.onClickLogout}
                >
                  Logout
                </button>
              </li>
              <li>
                <RiCloseCircleFill size={24} onClick={this.toggleMenu} />
              </li>
            </ul>
          </div>
        )}
      </nav>
    )
  }
}

export default withRouter(Header)
