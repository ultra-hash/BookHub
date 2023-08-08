import {Component} from 'react'
import {Link} from 'react-router-dom'
import {RiCloseCircleFill} from 'react-icons/ri'
import {GiHamburgerMenu} from 'react-icons/gi'
import './index.css'

class Header extends Component {
  state = {showMenu: false}

  toggleMenu = () => {
    this.setState(prevState => ({
      showMenu: !prevState.showMenu,
    }))
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
                <Link to="/" className="Header-Link">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/shelf" className="Header-Link">
                  BookShelf
                </Link>
              </li>
              <li>
                <button type="button" className="Header-Logout-Btn">
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
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/shelf">BookShelf</Link>
              </li>
              <li>
                <button type="button" className="Header-Logout-Btn">
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

export default Header
