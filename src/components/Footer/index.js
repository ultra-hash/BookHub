import {Component} from 'react'
import {FaGoogle, FaInstagram, FaTwitter, FaYoutube} from 'react-icons/fa'

import './index.css'

class Footer extends Component {
  render() {
    return (
      <div className="footer-container">
        <div className="footer-icons-container">
          <li>
            <FaGoogle className="footer-icon" />
          </li>
          <li>
            <FaTwitter className="footer-icon" />
          </li>
          <li>
            <FaInstagram className="footer-icon" />
          </li>
          <li>
            <FaYoutube className="footer-icon" />
          </li>
        </div>
        <p className="footer-contact-us">Contact Us</p>
      </div>
    )
  }
}

export default Footer
