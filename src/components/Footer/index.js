import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <div className="Footer-Container">
    <div className="Footer-SocialIconsContainer">
      <FaGoogle className="Footer-icon" />
      <FaTwitter className="Footer-icon" />
      <FaInstagram className="Footer-icon" />
      <FaYoutube className="Footer-icon" />
    </div>
    <p className="Footer-Description">Contact Us</p>
  </div>
)

export default Footer
