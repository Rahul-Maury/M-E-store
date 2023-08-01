import React from 'react'
import playStore from '../../../images/playstore.png'
import appStore from '../../../images/appstore.png';
import '../Footer/Footer.css'
const Footer = () => {
  return (
    <footer id="footer">
        <div className='leftFooter'>
          <h4>DOWNLOAD OUR APP</h4>
          <p>Download App for Android and  IOS moblie phone</p>
          <img src={playStore} alt="playstore"/>
          <img src={appStore} alt="appstore"/>
        </div>

        <div className='midFooter'>
            <h1>Gifts And Surprises</h1>
            <p>High Quality is our first priority</p>
            <p>Copyrights 2022 &copy; RahulMaurya</p>
        </div>

        <div className='rightFooter'>
            <h4>Follow Us</h4>
            <a href=" ">Instagram</a>
            <a href=" ">YouTube</a>
            <a href=" ">Facebook</a>
        </div>
    </footer>
  )
}

export default Footer