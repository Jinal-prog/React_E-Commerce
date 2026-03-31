import React from "react";
import { Footer, Navbar } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { addCart, delCart } from "../redux/action";
import { Link } from "react-router-dom";

const Cart = () => {
  const state = useSelector((state) => state.handleCart);
  const dispatch = useDispatch();

  const EmptyCart = () => {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 py-5 text-center" style={{backgroundColor: 'var(--bg-light)', borderRadius: '15px'}}>
            <i className="fa fa-shopping-cart fa-5x mb-4" style={{color: 'var(--accent-green)'}}></i>
            <h4 className="p-3 display-5" style={{color: 'var(--primary-green)'}}>Your Cart is Empty</h4>
            <p className="lead text-muted mb-4">Add some beautiful plants to your cart and start shopping!</p>
            <Link to="/product" className="btn btn-nature">
              <i className="fa fa-leaf me-2"></i> Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const addItem = (product) => {
    dispatch(addCart(product));
  };
  const removeItem = (product) => {
    dispatch(delCart(product));
  };

  const ShowCart = () => {
    let subtotal = 0;
    let shipping = 30.0;
    let totalItems = 0;
    state.map((item) => {
      return (subtotal += item.price * item.qty);
    });

    state.map((item) => {
      return (totalItems += item.qty);
    });
    return (
      <>
        <section className="h-100 gradient-custom">
          <div className="container py-5">
            <div className="row d-flex justify-content-center my-4">
              <div className="col-md-8">
                <div className="card mb-4 card-custom">
                  <div className="card-header py-3" style={{background: 'linear-gradient(135deg, var(--primary-green) 0%, var(--secondary-green) 100%)', color: 'white'}}>
                    <h5 className="mb-0"><i className="fa fa-list me-2"></i>Item List</h5>
                  </div>
                  <div className="card-body">
                    {state.map((item) => {
                      return (
                        <div key={item.id}>
                          <div className="row d-flex align-items-center">
                            <div className="col-lg-3 col-md-12">
                              <div
                                className="bg-image rounded"
                                data-mdb-ripple-color="light"
                                style={{border: '2px solid var(--border-color)'}}
                              >
                                <img
                                  src={item.images && item.images[0] ? item.images[0] : "/assets/images/rose.png"}
                                  alt={item.title}
                                  width={75}
                                  height={75}
                                  style={{objectFit: 'cover', borderRadius: '8px'}}
                                />
                              </div>
                            </div>

                            <div className="col-lg-5 col-md-6">
                              <p>
                                <strong>{item.title}</strong>
                              </p>
                              {/* <p>Color: blue</p>
                              <p>Size: M</p> */}
                            </div>

                            <div className="col-lg-4 col-md-6">
                              <div
                                className="d-flex mb-4"
                                style={{ maxWidth: "300px" }}
                              >
                                <button
                                  className="btn btn-outline-nature px-3"
                                  style={{borderColor: 'var(--secondary-green)', color: 'var(--secondary-green)'}}
                                  onClick={() => {
                                    removeItem(item);
                                  }}
                                >
                                  <i className="fas fa-minus"></i>
                                </button>

                                <p className="mx-5" style={{color: 'var(--primary-green)', fontWeight: 'bold'}}>{item.qty}</p>

                                <button
                                  className="btn btn-nature px-3"
                                  onClick={() => {
                                    addItem(item);
                                  }}
                                >
                                  <i className="fas fa-plus"></i>
                                </button>
                              </div>

                              <p className="text-start text-md-center">
                                <strong style={{color: 'var(--secondary-green)'}}>
                                  <span className="text-muted">{item.qty}</span>{" "}
                                  x ₹{item.price}
                                </strong>
                              </p>
                            </div>
                          </div>

                          <hr className="my-4" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card mb-4 card-custom">
                  <div className="card-header py-3" style={{background: 'linear-gradient(135deg, var(--primary-green) 0%, var(--secondary-green) 100%)', color: 'white'}}>
                    <h5 className="mb-0"><i className="fa fa-receipt me-2"></i>Order Summary</h5>
                  </div>
                  <div className="card-body">
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                        Products ({totalItems})<span>₹{Math.round(subtotal)}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                        Shipping
                        <span>₹{shipping}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                        <div>
                          <strong>Total amount</strong>
                        </div>
                        <span>
                          <strong>₹{Math.round(subtotal + shipping)}</strong>
                        </span>
                      </li>
                    </ul>

                    <Link
                      to="/checkout"
                      className="btn btn-nature btn-lg btn-block w-100"
                    >
                      <i className="fa fa-credit-card me-2"></i>Go to checkout
                    </Link>
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
          <i className="fa fa-shopping-cart me-3"></i>Shopping Cart
        </h1>
        <p className="text-center text-muted">Review your selected plants before checkout</p>
        <hr style={{borderColor: 'var(--light-green)', borderWidth: '2px'}} />
        {state.length > 0 ? <ShowCart /> : <EmptyCart />}
      </div>
      <Footer />
    </>
  );
};

export default Cart;
