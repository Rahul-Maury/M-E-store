import React from "react";
import "./Contact.css";
import { Button } from "@material-ui/core";

const Contact = () => {
  return (
    <div className="contactContainer">
      <a className="mailBtn" href="mailto:rahul23iet@gmail.com">
        <Button>Contact: rahul23iet@gmail.com</Button>
      </a>
    </div>
  );
};

export default Contact;
