import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link, useLocation, useParams } from "react-router-dom";
import Marquee from "react-fast-marquee";
import { useDispatch } from "react-redux";
import { addCart, addWishlist } from "../redux/action";
import toast from "react-hot-toast";

import { Footer, Navbar } from "../components";

const Product = () => {
  const { id } = useParams();
  const location = useLocation();
  const stateProduct = location.state && location.state.product ? location.state.product : null;
  const [product, setProduct] = useState([]);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isInWishlist, setIsInWishlist] = useState(false);

  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  const toggleWishlist = (product) => {
    setIsInWishlist(!isInWishlist);
    if (!isInWishlist) {
      dispatch(addWishlist(product));
      toast.success("Added to wishlist!");
    } else {
      toast.error("Removed from wishlist!");
    }
  };

  useEffect(() => {
    const getProduct = async () => {
      if (stateProduct) {
        setProduct(stateProduct);
        setSimilarProducts([]);
        setLoading(false);
        setLoading2(false);
        setCurrentImageIndex(0);
        return;
      }
      setLoading(true);
      setLoading2(true);
      setCurrentImageIndex(0);
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      const data = await response.json();
      setProduct(data);
      setLoading(false);
      const response2 = await fetch(
        `https://fakestoreapi.com/products/category/${data.category}`
      );
      const data2 = await response2.json();
      setSimilarProducts(data2);
      setLoading2(false);
    };
    getProduct();
  }, [id, stateProduct]);

  const Loading = () => {
    return (
      <>
        <div className="container my-5 py-2">
          <div className="row">
            <div className="col-md-6 py-3">
              <Skeleton height={400} width={400} />
            </div>
            <div className="col-md-6 py-5">
              <Skeleton height={30} width={250} />
              <Skeleton height={90} />
              <Skeleton height={40} width={70} />
              <Skeleton height={50} width={110} />
              <Skeleton height={120} />
              <Skeleton height={40} width={110} inline={true} />
              <Skeleton className="mx-3" height={40} width={110} />
            </div>
          </div>
        </div>
      </>
    );
  };

  const ShowProduct = () => {
    const productImages = Array.isArray(product.images)
      ? product.images
      : product.image
      ? [product.image]
      : [];

    const handlePrevImage = () => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? productImages.length - 1 : prevIndex - 1
      );
    };

    const handleNextImage = () => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === productImages.length - 1 ? 0 : prevIndex + 1
      );
    };

    return (
      <>
        <div className="container my-5 py-2">
          <div className="row">
            <div className="col-md-6 col-sm-12 py-3">
              {productImages.length > 0 && (
                <div style={{ textAlign: "center", position: "relative", display: "inline-block", width: "100%" }}>
                  <img
                    className="img-fluid"
                    src={productImages[currentImageIndex]}
                    alt={`${product.title} ${currentImageIndex + 1}`}
                    style={{ width: "400px", height: "400px", objectFit: "contain" }}
                  />
                  
                  {/* Like Button - Top Right Corner */}
                  <button 
                    onClick={() => toggleWishlist(product)}
                    style={{
                      position: 'absolute',
                      top: '15px',
                      right: '15px',
                      background: 'white',
                      border: '2px solid var(--light-green)',
                      borderRadius: '50%',
                      width: '60px',
                      height: '60px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                      transition: 'all 0.3s ease',
                      zIndex: '10'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.1)';
                      e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                    }}
                    title={isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  >
                    <i 
                      className={`fa fa-heart${isInWishlist ? '' : '-o'}`}
                      style={{
                        fontSize: '1.8rem',
                        color: isInWishlist ? '#e91e63' : 'var(--secondary-green)',
                        transition: 'color 0.3s ease'
                      }}
                    ></i>
                  </button>
                  {productImages.length > 1 && (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "16px",
                        marginTop: "12px",
                      }}
                    >
                      <button
                        onClick={handlePrevImage}
                        aria-label="Previous image"
                        className="btn btn-nature"
                        style={{
                          padding: "8px 14px",
                          fontSize: "16px",
                        }}
                      >
                        <i className="fa fa-chevron-left"></i>
                      </button>
                      <button
                        onClick={handleNextImage}
                        aria-label="Next image"
                        className="btn btn-nature"
                        style={{
                          padding: "8px 14px",
                          fontSize: "16px",
                        }}
                      >
                        <i className="fa fa-chevron-right"></i>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="col-md-6 col-md-6 py-5">
              <h4 className="text-uppercase" style={{color: 'var(--accent-green)'}}>
                <i className="fa fa-tag me-2"></i>{product.category}
              </h4>
              <h1 className="display-5" style={{color: 'var(--primary-green)'}}>{product.title}</h1>
              <p className="lead">
                {product.rating && product.rating.rate}{" "}
                <i className="fa fa-star" style={{color: '#FFD700'}}></i>
              </p>
              <h3 className="display-6 my-4" style={{color: 'var(--secondary-green)', fontWeight: 'bold'}}>₹{product.price}</h3>
              
              <div className="mb-4 p-3" style={{backgroundColor: '#f0f7ed', borderRadius: '10px', borderLeft: '4px solid var(--light-green)'}}>
                <h6 style={{color: 'var(--primary-green)', marginBottom: '0.5rem'}}>
                  <i className="fa fa-info-circle me-2"></i>About This Plant
                </h6>
                <p className="text-muted mb-0">{product.description}</p>
              </div>

              <div className="mb-4 p-3" style={{backgroundColor: '#f0f7ed', borderRadius: '10px', borderLeft: '4px solid var(--light-green)'}}>
                <h6 style={{color: 'var(--primary-green)', marginBottom: '1rem'}}>
                  <i className="fa fa-leaf me-2"></i>Care Instructions
                </h6>
                <ul style={{fontSize: '0.9rem', paddingLeft: '20px'}}>
                  <li className="mb-2"><strong>Light:</strong> Bright, indirect sunlight recommended</li>
                  <li className="mb-2"><strong>Water:</strong> Keep soil moist but not waterlogged</li>
                  <li className="mb-2"><strong>Temperature:</strong> Ideal between 15-25°C</li>
                  <li className="mb-2"><strong>Humidity:</strong> Moderate to high humidity preferred</li>
                  <li><strong>Fertilizer:</strong> Monthly feeding during growing season</li>
                </ul>
              </div>

              <div className="mb-4 p-3" style={{backgroundColor: '#f0f7ed', borderRadius: '10px', borderLeft: '4px solid var(--light-green)'}}>
                <h6 style={{color: 'var(--primary-green)', marginBottom: '0.5rem'}}>
                  <i className="fa fa-heart me-2" style={{color: 'var(--secondary-green)'}}></i>Our Guarantee
                </h6>
                <p className="text-muted mb-2">✓ Only healthy, disease-free plants shipped</p>
                <p className="text-muted mb-2">✓ Free care guide included with every purchase</p>
                <p className="text-muted mb-0">✓ 7-day replacement guarantee if plant doesn't survive</p>
              </div>

              <div className="d-flex gap-2 flex-wrap">
                <button
                  className="btn btn-nature"
                  onClick={() => addProduct(product)}
                  style={{padding: '10px 24px', fontSize: '0.95rem'}}
                >
                  <i className="fa fa-cart-plus me-2"></i>Add to Cart
                </button>
                <Link to="/cart" className="btn btn-nature" style={{padding: '10px 24px', fontSize: '0.95rem', borderColor: 'var(--secondary-green)'}}>
                  <i className="fa fa-shopping-cart me-2"></i>Go to Cart
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const Loading2 = () => {
    return (
      <>
        <div className="my-4 py-4">
          <div className="d-flex">
            <div className="mx-4">
              <Skeleton height={400} width={250} />
            </div>
            <div className="mx-4">
              <Skeleton height={400} width={250} />
            </div>
            <div className="mx-4">
              <Skeleton height={400} width={250} />
            </div>
            <div className="mx-4">
              <Skeleton height={400} width={250} />
            </div>
          </div>
        </div>
      </>
    );
  };

  const ShowSimilarProduct = () => {
    return (
      <>
        <div className="py-4 my-4">
          <div className="d-flex">
            {similarProducts.map((item) => {
              return (
                <div key={item.id} className="card mx-4 text-center">
                  <img
                    className="card-img-top p-3"
                    src={item.image}
                    alt="Card"
                    height={300}
                    width={300}
                  />
                  <div className="card-body">
                    <h5 className="card-title">
                      {item.title.substring(0, 15)}...
                    </h5>
                  </div>
                  {/* <ul className="list-group list-group-flush">
                    <li className="list-group-item lead">${product.price}</li>
                  </ul> */}
                  <div className="card-body">
                    <Link
                      to={"/product/" + item.id}
                      className="btn btn-dark m-1"
                    >
                      Buy Now
                    </Link>
                    <button
                      className="btn btn-dark m-1"
                      onClick={() => addProduct(item)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">{loading ? <Loading /> : <ShowProduct />}</div>
        <div className="row my-5 py-5">
          <div className="d-none d-md-block">
          <h2 className="">You may also Like</h2>
            <Marquee
              pauseOnHover={true}
              pauseOnClick={true}
              speed={50}
            >
              {loading2 ? <Loading2 /> : <ShowSimilarProduct />}
            </Marquee>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Product;
