import React from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../components";

const PageNotFound = () => {
  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <div className="container">
          <div className="row">
            <div className="col-md-12 py-5 text-center" style={{backgroundColor: 'var(--bg-light)', borderRadius: '15px'}}>
              <i className="fa fa-exclamation-triangle fa-5x mb-4" style={{color: 'var(--accent-green)'}}></i>
              <h4 className="p-3 display-5" style={{color: 'var(--primary-green)'}}>404: Page Not Found</h4>
              <p className="lead text-muted mb-4">The page you're looking for doesn't exist or has been moved.</p>
              <Link to="/" className="btn btn-nature">
                <i className="fa fa-arrow-left me-2"></i> Go Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageNotFound;
