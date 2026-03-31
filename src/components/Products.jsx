import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCart, addWishlist, removeWishlist } from "../redux/action";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { Link } from "react-router-dom";
import toast from "react-hot-toast";

// Mock data for nursery plants with multiple images
const nurseryPlants = [
    // Flowering Plants
    {
      id: 1,
      title: "Rose - Red Beautiful Flower",
      price: 299,
      images: [
        "/assets/images/rose.png",
        "/assets/images/rose1.png",
      ],
      category: "Flowering Plants",
      description: "Beautiful red roses for your garden and decoration",
    },
    {
      id: 2,
      title: "Hibiscus - Colourful Bloom",
      price: 199,
      images: [
        "/assets/images/Hibiscus.png",
        "/assets/images/Hibiscus1.jpg",
        "/assets/images/Hibiscus2.png",
      ],
      category: "Flowering Plants",
      description: "Vibrant hibiscus flowers with colorful blooms",
    },
    {
      id: 3,
      title: "Marigold - Bright Yellow",
      price: 149,
      images: [
        "/assets/images/Marigold.png",
        "/assets/images/Marigold2.png",

      ],
      category: "Flowering Plants",
      description: "Bright yellow marigolds to brighten your garden",
    },
    {
      id: 4,
      title: "Jasmine - Fragrant Flowers",
      price: 249,
      images: [
        "/assets/images/Jasmine.png",
        "/assets/images/Jasmine1.png",
      ],
      category: "Flowering Plants",
      description: "Fragrant jasmine flowers for your garden",
    },
    {
      id: 5,
      title: "Bougainvillea - Purple Petals",
      price: 279,
      images: [
        "/assets/images/Bougainvillea.png",
        "/assets/images/Bougainvillea1.png",
      ],
      category: "Flowering Plants",
      description: "Stunning bougainvillea with purple petals",
    },
    {
      id: 6,
      title: "Petunia - Mixed Colors",
      price: 179,
      images: [
        "/assets/images/Petunia.png",
        "/assets/images/Petunia1.png",
      ],
      category: "Flowering Plants",
      description: "Colorful petunias in mixed shades",
    },
    {
      id: 7,
      title: "Lily - White Elegance",
      price: 329,
      images: [
        "/assets/images/Lily.png",
        "/assets/images/Lily1.png",
      ],
      category: "Flowering Plants",
      description: "Elegant white lilies for special occasions",
    },
    {
      id: 8,
      title: "Chrysanthemum - Golden Blooms",
      price: 219,
      images: [
        "/assets/images/Chrysanthemum.png",
        "/assets/images/Chrysanthemum1.png",
      ],
      category: "Flowering Plants",
      description: "Beautiful golden chrysanthemum flowers",
    },
    // Indoor Plants
    {
      id: 9,
      title: "Aloe Vera - Medicinal Plant",
      price: 199,
      images: [
        "/assets/images/AloeVera.png",
        "/assets/images/AloeVera1.png",
      ],
      category: "Indoor Plants",
      description: "Healthy aloe vera plant for indoors",
    },
    {
      id: 10,
      title: "Peace Lily - Air Purifier",
      price: 249,
      images: [
        "/assets/images/PeaceLily.png",
        "/assets/images/PeaceLily1.png",
      ],
      category: "Indoor Plants",
      description: "Peace lily to purify your indoor air",
    },
    {
      id: 11,
      title: "Money Plant - Green Vine",
      price: 179,
      images: [
        "/assets/images/MoneyPlant.png",
        "/assets/images/MoneyPlant1.png",
      ],
      category: "Indoor Plants",
      description: "Lucky money plant creeper for decoration",
    },
    // Fruit Plants
    {
      id: 12,
      title: "Mango Plant - Fruit Tree",
      price: 499,
      images: [
       "/assets/images/Mangoplant.png",
        "/assets/images/Mangoplant1.png",
      ],
      category: "Fruit Plants",
      description: "Fresh mango fruit tree for your garden",
    },
    {
      id: 13,
      title: "Guava Plant - Healthy Fruit",
      price: 399,
      images: [
        "/assets/images/Guavaplant.png",
        "/assets/images/Guavaplant1.png",
        "/assets/images/Guavaplant2.png",
        "/assets/images/Guavaplant3.png",
      ],
      category: "Fruit Plants",
      description: "Guava tree for fresh fruit production",
    },
    {
      id: 14,
      title: "Papaya Plant - Tropical Fruit",
      price: 349,
      images: [
        "/assets/images/Papayaplant.png",
        "/assets/images/Papayaplant1.png",
        "/assets/images/Papayaplant2.png",
      ],
      category: "Fruit Plants",
      description: "Papaya tree for tropical garden",
    },
    {
      id: 15,
      title: "Lemon Plant - Citrus Fruit",
      price: 299,
      images: [
        "/assets/images/Lemonplant.png",
        "/assets/images/Lemonplant1.png",
        "/assets/images/Lemonplant2.png",
      ],
      category: "Fruit Plants",
      description: "Fresh lemon tree for sour fruit",
    },
    {
      id: 16,
      title: "Pomegranate Plant - Red Fruit",
      price: 429,
      images: [
        "/assets/images/Pomegranateplant.png",
        "/assets/images/Pomegranateplant1.png",
        "/assets/images/Pomegranateplant2.png",
      ],
      category: "Fruit Plants",
      description: "Pomegranate tree with juicy red fruits",
    },
    {
      id: 17,
      title: "Banana Plant - Tropical Delight",
      price: 379,
      images: [
        "/assets/images/Bananaplant.png",
        "/assets/images/Bananaplant1.png",
        "/assets/images/Bananaplant2.png",
      ],
      category: "Fruit Plants",
      description: "Banana plant for tropical gardens",
    },
    // Medicinal Plants
    {
      id: 18,
      title: "Tulsi Plant - Holy Basil",
      price: 149,
      images: [
        "/assets/images/Tulsiplant.png",
        "/assets/images/Tulsiplant1.png",
      ],
      category: "Medicinal Plants",
      description: "Sacred tulsi plant for health benefits",
    },
    {
      id: 19,
      title: "Neem Plant - Medicine Plant",
      price: 349,
      images: [
        "/assets/images/Neemplant.png",
        "/assets/images/Neemplant1.png",  
        "/assets/images/Neemplant2.png",
      ],
      category: "Medicinal Plants",
      description: "Neem tree for medicinal purposes",
    },
    {
      id: 20,
      title: "Mint Plant - Fresh Herb",
      price: 129,
      images: [
        "/assets/images/Mintplant.png",
        "/assets/images/Mintplant1.png",
        "/assets/images/Mintplant2.png",
      ],
      category: "Medicinal Plants",
      description: "Fresh mint plant with small flowers",
    },
    {
      id: 21,
      title: "Ashwagandha Plant - Adaptogen",
      price: 199,
      images: [
        "/assets/images/Ashwagandhaplant.png",
        "/assets/images/Ashwagandhaplant1.png",
        "/assets/images/Ashwagandhaplant2.png",
      ],
      category: "Medicinal Plants",
      description: "Ashwagandha plant for wellness",
    },
    {
      id: 22,
      title: "Curry Leaf Plant - Aromatic Herb",
      price: 159,
      images: [
        "/assets/images/Curryleafplant.png",
        "/assets/images/Curryleafplant1.png",
      ],
      category: "Medicinal Plants",
      description: "Curry leaf plant for cooking and health",
    },
  ];

