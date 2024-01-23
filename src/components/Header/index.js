import {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {GiHamburgerMenu} from 'react-icons/gi'
import {IoIosCloseCircle} from 'react-icons/io'

import './index.css'

class Header extends Component {
  state = {showMenu: false}

  handelOnLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  handleOnClickShowMenu = () => {
    const {showMenu} = this.state
    if (!showMenu) {
      this.setState({showMenu: true})
    }
  }

  handleOnClickCloseMenu = () => {
    const {showMenu} = this.state
    if (showMenu) {
      this.setState({showMenu: false})
    }
  }

  renderMobileMenu = currentPath => (
    <ul className="navbar-menu mobile-menu">
      <li>
        <Link
          to="/"
          className={`navbar-link ${currentPath === '/' && 'active'}`}
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          to="/shelf"
          className={`navbar-link ${currentPath === '/shelf' && 'active'}`}
        >
          Bookshelves
        </Link>
      </li>
      <li>
        <button
          className="navbar-logout-btn"
          type="button"
          onClick={this.handelOnLogout}
        >
          logout
        </button>
      </li>
      <li className="close-menu-icon">
        <button type="button" onClick={this.handleOnClickCloseMenu}>
          <IoIosCloseCircle size={24} />
        </button>
      </li>
    </ul>
  )

  render() {
    const {showMenu} = this.state
    const {match} = this.props
    return (
      <nav>
        <div>
          <div className="navbar-container">
            <div>
              <Link to="/">
                <img
                  className="navbar-website-logo"
                  src="https://res.cloudinary.com/dxcascpje/image/upload/f_auto,q_auto/v1/BookHub/logo"
                  alt="website logo"
                />
              </Link>
            </div>
            <div className="mobile-menu-icon">
              <button type="button" onClick={this.handleOnClickShowMenu}>
                <GiHamburgerMenu size={24} color="#475569" />
              </button>
            </div>
            <ul className="navbar-menu hide-menu">
              <li>
                <Link
                  to="/"
                  className={`navbar-link ${match.path === '/' && 'active'}`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/shelf"
                  className={`navbar-link ${
                    match.path === '/shelf' && 'active'
                  }`}
                >
                  Bookshelves
                </Link>
              </li>
              <li>
                <button
                  className="navbar-logout-btn"
                  type="button"
                  onClick={this.handelOnLogout}
                >
                  logout
                </button>
              </li>
            </ul>
          </div>
        </div>
        {showMenu && this.renderMobileMenu(match.path)}
      </nav>
    )
  }
}

export default withRouter(Header)
