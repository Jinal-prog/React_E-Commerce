import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Footer, Navbar } from "../components";
import toast from "react-hot-toast";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    localStorage.setItem(
      "greenleafUser",
      JSON.stringify({
        email,
        name: email.split("@")[0],
        loginAt: new Date().toISOString(),
      })
    );

    toast.success("Login successful");
    navigate("/");
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    localStorage.setItem(
      "greenleafUser",
      JSON.stringify({
        name,
        email,
        registeredAt: new Date().toISOString(),
      })
    );

    toast.success("Registration successful");
    navigate("/");
  };

  const handleSwitchTab = (isLoginTab) => {
    setIsLogin(isLoginTab);
    setEmail("");
    setPassword("");
    setName("");
  };

  return (
    <>
      <Navbar />
      <div className="container my-5 py-4">
        <div className="row">
          <div className="col-md-6 col-lg-5 mx-auto">
            {/* Slider Toggle */}
            <div style={{
              background: 'white',
              borderRadius: '12px',
              padding: '8px',
              marginBottom: '30px',
              display: 'flex',
              border: '2px solid var(--light-green)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
            }}>
              <button
                onClick={() => handleSwitchTab(true)}
                style={{
                  flex: 1,
                  border: 'none',
                  background: isLogin ? 'var(--secondary-green)' : 'transparent',
                  color: isLogin ? 'white' : 'var(--primary-green)',
                  padding: '12px 20px',
                  borderRadius: '8px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '1rem'
                }}
                onMouseEnter={(e) => !isLogin && (e.target.style.background = '#e8f5e9')}
                onMouseLeave={(e) => !isLogin && (e.target.style.background = 'transparent')}
              >
                <i className="fa fa-sign-in me-2"></i>Login
              </button>
              <button
                onClick={() => handleSwitchTab(false)}
                style={{
                  flex: 1,
                  border: 'none',
                  background: !isLogin ? 'var(--secondary-green)' : 'transparent',
                  color: !isLogin ? 'white' : 'var(--primary-green)',
                  padding: '12px 20px',
                  borderRadius: '8px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '1rem'
                }}
                onMouseEnter={(e) => isLogin && (e.target.style.background = '#e8f5e9')}
                onMouseLeave={(e) => isLogin && (e.target.style.background = 'transparent')}
              >
                <i className="fa fa-user-plus me-2"></i>Register
              </button>
            </div>

            {/* Login Form */}
            {isLogin && (
              <div>
                <h2 className="text-center page-header mb-3" style={{color: 'var(--primary-green)'}}>
                  Welcome Back
                </h2>
                <p className="text-center text-muted mb-4">Sign in to your GreenLeaf account</p>
                
                <form onSubmit={handleLoginSubmit}>
                  <div className="mb-3">
                    <label htmlFor="loginEmail" className="form-label">
                      <i className="fa fa-envelope me-2"></i>Email address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="loginEmail"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      style={{borderColor: 'var(--light-green)'}}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="loginPassword" className="form-label">
                      <i className="fa fa-lock me-2"></i>Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="loginPassword"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      style={{borderColor: 'var(--light-green)'}}
                    />
                  </div>
                  <button className="btn btn-nature w-100" type="submit" style={{padding: '10px', fontWeight: '600'}}>
                    <i className="fa fa-sign-in-alt me-2"></i>Login
                  </button>
                </form>
              </div>
            )}

            {/* Register Form */}
            {!isLogin && (
              <div>
                <h2 className="text-center page-header mb-3" style={{color: 'var(--primary-green)'}}>
                  Create Account
                </h2>
                <p className="text-center text-muted mb-4">Join GreenLeaf community</p>
                
                <form onSubmit={handleRegisterSubmit}>
                  <div className="mb-3">
                    <label htmlFor="registerName" className="form-label">
                      <i className="fa fa-user me-2"></i>Full Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="registerName"
                      placeholder="Enter Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      style={{borderColor: 'var(--light-green)'}}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="registerEmail" className="form-label">
                      <i className="fa fa-envelope me-2"></i>Email address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="registerEmail"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      style={{borderColor: 'var(--light-green)'}}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="registerPassword" className="form-label">
                      <i className="fa fa-lock me-2"></i>Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="registerPassword"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      style={{borderColor: 'var(--light-green)'}}
                    />
                  </div>
                  <button className="btn btn-nature w-100" type="submit" style={{padding: '10px', fontWeight: '600'}}>
                    <i className="fa fa-user-plus me-2"></i>Register
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
