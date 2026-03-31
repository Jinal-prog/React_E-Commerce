import React from "react";
import { Footer, Navbar } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import { removeWishlist } from "../redux/action";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Wishlist = () => {
  const state = useSelector((state) => state.handleWishlist);
  const dispatch = useDispatch();

  const addToCart = (product) => {
    dispatch(addCart(product));
    toast.success("Added to cart!");
  };

  const removeFromWishlist = (product) => {
    dispatch(removeWishlist(product));
    toast.success("Removed from wishlist");
  };

  const EmptyWishlist = () => {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 py-5 text-center" style={{backgroundColor: 'var(--bg-light)', borderRadius: '15px', border: '2px solid var(--light-green)', minHeight: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.05)'}}>
            <i className="fa fa-heart fa-5x mb-4" style={{color: 'var(--accent-green)', opacity: '0.8'}}></i>
            <h4 className="p-3 display-5" style={{color: 'var(--primary-green)', fontWeight: 'bold', marginBottom: '1rem'}}>Your Wishlist is Empty</h4>
            <p className="lead text-muted mb-4" style={{fontSize: '1.05rem', maxWidth: '400px'}}>Add plants to your wishlist to save them for later and get quick access to your favorites!</p>
            <Link to="/product" className="btn btn-nature" style={{padding: '12px 28px', fontSize: '1rem', fontWeight: '600'}}>
              <i className="fa fa-leaf me-2"></i>Browse Plants
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const ShowWishlist = () => {
    return (
      <>
        <section className="h-100 gradient-custom">
          <div className="container py-5">
            <div className="row d-flex justify-content-center my-4">
              <div className="col-md-12">
                <div className="card mb-4 card-custom">
                  <div className="card-header py-3" style={{background: 'linear-gradient(135deg, var(--primary-green) 0%, var(--secondary-green) 100%)', color: 'white'}}>
                    <h5 className="mb-0"><i className="fa fa-heart me-2"></i>My Wishlist ({state.length})</h5>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      {state.map((item) => {
                        return (
                          <div key={item.id} className="col-md-6 col-lg-4 mb-4">
                            <div className="card card-custom h-100">
                              <div style={{ position: "relative", overflow: "hidden", backgroundColor: "#f0f7ed", height: "250px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <img
                                  src={item.images && item.images[0] ? item.images[0] : "/assets/images/rose.png"}
                                  alt={item.title}
                                  style={{ width: "100%", height: "100%", objectFit: "contain", padding: "12px" }}
                                />
                                <button
                                  className="btn btn-danger"
                                  style={{position: 'absolute', top: '10px', right: '10px'}}
                                  onClick={() => removeFromWishlist(item)}
                                  title="Remove from wishlist"
                                >
                                  <i className="fa fa-times"></i>
                                </button>
                              </div>
                              <div className="card-body">
                                <h5 className="card-title">{item.title}</h5>
                                <p className="card-text text-muted">{item.description.substring(0, 80)}...</p>
                                <p style={{color: 'var(--secondary-green)', fontWeight: 'bold', fontSize: '1.3rem'}}>₹ {item.price}</p>
                              </div>
                              <div className="card-body d-flex gap-2">
                                <button
                                  className="btn btn-nature flex-grow-1"
                                  onClick={() => addToCart(item)}
                                >
                                  <i className="fa fa-cart-plus me-1"></i>Add to Cart
                                </button>
                                <Link
                                  to={"/product/" + item.id}
                                  state={{ product: item }}
                                  className="btn btn-outline-nature"
                                  style={{borderColor: 'var(--secondary-green)', color: 'var(--secondary-green)'}}
                                >
                                  <i className="fa fa-eye"></i>
                                </Link>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center page-header" style={{color: 'var(--primary-green)'}}>
          <i className="fa fa-heart me-3"></i>My Wishlist
        </h1>
        <p className="text-center text-muted mb-4">Your favorite plants saved for later</p>
        <hr style={{borderColor: 'var(--light-green)', borderWidth: '2px'}} />
        {state.length > 0 ? <ShowWishlist /> : <EmptyWishlist />}
      </div>
      <Footer />
    </>
  );
};

export default Wishlist;
