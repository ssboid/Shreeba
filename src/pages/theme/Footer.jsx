import React from 'react';
import LMB from "../../assets/brand/Cover.png";

const Footer = () => {
  return (
    <div className="footer">
      <div className="newsletterbox">
        {/* <div className="newssub">
          <div className="labelheading">
            Subscribe to our newsletter
          </div>
          <div className="newsletterform">
            <form >
              <input type="text" className="nlfinput" name="nlname" placeholder="Name.." />
              <input type="text" className="nlfinput" name="nlemail" placeholder="email@email.com" />
              <input type="submit" id="nlfsubmit" name="nlsend" value="Subscribe" />
            </form>
          </div>
        </div> */}
        <div className="bottomtext">
          <div className="btbox">
            <img src={LMB} id="logo2nd" alt="logo" /><br />
            Library Manager gives you the options to find the books you need.
          </div>
          <div className="btbox">
            <div className="btboxheading">
              Company
            </div>
            <div className="btboxitems">
              About
            </div>
            <div className="btboxitems">
              Features
            </div>
          </div>
          <div className="btbox">
            <div className="btboxheading">
              Help
            </div>
            <div className="btboxitems">
              Customer Support
            </div>
            <div className="btboxitems">
              Terms and conditions
            </div>
            <div className="btboxitems">
              Privacy Policy
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
