import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const { data } = await axios.post('http://localhost:5000/api/auth/register', { name, email, password });
            localStorage.setItem('token', data.token);
            navigate('/login');
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError('An unexpected error occurred. Please try again later.');
            }
        }
    };

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center vh-100" style={{ background: 'linear-gradient(135deg, #1e3c72, #2a5298)' }}>
            <div className="card p-4 shadow-lg" style={{ width: '100%', maxWidth: '450px', borderRadius: '15px', border: 'none', background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)' }}>
                <h2 className="text-center mb-4" style={{ color: '#fff', fontWeight: '600' }}>Register</h2>
                <form onSubmit={handleRegister}>
                    {/* Username Field */}
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label" style={{ color: '#e0e0e0' }}>Username</label>
                        <input
                            type="text"
                            className="form-control rounded-pill"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            style={{ borderRadius: '30px', padding: '12px', border: '1px solid rgba(255, 255, 255, 0.3)', background: 'rgba(255, 255, 255, 0.1)', color: '#fff' }}
                        />
                    </div>

                    {/* Email Field */}
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label" style={{ color: '#e0e0e0' }}>Email address</label>
                        <input
                            type="email"
                            className="form-control rounded-pill"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{ borderRadius: '30px', padding: '12px', border: '1px solid rgba(255, 255, 255, 0.3)', background: 'rgba(255, 255, 255, 0.1)', color: '#fff' }}
                        />
                    </div>

                    {/* Password Field */}
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label" style={{ color: '#e0e0e0' }}>Password</label>
                        <input
                            type="password"
                            className="form-control rounded-pill"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{ borderRadius: '30px', padding: '12px', border: '1px solid rgba(255, 255, 255, 0.3)', background: 'rgba(255, 255, 255, 0.1)', color: '#fff' }}
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="btn btn-primary w-100 rounded-pill mt-3"
                        style={{
                            background: 'linear-gradient(45deg, #ff7e5f, #feb47b)',
                            border: 'none',
                            color: '#fff',
                            fontWeight: '600',
                            padding: '12px',
                            fontSize: '16px',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        Register
                    </button>
                </form>

                {/* Error Message */}
                {error && (
                    <div className="alert alert-danger mt-3" style={{ borderRadius: '10px', textAlign: 'center', background: 'rgba(255, 107, 107, 0.1)', border: '1px solid rgba(255, 107, 107, 0.3)', color: '#ff6b6b' }}>
                        {error}
                    </div>
                )}

                {/* Login Link */}
                <p className="text-center mt-4" style={{ color: '#e0e0e0' }}>
                    Already have an account?{' '}
                    <a href="/" style={{ color: '#6a11cb', textDecoration: 'none', fontWeight: '500' }}>Login</a>
                </p>
            </div>
        </div>
    );
};

export default Register;