import React from "react";
import "./aboutSection.css";
import { Button, Typography, Avatar } from "@material-ui/core";

const About = () => {
  const visitInstagram = () => {
    window.location = "https://instagram.com/chaturvedinimish";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Photos.png"
              alt="Founder"
            />
            <Typography>Nimish Chaturvedi</Typography>
            <Button onClick={visitInstagram} color="primary">
              Visit Instagram
            </Button>
            <span>
            This is a software selling wesbite made by group 15  based on subscritpion model  
            Only with the purpose for college major project 4th year
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Our Team</Typography>
            <h4> Md Ali Askari</h4>
            <h4> Nimish Chaturvedi</h4>
            <h4> Shubhangi Misra</h4>
            <h4> Yogita Shukla</h4>
            <h4> Md Suleman</h4>

            
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;