import React from "react";
import playStore from "../../../images/PlayStore.png";
import appStore from "../../../images/Appstore.png";
import "./Footer.css";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={playStore} alt="playstore" />
        <img src={appStore} alt="Appstore" />
      </div>

      <div className="midFooter">
        <h1>DIGITAL BOUNCER</h1>
        <p>This Web site was created as Major Project by team number 15 under the guidance of Mr Kapil Verma sir  </p>

        <pre>TEAM MEMBERS :<br></br>
            Shubhangi Misra 2000560100102<br></br>
            Yogita Shukla 2000560100123<br></br>
            Ali Askari 2000560100067<br></br>
            Md Suleman 200560100069<br></br>
            Nimish Chaturvedi 2000560100075<br></br>
            
        </pre>
      </div>

      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="https://www.facebook.com/nimish.nimish.98/">facebook</a><br></br>
        <a href="https://www.instagram.com/chaturvedinimish/">Instagram</a><br></br>
        <a href="https://www.linkedin.com/in/nimish-chaturvedi-9b27321bb/">linkedin</a>
      </div>
    </footer>
  );
};

export default Footer;