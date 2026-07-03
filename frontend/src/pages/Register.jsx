import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'user' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/users/register', formData);
      alert('Registration successful! Please login.');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <motion.div 
            className="card shadow-lg p-4 border-0"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="card-body">
              <h3 className="text-center mb-4 fw-bold text-primary">Create an Account</h3>
              {error && <div className="alert alert-danger rounded-3">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="fw-medium mb-1">Full Name</label>
                  <input type="text" name="name" className="form-control" required onChange={handleChange} placeholder="John Doe" />
                </div>
                <div className="mb-3">
                  <label className="fw-medium mb-1">Email address</label>
                  <input type="email" name="email" className="form-control" required onChange={handleChange} placeholder="name@example.com" />
                </div>
                <div className="mb-3">
                  <label className="fw-medium mb-1">Password</label>
                  <input type="password" name="password" className="form-control" required onChange={handleChange} placeholder="Create a strong password" />
                </div>
                <div className="mb-4">
                  <label className="fw-medium mb-1">I want to...</label>
                  <select name="role" className="form-select bg-light" onChange={handleChange}>
                    <option value="user">Browse Properties (Standard User)</option>
                    <option value="admin">Post Properties (Admin/Owner)</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-primary w-100 fs-5 py-2 shadow-sm">Register Now</button>
              </form>
              <p className="text-center text-muted mt-4">
                Already have an account? <Link to="/login" className="text-decoration-none fw-bold">Sign in here</Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Register;