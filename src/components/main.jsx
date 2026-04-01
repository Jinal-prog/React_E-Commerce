import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import toast from "react-hot-toast";
import gsap from "gsap";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const dispatch = useDispatch();
  const slideRef = useRef(null);
  const envRef = useRef(null);
  const galleryRef = useRef(null);

  // Featured plants for home page
  const featuredPlants = [
    {
      id: 1,
      title: "Rose - Red Beautiful Flower",
      price: 299,
      images: ["/assets/images/rose.png", "/assets/images/rose.png"],
      category: "Flowering Plants",
      description: "Beautiful red roses for your garden and decoration",
      details: "Vibrant red roses that add elegance to any garden. Perfect for gardening enthusiasts and decoration lovers."
    },
    {
      id: 10,
      title: "Peace Lily - Air Purifier",
      price: 249,
      images: ["/assets/images/PeaceLily.png", "/assets/images/PeaceLily.png"],
      category: "Indoor Plants",
      description: "Peace lily to purify your indoor air",
      details: "Known for its air-purifying qualities, the Peace Lily thrives indoors and requires minimal care."
    },
    {
      id: 12,
      title: "Mango Plant - Fruit Tree",
      price: 499,
      images: ["/assets/images/mangoplant.png", "/assets/images/mangoplant1.png"],
      category: "Fruit Plants",
      description: "Fresh mango fruit tree for your garden",
      details: "Grow your own delicious mangoes with this healthy fruit tree. Perfect for tropical gardens."
    },
    {
      id: 20,
      title: "Mint Plant - Fresh Herb",
      price: 129,
      images: ["/assets/images/MintPlant.png", "/assets/images/MintPlant1.png", "/assets/images/MintPlant2.png"],
      category: "Medicinal Plants",
      description: "Fresh mint plant with small flowers",
      details: "Aromatic mint plant perfect for teas, cooking, and medicinal purposes. Easy to grow at home."
    },
    {
      id: 2,
      title: "Hibiscus - Colourful Bloom",
      price: 199,
      images: ["/assets/images/Hibiscus.png", "/assets/images/Hibiscus.png"],
      category: "Flowering Plants",
      description: "Vibrant hibiscus flowers with colorful blooms",
      details: "Stunning hibiscus with vibrant flowers that bloom throughout the year. Requires sunlight."
    },
    {
      id: 11,
      title: "Money Plant - Green Vine",
      price: 179,
      images: ["/assets/images/moneyplant.png", "/assets/images/moneyplant.png"],
      category: "Indoor Plants",
      description: "Lucky money plant creeper for decoration",
      details: "Easy-to-grow money plant that brings luck and prosperity. Perfect for offices and homes."
    },
  ];

  // Environment showcase data
  const environmentData = [
    {
      title: "Indoor Plants",
      image: "/assets/images/moneyplant.png",
      description: "Perfect for home offices and living spaces",
      color: "#e8f5e9"
    },
    {
      title: "Garden Plants",
      image: "/assets/images/rose.png",
      description: "Beautiful flowers to brighten your garden",
      color: "#fce4ec"
    },
    {
      title: "Medicinal Plants",
      image: "/assets/images/MintPlant.png",
      description: "Health and wellness from nature",
      color: "#fff3e0"
    },
    {
      title: "Fruit Plants",
      image: "/assets/images/mangoplant.png",
      description: "Fresh fruits from your own garden",
      color: "#f3e5f5"
    }
  ];

  const nurseryGalleryData = [
    {
      image: "/assets/images/rose1.png",
      title: "Fresh Morning Selection",
      details: "Hand-selected healthy blooms directly from our nursery rows every morning."
    },
    {
      image: "/assets/images/moneyplant1.png",
      title: "Indoor Care Ready",
      details: "Each indoor plant is checked for root strength, leaf quality, and easy home care."
    },
    {
      image: "/assets/images/mangoplant1.png",
      title: "Fruit Plant Nursery Zone",
      details: "Fruit saplings are nurtured in nutrient-rich beds for stronger growth and yield."
    },
    {
      image: "/assets/images/MintPlant1.png",
      title: "Medicinal Herb Section",
      details: "Our herb section focuses on aroma, freshness, and naturally disease-free growth."
    },
    {
      image: "/assets/images/Hibiscus1.jpg",
      title: "Blooming Flower Line",
      details: "Colorful flowering varieties are grown with balanced sunlight and watering cycles."
    },
    {
      image: "/assets/images/PeaceLily1.png",
      title: "Nursery Care & Packaging",
      details: "Plants are prepared with secure soil wrapping and care guidance before delivery."
    }
  ];

  // Animations on mount
  useEffect(() => {
    // Animate slide content
    if (slideRef.current) {
      gsap.fromTo(slideRef.current.querySelector('.slide-content'), 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );
      gsap.fromTo(slideRef.current.querySelector('.slide-image'), 
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" }
      );
    }

    // Animate environment cards on scroll
    if (envRef.current) {
      const cards = envRef.current.querySelectorAll('.env-card');
      gsap.fromTo(cards,
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.6, 
          stagger: 0.15,
          ease: "power2.out"
        }
      );
    }
  }, [currentSlide]);

  useEffect(() => {
    if (galleryRef.current) {
      const cards = galleryRef.current.querySelectorAll('.nursery-photo-card');
      gsap.fromTo(
        cards,
        { opacity: 0, y: 35, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          ease: 'power2.out',
          stagger: 0.16
        }
      );
    }
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredPlants.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredPlants.length) % featuredPlants.length);
  };

  const currentPlant = featuredPlants[currentSlide];

  const addToCart = (product) => {
    dispatch(addCart(product));
    toast.success("Added to cart!");
  };

  return (
    <>
      {/* Hero Section */}
      <div className="hero-custom">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 hero-content fade-in-up">
              <h1 className="display-3">Welcome to Our Plant Nursery</h1>
              <p className="lead">
                Discover a wide variety of beautiful plants for your home and garden. 
                From flowering plants to medicinal herbs, we have everything you need 
                to create your perfect green space.
              </p>
              <div className="mt-4">
                <Link href="/product" className="btn btn-nature btn-lg me-3" to="/product">
                  <i className="fa fa-leaf me-2"></i>Shop Plants
                </Link>
                <Link href="/about" className="btn btn-outline-nature btn-lg" to="/about">
                  <i className="fa fa-info-circle me-2"></i>Learn More
                </Link>
              </div>
              <div className="mt-4">
                <span className="badge bg-light text-success fs-6 me-2">
                  <i className="fa fa-truck me-1"></i> Free Delivery
                </span>
                <span className="badge bg-light text-success fs-6 me-2">
                  <i className="fa fa-shield me-1"></i> Quality Guaranteed
                </span>
                <span className="badge bg-light text-success fs-6">
                  <i className="fa fa-seedling me-1"></i> Organic Options
                </span>
              </div>
            </div>
            <div className="col-lg-6 text-center mt-4 mt-lg-0">
              <div className="hero-main-image-wrap">
                <img 
                  src="/assets/main.png.png" 
                  alt="Beautiful Plants" 
                  className="hero-main-image img-fluid rounded-3 shadow-lg"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Plant Collection Carousel */}
      <div style={{background: 'linear-gradient(135deg, #f0f7ed 0%, #e8f5e9 100%)', paddingTop: '60px', paddingBottom: '60px', position: 'relative', overflow: 'hidden'}}>
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="page-header" style={{color: 'var(--primary-green)', marginBottom: '1rem'}}>
              <i className="fa fa-leaf me-3"></i>Our Plant Collection
            </h2>
            <p style={{color: '#666', fontSize: '1.1rem'}}>Explore our premium selection of carefully curated plants</p>
          </div>

          <div ref={slideRef} className="row align-items-center">
            {/* Left Plant Image Section */}
            <div className="col-lg-5 d-flex justify-content-center mb-4 mb-lg-0">
              <div className="slide-image" style={{position: 'relative', width: '100%', maxWidth: '400px', height: '450px', background: 'white', borderRadius: '25px', boxShadow: '0 15px 40px rgba(0,0,0,0.15)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <img 
                  src={currentPlant.images[0]} 
                  alt={currentPlant.title} 
                  style={{width: '90%', height: '90%', objectFit: 'contain'}}
                />
                
                {/* Category Badge */}
                <div style={{position: 'absolute', top: '20px', left: '20px', zIndex: '10'}}>
                  <span className="badge" style={{background: 'linear-gradient(135deg, var(--secondary-green) 0%, var(--primary-green) 100%)', color: 'white', fontSize: '0.95rem', padding: '10px 16px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}>
                    {currentPlant.category}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Plant Details Section */}
            <div className="col-lg-7 ps-lg-5">
              <div className="slide-content">
                <h2 style={{color: 'var(--primary-green)', marginBottom: '1rem', fontSize: '2.8rem', fontWeight: 'bold', lineHeight: '1.2'}}>
                  {currentPlant.title}
                </h2>
                
                <div className="mb-4">
                  <p style={{fontSize: '2rem', fontWeight: 'bold', color: 'var(--secondary-green)', marginBottom: '0.5rem'}}>
                    ₹ {currentPlant.price}
                  </p>
                  <p className="text-muted" style={{fontSize: '1rem'}}>
                    Category: <strong style={{color: 'var(--primary-green)'}}>{currentPlant.category}</strong>
                  </p>
                </div>

                <div className="mb-4 p-4" style={{backgroundColor: 'white', borderRadius: '15px', borderLeft: '5px solid var(--secondary-green)', boxShadow: '0 4px 12px rgba(0,0,0,0.08)'}}>
                  <h5 style={{color: 'var(--primary-green)', marginBottom: '1rem', fontWeight: '600'}}>
                    <i className="fa fa-leaf me-2" style={{color: 'var(--secondary-green)'}}></i>About This Plant
                  </h5>
                  <p className="text-muted mb-0" style={{lineHeight: '1.8', fontSize: '1rem'}}>
                    {currentPlant.details}
                  </p>
                </div>

                <div className="mb-4 p-4" style={{backgroundColor: 'white', borderRadius: '15px', borderLeft: '5px solid var(--light-green)', boxShadow: '0 4px 12px rgba(0,0,0,0.08)'}}>
                  <h5 style={{color: 'var(--primary-green)', marginBottom: '1rem', fontWeight: '600'}}>
                    <i className="fa fa-info-circle me-2"></i>Plant Details
                  </h5>
                  <p className="text-muted mb-0" style={{lineHeight: '1.8', fontSize: '1rem'}}>
                    {currentPlant.description}
                  </p>
                </div>

                <div className="d-flex gap-3 flex-wrap mb-4">
                  <button 
                    className="btn btn-nature"
                    style={{padding: '12px 28px', fontSize: '1rem', fontWeight: '600', borderRadius: '8px'}}
                    onClick={() => addToCart(currentPlant)}
                  >
                    <i className="fa fa-cart-plus me-2"></i>Add to Cart
                  </button>
                  <Link to={`/product/${currentPlant.id}`} state={{ product: currentPlant }} className="btn btn-nature"
                    style={{padding: '12px 28px', fontSize: '1rem', fontWeight: '600', borderRadius: '8px'}}>
                    <i className="fa fa-shopping-bag me-2"></i>Buy Now
                  </Link>
                  <Link to={`/product/${currentPlant.id}`} state={{ product: currentPlant }} className="btn btn-outline-nature"
                    style={{padding: '12px 28px', fontSize: '1rem', fontWeight: '600', borderRadius: '8px', borderColor: 'var(--secondary-green)', color: 'var(--secondary-green)'}}>
                    <i className="fa fa-eye me-2"></i>View Details
                  </Link>
                </div>

                {/* Progress Indicator */}
                <div style={{marginTop: '2rem'}}>
                  <div style={{display: 'flex', gap: '8px', alignItems: 'center'}}>
                    <span style={{color: 'var(--primary-green)', fontWeight: '600', fontSize: '0.95rem'}}>
                      Plant {currentSlide + 1} of {featuredPlants.length}
                    </span>
                    <div style={{flex: 1, height: '6px', background: '#e0e0e0', borderRadius: '3px', overflow: 'hidden'}}>
                      <div style={{height: '100%', width: `${((currentSlide + 1) / featuredPlants.length) * 100}%`, background: 'var(--secondary-green)', borderRadius: '3px', transition: 'width 0.3s ease'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="d-flex justify-content-center align-items-center gap-4 mt-5">
            <button 
              onClick={prevSlide} 
              className="btn" 
              style={{
                padding: '12px 18px',
                borderRadius: '50%',
                width: '50px',
                height: '50px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'white',
                border: '2px solid var(--secondary-green)',
                color: 'var(--secondary-green)',
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => gsap.to(e.target, { scale: 1.1, duration: 0.2 })}
              onMouseLeave={(e) => gsap.to(e.target, { scale: 1, duration: 0.2 })}
            >
              <i className="fa fa-chevron-left fa-lg"></i>
            </button>
            
            {/* Dot Indicators */}
            <div style={{display: 'flex', gap: '12px', alignItems: 'center'}}>
              {featuredPlants.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  style={{
                    width: index === currentSlide ? '36px' : '12px',
                    height: '12px',
                    borderRadius: '50%',
                    border: 'none',
                    backgroundColor: index === currentSlide ? 'var(--secondary-green)' : '#d0d0d0',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  title={`Go to ${featuredPlants[index].title}`}
                ></button>
              ))}
            </div>

            <button 
              onClick={nextSlide} 
              className="btn" 
              style={{
                padding: '12px 18px',
                borderRadius: '50%',
                width: '50px',
                height: '50px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'white',
                border: '2px solid var(--secondary-green)',
                color: 'var(--secondary-green)',
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => gsap.to(e.target, { scale: 1.1, duration: 0.2 })}
              onMouseLeave={(e) => gsap.to(e.target, { scale: 1, duration: 0.2 })}
            >
              <i className="fa fa-chevron-right fa-lg"></i>
            </button>
          </div>

          {/* Quick Navigation Buttons */}
          <div className="d-flex justify-content-center gap-2 flex-wrap mt-4">
            {featuredPlants.map((plant, index) => (
              <button
                key={plant.id}
                onClick={() => setCurrentSlide(index)}
                style={{
                  padding: '10px 16px',
                  borderRadius: '25px',
                  border: index === currentSlide ? '2px solid var(--secondary-green)' : '2px solid #d0d0d0',
                  backgroundColor: index === currentSlide ? 'var(--secondary-green)' : 'transparent',
                  color: index === currentSlide ? 'white' : 'var(--primary-green)',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  transition: 'all 0.3s ease'
                }}
              >
                <i className="fa fa-leaf me-1"></i>{plant.title.split('-')[0]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Environment Showcase Section */}
      <div style={{background: 'white', paddingTop: '60px', paddingBottom: '60px'}} ref={envRef}>
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="page-header" style={{color: 'var(--primary-green)', marginBottom: '1rem'}}>
              <i className="fa fa-photo me-3"></i>Different Plant Environments
            </h2>
            <p style={{color: '#666', fontSize: '1.1rem'}}>Plants thrive in different spaces and conditions</p>
          </div>

          <div className="row">
            {environmentData.map((env, index) => (
              <div key={index} className="col-md-6 col-lg-3 mb-4">
                <div 
                  className="env-card"
                  style={{
                    background: env.color,
                    borderRadius: '15px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                  onMouseEnter={(e) => {
                    gsap.to(e.currentTarget, { y: -10, boxShadow: '0 8px 25px rgba(0,0,0,0.15)', duration: 0.3 });
                    gsap.to(e.currentTarget.querySelector('img'), { scale: 1.05, duration: 0.3 });
                  }}
                  onMouseLeave={(e) => {
                    gsap.to(e.currentTarget, { y: 0, boxShadow: '0 4px 15px rgba(0,0,0,0.08)', duration: 0.3 });
                    gsap.to(e.currentTarget.querySelector('img'), { scale: 1, duration: 0.3 });
                  }}
                >
                  <div style={{height: '250px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'white'}}>
                    <img 
                      src={env.image} 
                      alt={env.title}
                      style={{
                        height: '90%',
                        objectFit: 'contain',
                        transition: 'transform 0.3s ease'
                      }}
                    />
                  </div>
                  <div style={{padding: '25px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                    <div>
                      <h6 style={{color: 'var(--primary-green)', fontWeight: 'bold', marginBottom: '10px', fontSize: '1.2rem'}}>
                        {env.title}
                      </h6>
                      <p style={{color: '#666', marginBottom: '0', fontSize: '0.95rem', lineHeight: '1.6'}}>
                        {env.description}
                      </p>
                    </div>
                    <Link 
                      to="/product"
                      style={{
                        marginTop: '15px',
                        display: 'inline-block',
                        color: 'var(--secondary-green)',
                        textDecoration: 'none',
                        fontWeight: '600',
                        fontSize: '0.95rem'
                      }}
                    >
                      Explore <i className="fa fa-arrow-right ms-2"></i>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Plant Care Tips Section */}
      <div className="container my-5 py-5">
        <h3 className="text-center page-header mb-4" style={{color: 'var(--primary-green)'}}>
          <i className="fa fa-lightbulb me-2"></i>Plant Care Guide
        </h3>
        <div className="row">
          <div className="col-md-3 mb-4">
            <div style={{backgroundColor: '#f0f7ed', padding: '25px', borderRadius: '12px', border: '2px solid var(--light-green)', textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
              <i className="fa fa-sun" style={{fontSize: '2.5rem', color: 'var(--secondary-green)', marginBottom: '15px', display: 'block'}}></i>
              <h6 style={{color: 'var(--primary-green)', marginBottom: '10px', fontWeight: 'bold'}}>Sunlight</h6>
              <p className="small text-muted mb-0">Most plants need 6-8 hours of sunlight daily for healthy growth</p>
            </div>
          </div>
          <div className="col-md-3 mb-4">
            <div style={{backgroundColor: '#f0f7ed', padding: '25px', borderRadius: '12px', border: '2px solid var(--light-green)', textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
              <i className="fa fa-droplet" style={{fontSize: '2.5rem', color: 'var(--secondary-green)', marginBottom: '15px', display: 'block'}}></i>
              <h6 style={{color: 'var(--primary-green)', marginBottom: '10px', fontWeight: 'bold'}}>Watering</h6>
              <p className="small text-muted mb-0">Water regularly but avoid overwatering. Check soil moisture first</p>
            </div>
          </div>
          <div className="col-md-3 mb-4">
            <div style={{backgroundColor: '#f0f7ed', padding: '25px', borderRadius: '12px', border: '2px solid var(--light-green)', textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
              <i className="fa fa-wind" style={{fontSize: '2.5rem', color: 'var(--secondary-green)', marginBottom: '15px', display: 'block'}}></i>
              <h6 style={{color: 'var(--primary-green)', marginBottom: '10px', fontWeight: 'bold'}}>Air & Humidity</h6>
              <p className="small text-muted mb-0">Ensure good air circulation and maintain proper humidity levels</p>
            </div>
          </div>
          <div className="col-md-3 mb-4">
            <div style={{backgroundColor: '#f0f7ed', padding: '25px', borderRadius: '12px', border: '2px solid var(--light-green)', textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
              <i className="fa fa-leaf" style={{fontSize: '2.5rem', color: 'var(--secondary-green)', marginBottom: '15px', display: 'block'}}></i>
              <h6 style={{color: 'var(--primary-green)', marginBottom: '10px', fontWeight: 'bold'}}>Fertilizer</h6>
              <p className="small text-muted mb-0">Use organic fertilizer monthly during growing season for best results</p>
            </div>
          </div>
        </div>
      </div>

      {/* Nursery Moments Photo Section */}
      <div ref={galleryRef} style={{ background: 'linear-gradient(135deg, #f8fbf6 0%, #edf6ea 100%)', paddingTop: '30px', paddingBottom: '70px' }}>
        <div className="container">
          <div className="text-center mb-5">
            <h3 className="page-header mb-3" style={{ color: 'var(--primary-green)' }}>
              <i className="fa fa-camera me-2"></i>Nursery Moments
            </h3>
            <p className="text-muted mb-0" style={{ maxWidth: '760px', margin: '0 auto', lineHeight: '1.8' }}>
              A quick look at real nursery life — growing zones, care process, and ready-to-ship plants from our garden.
            </p>
          </div>

          <div className="row">
            {nurseryGalleryData.map((item, index) => (
              <div
                key={item.title}
                className="col-md-6 col-lg-4 mb-4"
                style={{ marginTop: index % 3 === 1 ? '24px' : index % 3 === 2 ? '10px' : '0px' }}
              >
                <div
                  className="nursery-photo-card"
                  style={{
                    background: 'white',
                    borderRadius: '14px',
                    overflow: 'hidden',
                    boxShadow: '0 8px 22px rgba(0,0,0,0.08)',
                    border: '1px solid #e7efe4',
                    transform: `rotate(${index % 2 === 0 ? '-1.5deg' : '1.2deg'})`,
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                  }}
                  onMouseEnter={(e) => gsap.to(e.currentTarget, { y: -6, rotate: 0, boxShadow: '0 14px 28px rgba(0,0,0,0.12)', duration: 0.25 })}
                  onMouseLeave={(e) => gsap.to(e.currentTarget, { y: 0, rotate: index % 2 === 0 ? -1.5 : 1.2, boxShadow: '0 8px 22px rgba(0,0,0,0.08)', duration: 0.25 })}
                >
                  <div style={{ height: '220px', background: '#f3f8f1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div style={{ padding: '18px' }}>
                    <h6 style={{ color: 'var(--primary-green)', fontWeight: '700', marginBottom: '8px' }}>{item.title}</h6>
                    <p className="text-muted mb-0" style={{ fontSize: '0.93rem', lineHeight: '1.7' }}>{item.details}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
