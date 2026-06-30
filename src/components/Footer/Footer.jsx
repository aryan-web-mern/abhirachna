import "./Footer.css";
import emailpng from "../../assets/icons/email.png";
import contactpng from "../../assets/icons/contact.png";
import locationpng from "../../assets/icons/location.png";

import instapng from "../../assets/icons/InstagramLogo1.svg";
import linkdenpng from "../../assets/icons/linkden.svg";
import youtubepng from "../../assets/icons/youtube.svg";
import facebookpng from "../../assets/icons/facebook.svg";
import pinterest from "../../assets/icons/pinterest.svg";
import { useNavigate } from "react-router-dom";
const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Brand Section */}
          <div className="brand-section">
            <h2 className="brand-title red-color">ABHIRACHNAA</h2>
            <p className="paragraph-large brand-tagline">
              Where Design Meets Perfection
            </p>
            <div className="social-links">
              <a
                href="https://www.instagram.com/abhirachnaa/"
                target="_blank"
                className="social-link"
              >
                <img src={instapng} alt="" />
              </a>
              <a
                href="https://www.facebook.com/abhirachnaa"
                target="_blank"
                className="social-link"
              >
                <img src={facebookpng} alt="" />
              </a>
              <a
                href="https://www.linkedin.com/in/abhirachnaa-solutions-78a2a9364/"
                target="_blank"
                className="social-link"
              >
                <img src={linkdenpng} alt="" />
              </a>
              <a
                href="https://www.youtube.com/@abhirachnaa
"
                className="social-link"
                target="_blank"
              >
                <img src={youtubepng} alt="" />
              </a>{" "}
              <a
                href="https://in.pinterest.com/abhirachnaasolutions/_profile/"
                target="_blank"
                className="social-link"
              >
                <img src={pinterest} alt="" />
              </a>
            </div>
          </div>

          {/* Legal Section */}
          <div className="bottomRight">
            <div className="footerLegal">
              <h4 className="footer-section-title red-color">Legal</h4>
              <div className="footer-links">
                <label className="label">
                  <a
                    className="footer-link"
                    onClick={() => navigate("/privacy-policy")}
                  >
                    Privacy Policy
                  </a>
                </label>
                <label className="label">
                  <a
                    className="footer-link"
                    onClick={() => navigate("/terms-of-use")}
                  >
                    Terms of Use
                  </a>
                </label>
              </div>
            </div>

            {/* Company Section */}
            <div className="footerCompany">
              <h4 className="footer-section-title red-color">Company</h4>
              <div className="footer-links">
                <label className="label">
                  <a
                    href="#"
                    className="footer-link"
                    onClick={() => {
                      navigate("/");
                    }}
                  >
                    Home
                  </a>
                </label>
                <label className="label">
                  <a
                    className="footer-link"
                    onClick={() => {
                      navigate("/about");
                    }}
                  >
                    About Us
                  </a>
                </label>
                <label className="label">
                  <a
                    className="footer-link"
                    onClick={() => {
                      navigate("/testmonials");
                    }}
                  >
                    Testimonials
                  </a>
                </label>
                <label className="label">
                  <a
                    className="footer-link"
                    onClick={() => {
                      navigate("/gallery");
                    }}
                  >
                    Gallery
                  </a>
                </label>
                <label className="label">
                  <a
                    className="footer-link"
                    onClick={() => {
                      navigate("/careers");
                    }}
                  >
                    Careers
                  </a>
                </label>
                <label className="label">
                  <a
                    className="footer-link"
                    onClick={() => {
                      navigate("/blogs");
                    }}
                  >
                    Blogs
                  </a>
                </label>
                <label className="label">
                  <a
                    className="footer-link"
                    onClick={() => {
                      navigate("/contact");
                    }}
                  >
                    Contact Us
                  </a>
                </label>
              </div>
            </div>

            {/* Connect Section */}
            <div className="connectBox">
              <h4 className="footer-section-title red-color">Connect</h4>
              <div className="connect-items">
                <div className="connect-item">
                  <img src={locationpng} alt="" className="img0" />
                  <label className=" label-medium connect-text">
                    SCO 63 Third Floor Commercial Pocket 2, Sector 66 First
                    Floor C, Mohali, Punjab - 160055, India
                  </label>
                </div>
                <div className="connect-phone">
                  <img src={contactpng} alt="" className="img2" />
                  <a href="tel:+917341102563">
                    <label className=" label-medium connect-text">
                      +91 7341102563
                    </label>
                  </a>
                </div>
                <div className="connect-email">
                  <img src={emailpng} alt="" className="img3" />
                  <a href="mailTo:sales@abhirachnaa.com">
                    <label className=" label-medium connect-text">
                      sales@abhirachnaa.com
                    </label>{" "}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="footer-bottom">
        <p>
          © 2025 Abhirachnaa. All Rights Reserved | <a href="https://psquarecompany.com/" target="_blank">Powered by Psquare Company</a>
        </p>
      </section>
    </footer>
  );
};

export default Footer;
