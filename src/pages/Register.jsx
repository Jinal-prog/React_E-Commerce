import React, { useState } from 'react'
import { Footer, Navbar } from "../components";
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !email || !password) {
            toast.error('Please fill all fields');
            return;
        }

        const normalizedEmail = email.trim().toLowerCase();

        localStorage.setItem(
            'greenleafRegisteredUser',
            JSON.stringify({
                name: name.trim(),
                email: normalizedEmail,
                password,
                registeredAt: new Date().toISOString(),
            })
        );

        toast.success('Registration successful. Please login now.');
        navigate('/login');
    };

    return (
        <>
            <Navbar />
            <div className="container my-3 py-3">
                <h1 className="text-center page-header" style={{color: 'var(--primary-green)'}}>
                    <i className="fa fa-user-plus me-3"></i>Register
                </h1>
                <p className="text-center text-muted">Join GreenLeaf Nursery community</p>
                <hr style={{borderColor: 'var(--light-green)', borderWidth: '2px'}} />
                <div className="row my-4 h-100">
                    <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
                        <form onSubmit={handleSubmit}>
                            <div className="form my-3">
                                <label htmlFor="Name" className="form-label"><i className="fa fa-user me-2"></i>Full Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="Name"
                                    placeholder="Enter Your Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form my-3">
                                <label htmlFor="Email" className="form-label"><i className="fa fa-envelope me-2"></i>Email address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="Email"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form my-3">
                                <label htmlFor="Password" className="form-label"><i className="fa fa-lock me-2"></i>Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="Password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="my-3">
                                <p>Already has an account? <Link to="/login" style={{color: 'var(--secondary-green)', fontWeight: 'bold'}}>Login</Link> </p>
                            </div>
                            <div className="text-center">
                                <button className="my-2 mx-auto btn btn-nature" type="submit">
                                    <i className="fa fa-user-plus me-2"></i>Register
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Register
