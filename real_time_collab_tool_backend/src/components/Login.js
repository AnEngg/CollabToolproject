import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('http://localhost:5000/api/auth/login', { email, password });

            // Save user data in local storage
            localStorage.setItem('user', JSON.stringify({ username: data.username, token: data.token }));

            // Navigate to dashboard
            navigate('/dashboard');
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
                <h2 className="text-center mb-4" style={{ color: '#fff', fontWeight: '600' }}>Login</h2>
                <form onSubmit={handleLogin}>
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
                    <button
                        type="submit"
                        className="btn btn-primary w-100 rounded-pill mt-3"
                        style={{
                            background: 'linear-gradient(45deg, #6a11cb, #2575fc)',
                            border: 'none',
                            color: '#fff',
                            fontWeight: '600',
                            padding: '12px',
                            fontSize: '16px',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        Login
                    </button>
                </form>
                {error && <p className="text-danger mt-3 text-center" style={{ color: '#ff6b6b' }}>{error}</p>}
                <p className="text-center mt-3" style={{ color: '#e0e0e0' }}>
                    Don't have an account?{' '}
                    <a href="/register" style={{ color: '#ff7e5f', textDecoration: 'none', fontWeight: '500' }}>Register</a>
                </p>
            </div>
        </div>
    );
};

export default Login;