const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);
  const componentMounted = useRef(true);

  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  useEffect(() => {
    if (componentMounted.current) {
      setData(nurseryPlants);
      setFilter(nurseryPlants);
      setLoading(false);
    }

    return () => {
      componentMounted.current = false;
    };
  }, []);

  const Loading = () => {
    return (
      <>
        <div className="col-12 py-5 text-center">
          <Skeleton height={40} width={560} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
      </>
    );
  };

  const filterPlants = (category) => {
    if (category === "all") {
      setFilter(data);
    } else {
      const filtered = data.filter((item) => item.category === category);
      setFilter(filtered);
    }
  };

  const ShowProducts = () => {
    const wishlist = useSelector((state) => state.handleWishlist);
    
    const toggleWishlist = (product) => {
      const isInWishlist = wishlist.some(item => item.id === product.id);
      if (isInWishlist) {
        dispatch(removeWishlist(product));
        toast.success("Removed from wishlist");
      } else {
        dispatch(addWishlist(product));
        toast.success("Added to wishlist!");
      }
    };

    return (
      <>
        <div className="buttons text-center py-5">
          <button
            className="filter-btn"
            onClick={() => filterPlants("all")}
          >
            <i className="fa fa-leaf me-2"></i>All Plants
          </button>
          <button
            className="filter-btn"
            onClick={() => filterPlants("Flowering Plants")}
          >
            <i className="fa fa-flower me-2"></i>Flowering Plants
          </button>
          <button
            className="filter-btn"
            onClick={() => filterPlants("Indoor Plants")}
          >
            <i className="fa fa-home me-2"></i>Indoor Plants
          </button>
          <button
            className="filter-btn"
            onClick={() => filterPlants("Fruit Plants")}
          >
            <i className="fa fa-apple me-2"></i>Fruit Plants
          </button>
          <button
            className="filter-btn"
            onClick={() => filterPlants("Medicinal Plants")}
          >
            <i className="fa fa-medkit me-2"></i>Medicinal Plants
          </button>
        </div>

        {filter.map((product) => {
          const currentImage = product.images[0];
          const isInWishlist = wishlist.some(item => item.id === product.id);

          return (
            <div
              id={product.id}
              key={product.id}
              className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4"
            >
              <div className="card card-custom text-center h-100" key={product.id}>
                {/* Category Badge */}
                <div style={{position: 'absolute', top: '10px', left: '10px', zIndex: 10}}>
                  <span className="badge" style={{background: 'linear-gradient(135deg, var(--secondary-green) 0%, var(--primary-green) 100%)', color: 'white'}}>
                    {product.category}
                  </span>
                </div>
                
                {/* Wishlist Button */}
                <button 
                  onClick={() => toggleWishlist(product)}
                  style={{
                    position: 'absolute', 
                    top: '12px', 
                    right: '12px', 
                    zIndex: 10, 
                    background: 'white',
                    border: '2px solid var(--light-green)',
                    cursor: 'pointer',
                    borderRadius: '50%',
                    width: '50px',
                    height: '50px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = isInWishlist ? '#e91e63' : 'var(--light-green)';
                    e.currentTarget.style.transform = 'scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'white';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                  title={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  <i className={`fa fa-heart${isInWishlist ? '' : '-o'} ${isInWishlist ? 'text-danger' : ''}`} style={{fontSize: '1.2rem', color: isInWishlist ? '#e91e63' : 'var(--secondary-green)'}}></i>
                </button>

                {/* Single image only */}
                <div style={{ position: "relative", overflow: "hidden", backgroundColor: "#f0f7ed", height: "300px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <img
                    className="card-img-top"
                    src={currentImage}
                    alt={product.title}
                    style={{ width: "100%", height: "", objectFit: "contain", padding: "12px" }}
                  />
                </div>

                <div className="card-body">
                  <h5 className="card-title">
                    {product.title.substring(0, 16)}...
                  </h5>
                  <p className="card-text text-muted" style={{fontSize: '0.9rem'}}>
                    {product.description.substring(0, 70)}...
                  </p>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item lead" style={{color: 'var(--secondary-green)', fontWeight: 'bold'}}>₹ {product.price}</li>
                </ul>
                <div className="card-body">
                  <div className="d-flex gap-2 justify-content-center">
                    <Link
                      to={"/product/" + product.id}
                      state={{ product }}
                      className="btn btn-nature"
                      style={{padding: '8px 20px', fontSize: '0.9rem'}}
                    >
                      <i className="fa fa-shopping-bag me-1"></i>Buy Now
                    </Link>
                    <button
                      className="btn btn-nature"
                      style={{padding: '8px 20px', fontSize: '0.9rem'}}
                      onClick={() => {
                        toast.success("Added to cart");
                        addProduct(product);
                      }}
                    >
                      <i className="fa fa-cart-plus me-1"></i>Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </>
    );
  };
  return (
    <>
      <div className="container my-3 py-3">
        <div className="row">
          <div className="col-12">
            <h2 className="display-5 text-center page-header" style={{color: 'var(--primary-green)'}}>
              <i className="fa fa-seedling me-3"></i>Our Nursery Plants
            </h2>
            <p className="text-center text-muted mb-4">Discover our wide selection of healthy, vibrant plants for your home and garden</p>
            <hr style={{borderColor: 'var(--light-green)', borderWidth: '2px'}} />
          </div>
        </div>
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
    </>
  );
};

export default Products;
