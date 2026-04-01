import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Footer, Navbar } from "../components";
import toast from "react-hot-toast";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [hasRegisteredAccount, setHasRegisteredAccount] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const getRegisteredUser = () => {
    try {
      return JSON.parse(localStorage.getItem("greenleafRegisteredUser") || "null");
    } catch (error) {
      return null;
    }
  };

  useEffect(() => {
    const registeredUser = getRegisteredUser();
    const accountExists = Boolean(
      registeredUser &&
        registeredUser.email &&
        registeredUser.password
    );

    setHasRegisteredAccount(accountExists);
    setIsLogin(accountExists);
  }, []);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    const registeredUser = getRegisteredUser();

    if (!registeredUser || !registeredUser.email || !registeredUser.password) {
      toast.error("Please register first");
      setIsLogin(false);
      return;
    }

    const normalizedEmail = email.trim().toLowerCase();
    const isEmailMatch = registeredUser.email === normalizedEmail;
    const isPasswordMatch = registeredUser.password === password;

    if (!isEmailMatch || !isPasswordMatch) {
      toast.error("Invalid email or password");
      return;
    }

    localStorage.setItem(
      "greenleafUser",
      JSON.stringify({
        email: registeredUser.email,
        name: registeredUser.name,
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

    const normalizedEmail = email.trim().toLowerCase();

    localStorage.setItem(
      "greenleafRegisteredUser",
      JSON.stringify({
        name: name.trim(),
        email: normalizedEmail,
        password,
        registeredAt: new Date().toISOString(),
      })
    );

    setHasRegisteredAccount(true);
    setIsLogin(true);
    setPassword("");
    toast.success("Registration successful. Please login now.");
  };

  const handleSwitchTab = (isLoginTab) => {
    if (isLoginTab && !hasRegisteredAccount) {
      toast.error("Register first to enable login");
      return;
    }

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
                disabled={!hasRegisteredAccount}
                style={{
                  flex: 1,
                  border: 'none',
                  background: isLogin && hasRegisteredAccount ? 'var(--secondary-green)' : 'transparent',
                  color: isLogin && hasRegisteredAccount ? 'white' : 'var(--primary-green)',
                  padding: '12px 20px',
                  borderRadius: '8px',
                  fontWeight: '600',
                  cursor: hasRegisteredAccount ? 'pointer' : 'not-allowed',
                  opacity: hasRegisteredAccount ? 1 : 0.6,
                  transition: 'all 0.3s ease',
                  fontSize: '1rem'
                }}
                onMouseEnter={(e) => hasRegisteredAccount && !isLogin && (e.target.style.background = '#e8f5e9')}
                onMouseLeave={(e) => hasRegisteredAccount && !isLogin && (e.target.style.background = 'transparent')}
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
            {!hasRegisteredAccount && (
              <p className="text-center text-muted mt-n3 mb-4">
                Please register first. Login will unlock after registration.
              </p>
            )}

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
