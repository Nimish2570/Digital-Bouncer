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
            Welcome to the Epic Software Emporium, crafted by the Magnificent Group 15!

Because why just learn when you can code your way to greatness?

Greetings, dear internet traveler! You've stumbled upon the digital oasis where 1s and 0s dance in perfect harmony, brought to life by the legendary Group 15, embarking on their final quest before graduation – the mythical college major project of the 4th year!

What Wonders Await You:

Our Software Symphony: Behold, an orchestra of digital delights! From productivity powerhouses to entertainment extravaganzas, our collection of software marvels is here to dazzle and delight.

Subscription Shenanigans: Who needs a gym membership when you can flex your software muscles with our subscription model? Join the elite ranks of our subscribers and unlock a treasure trove of digital wonders!

Contact Us (If You Dare): Need guidance from the tech wizards of Group 15? Fear not, for our Contact Page awaits your inquiries! Just be sure to bring your sense of humor – we don't take ourselves too seriously.

About Us (The Legends Themselves): Curious about the minds behind this digital extravaganza? Prepare to be amazed by tales of caffeine-fueled coding marathons and debugging adventures that rival the wildest of fantasy novels!

Admin Realm (Reserved for the Brave): Venture into the Admin Panel if you dare! Here lies the domain of Group 15, where software listings are born, user subscriptions are managed, and bugs are vanquished with a swift keystroke.

So, dear traveler, strap in for a journey through the realms of code and creativity, guided by the intrepid souls of Group 15. May your clicks be swift, your downloads be speedy, and your sense of humor be ever ready for the unexpected quirks of our digital domain!

Disclaimer: No programmers were harmed in the making of this website. Well, maybe a few stubbed toes from late-night coding sessions. But it's all in the name of science, right?
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