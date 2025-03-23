import React, { useState } from 'react';

const App = () => {
    const [isLoginVisible, setIsLoginVisible] = useState(false);
    const [isRegisterVisible, setIsRegisterVisible] = useState(false);

    const toggleLogin = () => {
        setIsLoginVisible(!isLoginVisible);
        setIsRegisterVisible(false);
    };

    const toggleRegister = () => {
        setIsRegisterVisible(!isRegisterVisible);
        setIsLoginVisible(false);
    };

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center vh-100" style={{ background: 'linear-gradient(135deg, #1e3c72, #2a5298)' }}>
            {/* Welcome Section */}
            <div className={`text-center text-white p-5 rounded-4 shadow-lg ${isLoginVisible || isRegisterVisible ? 'd-none' : ''}`} style={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
                <h1 className="display-4 fw-bold mb-4" style={{ color: '#fff', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>
                    Welcome to <span style={{ color: '#ff7e5f' }}>CollabTool</span>
                </h1>
                <p className="lead mb-4" style={{ fontSize: '1.25rem', color: '#e0e0e0' }}>
                    CollabTool is your go-to platform for seamless real-time collaboration. 
                    Work together on documents, share ideas, and communicate effortlessly with your team.
                </p>
                <hr className="my-4" style={{ borderColor: 'rgba(255, 255, 255, 0.3)' }} />
                <p className="mb-5" style={{ fontSize: '1.1rem', color: '#e0e0e0' }}>
                    Whether you're working on a team project or just need to organize your thoughts, 
                    CollabTool offers all the features you need to stay productive.
                </p>
                <div className="mt-4">
                    <button 
                        onClick={toggleRegister} 
                        className="btn btn-lg me-3" 
                        style={{
                            background: 'linear-gradient(45deg, #ff7e5f, #feb47b)',
                            border: 'none',
                            color: '#fff',
                            fontWeight: '600',
                            padding: '12px 30px',
                            borderRadius: '30px',
                            boxShadow: '0 4px 15px rgba(255, 126, 95, 0.4)',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        Register
                    </button>
                    <button 
                        onClick={toggleLogin} 
                        className="btn btn-lg" 
                        style={{
                            background: 'linear-gradient(45deg, #6a11cb, #2575fc)',
                            border: 'none',
                            color: '#fff',
                            fontWeight: '600',
                            padding: '12px 30px',
                            borderRadius: '30px',
                            boxShadow: '0 4px 15px rgba(106, 17, 203, 0.4)',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        Login
                    </button>
                </div>
            </div>

            {/* Login Form */}
            {isLoginVisible && (
                <div className="card p-4 shadow-lg" style={{ width: '100%', maxWidth: '450px', borderRadius: '15px', border: 'none', background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)' }}>
                    <h2 className="text-center mb-4" style={{ color: '#fff', fontWeight: '600' }}>Login</h2>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label" style={{ color: '#e0e0e0' }}>Email address</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                style={{ borderRadius: '10px', padding: '12px', border: '1px solid rgba(255, 255, 255, 0.3)', background: 'rgba(255, 255, 255, 0.1)', color: '#fff' }}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label" style={{ color: '#e0e0e0' }}>Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                style={{ borderRadius: '10px', padding: '12px', border: '1px solid rgba(255, 255, 255, 0.3)', background: 'rgba(255, 255, 255, 0.1)', color: '#fff' }}
                                required
                            />
                        </div>
                        <button 
                            type="submit" 
                            className="btn btn-primary w-100 mt-3" 
                            style={{
                                borderRadius: '10px',
                                padding: '12px',
                                fontWeight: '600',
                                fontSize: '16px',
                                background: 'linear-gradient(45deg, #6a11cb, #2575fc)',
                                border: 'none',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            Login
                        </button>
                    </form>
                    <p className="text-center mt-3" style={{ color: '#e0e0e0' }}>
                        Don't have an account?{' '}
                        <button onClick={toggleRegister} style={{ background: 'none', border: 'none', color: '#ff7e5f', cursor: 'pointer' }}>Register</button>
                    </p>
                </div>
            )}

            {/* Registration Form */}
            {isRegisterVisible && (
                <div className="card p-4 shadow-lg" style={{ width: '100%', maxWidth: '450px', borderRadius: '15px', border: 'none', background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)' }}>
                    <h2 className="text-center mb-4" style={{ color: '#fff', fontWeight: '600' }}>Register</h2>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label" style={{ color: '#e0e0e0' }}>Username</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                style={{ borderRadius: '10px', padding: '12px', border: '1px solid rgba(255, 255, 255, 0.3)', background: 'rgba(255, 255, 255, 0.1)', color: '#fff' }}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label" style={{ color: '#e0e0e0' }}>Email address</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                style={{ borderRadius: '10px', padding: '12px', border: '1px solid rgba(255, 255, 255, 0.3)', background: 'rgba(255, 255, 255, 0.1)', color: '#fff' }}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label" style={{ color: '#e0e0e0' }}>Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                style={{ borderRadius: '10px', padding: '12px', border: '1px solid rgba(255, 255, 255, 0.3)', background: 'rgba(255, 255, 255, 0.1)', color: '#fff' }}
                                required
                            />
                        </div>
                        <button 
                            type="submit" 
                            className="btn btn-primary w-100 mt-3" 
                            style={{
                                borderRadius: '10px',
                                padding: '12px',
                                fontWeight: '600',
                                fontSize: '16px',
                                background: 'linear-gradient(45deg, #ff7e5f, #feb47b)',
                                border: 'none',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            Register
                        </button>
                    </form>
                    <p className="text-center mt-3" style={{ color: '#e0e0e0' }}>
                        Already have an account?{' '}
                        <button onClick={toggleLogin} style={{ background: 'none', border: 'none', color: '#6a11cb', cursor: 'pointer' }}>Login</button>
                    </p>
                </div>
            )}
        </div>
    );
};

export default App;