import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <div className="Footer-Container">
    <ul className="Footer-SocialIconsContainer">
      <li>
        <FaGoogle className="Footer-icon" />
      </li>
      <li>
        <FaTwitter className="Footer-icon" />
      </li>
      <li>
        <FaInstagram className="Footer-icon" />
      </li>
      <li>
        <FaYoutube className="Footer-icon" />
      </li>
    </ul>
    <p className="Footer-Description">Contact Us</p>
  </div>
)

export default Footer
