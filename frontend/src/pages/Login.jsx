import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/users/login', formData);
      localStorage.setItem('token', res.data.token);
      
      // --- THE FIX: Pointing to res.data.user instead of just res.data ---
      localStorage.setItem('user', JSON.stringify({ 
        id: res.data.user.id, 
        name: res.data.user.name, 
        role: res.data.user.role 
      }));
      
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <motion.div 
            className="card shadow-lg p-4 border-0"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="card-body">
              <h3 className="text-center mb-4 fw-bold text-primary">Welcome Back</h3>
              {error && <div className="alert alert-danger rounded-3">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="fw-medium mb-1">Email address</label>
                  <input type="email" name="email" className="form-control" required onChange={handleChange} placeholder="name@example.com" />
                </div>
                <div className="mb-4">
                  <label className="fw-medium mb-1">Password</label>
                  <input type="password" name="password" className="form-control" required onChange={handleChange} placeholder="••••••••" />
                </div>
                <button type="submit" className="btn btn-primary w-100 fs-5 mb-3 py-2 shadow-sm">Sign In</button>
              </form>
              <p className="text-center text-muted mt-3">
                Don't have an account? <Link to="/register" className="text-decoration-none fw-bold">Sign up here</Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;