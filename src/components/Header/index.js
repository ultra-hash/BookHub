import {Component} from 'react'
import {Link} from 'react-router-dom'
import './index.css'

class Header extends Component {
  state = {}

  render() {
    return (
      <nav>
        <div className="Header-section">
          <div className="Header-mobile-section">
            <img
              className="Header-websiteLogo"
              src="https://res.cloudinary.com/dxcascpje/image/upload/f_auto,q_auto/v1/BookHub/logo"
              alt="website logo"
            />
            <ul className="Header-UnorderedList">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/shelf">BookShelf</Link>
              </li>
              <li>
                <button type="button">Logout</button>
              </li>
            </ul>
          </div>
        </div>
        <div className="Header-mobile-section">
          <ul className="Header-UnorderedList">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/shelf">BookShelf</Link>
            </li>
            <li>
              <button type="button">Logout</button>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default Header
