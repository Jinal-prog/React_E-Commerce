import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="footer-custom">
        <div className="container">
          <div className="row">
            {/* About Section */}
            <div className="col-md-4 mb-4">
              <h5>About Us</h5>
              <p className="text-white-50">
                Your trusted source for quality plants, flowers, and gardening supplies. 
                We bring nature closer to you with a wide variety of flowering, indoor, 
                fruit, and medicinal plants.
              </p>
              <img src="/assets/images/Logo.png" alt="Logo" width="80" height="80" className="mt-2" />
            </div>

            {/* Quick Links Section */}
            <div className="col-md-4 mb-4">
              <h5>Quick Links</h5>
              <ul className="list-unstyled">
                <li>
                  <Link to="/">
                    <i className="fa fa-home me-2"></i>Home
                  </Link>
                </li>
                <li>
                  <Link to="/product">
                    <i className="fa fa-leaf me-2"></i>Our Plants
                  </Link>
                </li>
                <li>
                  <Link to="/about">
                    <i className="fa fa-info-circle me-2"></i>About Us
                  </Link>
                </li>
                <li>
                  <Link to="/contact">
                    <i className="fa fa-envelope me-2"></i>Contact Us
                  </Link>
                </li>
                <li>
                  <Link to="/cart">
                    <i className="fa fa-shopping-cart me-2"></i>Shopping Cart
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact & Follow Us Section */}
            <div className="col-md-4 mb-4">
              <h5>Contact & Follow Us</h5>
              <p className="text-white-50">
                <i className="fa fa-map-marker me-2"></i>12 nursery garden, Ahmedabad<br/>
                <i className="fa fa-phone me-2"></i>+91 97141 97141<br/>
                <i className="fa fa-envelope me-2"></i>pateljinal611@gmail.com
              </p>
              <div className="d-flex gap-2 mt-3">
                <a className="social-icon" href="https://facebook.com" target="_blank" rel="noreferrer">
                  <i className="fa fa-facebook"></i>
                </a>
                <a className="social-icon" href="https://twitter.com" target="_blank" rel="noreferrer">
                  <i className="fa fa-twitter"></i>
                </a>
                <a className="social-icon" href="https://instagram.com" target="_blank" rel="noreferrer">
                  <i className="fa fa-instagram"></i>
                </a>
                <a className="social-icon" href="https://youtube.com" target="_blank" rel="noreferrer">
                  <i className="fa fa-youtube"></i>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="footer-bottom text-center">
            <p className="mb-0 text-white-50">
              © 2026 All Rights Reserved. | Made with <i className="fa fa-heart text-danger"></i> for Plant Lovers
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
