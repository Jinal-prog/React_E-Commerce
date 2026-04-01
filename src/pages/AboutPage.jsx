import React from 'react'
import { Footer, Navbar } from "../components";
const AboutPage = () => {
  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center page-header">About Us</h1>
        <p className="text-center text-muted mb-4">Discover our passion for quality plants and gardening</p>
        <hr style={{borderColor: 'var(--light-green)', borderWidth: '2px'}} />
        <p className="lead text-center">
          Welcome to our verdant destination for quality plants and gardening supplies. 
          With years of experience in horticulture, we are passionate about bringing the beauty of nature 
          into your homes and gardens. Our mission is to provide healthy, vibrant plants along with expert 
          guidance to help you create your perfect green space. From beautiful flowering plants to medicinal 
          herbs and fruit-bearing trees, we offer a diverse selection carefully nurtured in our nursery. 
          We believe that everyone deserves access to nature's beauty, and we're committed to making 
          gardening accessible, enjoyable, and rewarding for all our customers.
        </p>

        <h2 className="text-center py-4" style={{color: 'var(--primary-green)'}}>Our Plant Categories</h2>
        <div className="row g-4">
          <div className="col-md-3 col-sm-6">
            <div className="card card-custom h-100" style={{display: 'flex', flexDirection: 'column'}}>
              <div style={{height: '250px', overflow: 'hidden', backgroundColor: '#f0f7ed', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <img className="img-fluid" src="/assets/images/rose.png" alt="Flowering Plants" style={{width: '100%', height: '100%', objectFit: 'contain', padding: '10px'}} />
              </div>
              <div className="card-body text-center" style={{flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                <h5 className="card-title" style={{color: 'var(--primary-green)', marginBottom: '1rem', fontWeight: 'bold'}}>Flowering Plants</h5>
                <p className="text-muted" style={{fontSize: '0.95rem', marginBottom: '0', flexGrow: 1, display: 'flex', alignItems: 'center'}}>Beautiful blooms for your garden including roses, hibiscus, jasmine, and more.</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6">
            <div className="card card-custom h-100" style={{display: 'flex', flexDirection: 'column'}}>
              <div style={{height: '250px', overflow: 'hidden', backgroundColor: '#f0f7ed', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <img className="img-fluid" src="/assets/images/moneyplant.png" alt="Indoor Plants" style={{width: '100%', height: '100%', objectFit: 'contain', padding: '10px'}} />
              </div>
              <div className="card-body text-center" style={{flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                <h5 className="card-title" style={{color: 'var(--primary-green)', marginBottom: '1rem', fontWeight: 'bold'}}>Indoor Plants</h5>
                <p className="text-muted" style={{fontSize: '0.95rem', marginBottom: '0', flexGrow: 1, display: 'flex', alignItems: 'center'}}>Perfect air-purifying plants for your home including money plant, peace lily, and aloe vera.</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6">
            <div className="card card-custom h-100" style={{display: 'flex', flexDirection: 'column'}}>
              <div style={{height: '250px', overflow: 'hidden', backgroundColor: '#f0f7ed', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <img className="img-fluid" src="/assets/images/mangoplant.png" alt="Fruit Plants" style={{width: '100%', height: '100%', objectFit: 'contain', padding: '10px'}} />
              </div>
              <div className="card-body text-center" style={{flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                <h5 className="card-title" style={{color: 'var(--primary-green)', marginBottom: '1rem', fontWeight: 'bold'}}>Fruit Plants</h5>
                <p className="text-muted" style={{fontSize: '0.95rem', marginBottom: '0', flexGrow: 1, display: 'flex', alignItems: 'center'}}>Grow your own fresh fruits with mango, guava, lemon, pomegranate, and banana trees.</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6">
            <div className="card card-custom h-100" style={{display: 'flex', flexDirection: 'column'}}>
              <div style={{height: '250px', overflow: 'hidden', backgroundColor: '#f0f7ed', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <img className="img-fluid" src="/assets/images/MintPlant.png" alt="Medicinal Plants" style={{width: '100%', height: '100%', objectFit: 'contain', padding: '10px'}} />
              </div>
              <div className="card-body text-center" style={{flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                <h5 className="card-title" style={{color: 'var(--primary-green)', marginBottom: '1rem', fontWeight: 'bold'}}>Medicinal Plants</h5>
                <p className="text-muted" style={{fontSize: '0.95rem', marginBottom: '0', flexGrow: 1, display: 'flex', alignItems: 'center'}}>Natural healing with tulsi, neem, mint, ashwagandha, and curry leaf plants.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-md-12">
            <h3 className="text-center mb-4" style={{color: 'var(--secondary-green)'}}>Why Choose Us?</h3>
            <div className="row">
              <div className="col-md-4 text-center mb-4">
                <i className="fa fa-leaf fa-3x mb-3" style={{color: 'var(--light-green)'}}></i>
                <h5>Quality Plants</h5>
                <p className="text-muted">All our plants are carefully grown and nurtured with expert care.</p>
              </div>
              <div className="col-md-4 text-center mb-4">
                <i className="fa fa-truck fa-3x mb-3" style={{color: 'var(--light-green)'}}></i>
                <h5>Safe Delivery</h5>
                <p className="text-muted">We ensure safe packaging and timely delivery to your doorstep.</p>
              </div>
              <div className="col-md-4 text-center mb-4">
                <i className="fa fa-users fa-3x mb-3" style={{color: 'var(--light-green)'}}></i>
                <h5>Expert Support</h5>
                <p className="text-muted">Our team provides ongoing guidance for plant care and maintenance.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default AboutPage
