import React from "react";
import { Footer, Navbar } from "../components";
const ContactPage = () => {
  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center page-header" style={{color: 'var(--primary-green)'}}>
          <i className="fa fa-envelope me-3"></i>Contact Us
        </h1>
        <p className="text-center lead text-muted mb-4">We'd love to hear from you! Get in touch with us for any queries about our plants.</p>
        <hr style={{borderColor: 'var(--light-green)', borderWidth: '2px'}} />
        <div class="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form>
              <div class="form my-3">
                <label for="Name" className="form-label"><i className="fa fa-user me-2"></i>Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="Name"
                  placeholder="Enter your name"
                />
              </div>
              <div class="form my-3">
                <label for="Email" className="form-label"><i className="fa fa-envelope me-2"></i>Email</label>
                <input
                  type="email"
                  class="form-control"
                  id="Email"
                  placeholder="name@example.com"
                />
              </div>
              <div class="form  my-3">
                <label for="Message" className="form-label"><i className="fa fa-message me-2"></i>Message</label>
                <textarea
                  rows={5}
                  class="form-control"
                  id="Message"
                  placeholder="Enter your message"
                />
              </div>
              <div className="text-center">
                <button
                  class="my-2 px-4 mx-auto btn btn-nature"
                  type="submit"
                >
                  <i className="fa fa-paper-plane me-2"></i>Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactPage;
