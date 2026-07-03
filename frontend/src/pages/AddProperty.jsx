import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddProperty = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    price: '',
    type: 'Apartment' // Default value matching your schema
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 1. Grab the token from local storage
    const token = localStorage.getItem('token');

    if (!token) {
      alert('You must be logged in to add a property');
      navigate('/login');
      return;
    }

    try {
      // 2. Send the request with the Authorization header attached
      await axios.post('https://househunt-backend-6vgr.onrender.com/api/properties', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      alert('Property added successfully!');
      navigate('/'); // Redirect to home so they can see their new post
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Failed to add property');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-body">
              <h3 className="text-center mb-4">Post a New Property</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label>Title</label>
                  <input type="text" name="title" className="form-control" required onChange={handleChange} placeholder="e.g. Modern 2BHK in Downtown" />
                </div>
                <div className="mb-3">
                  <label>Description</label>
                  <textarea name="description" className="form-control" rows="3" required onChange={handleChange} placeholder="Describe the property..."></textarea>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label>Location</label>
                    <input type="text" name="location" className="form-control" required onChange={handleChange} placeholder="City, Area" />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label>Price (per month)</label>
                    <input type="number" name="price" className="form-control" required onChange={handleChange} placeholder="e.g. 15000" />
                  </div>
                </div>
                <div className="mb-4">
                  <label>Property Type</label>
                  <select name="type" className="form-select" onChange={handleChange}>
                    <option value="Apartment">Apartment</option>
                    <option value="House">House</option>
                    <option value="Villa">Villa</option>
                    <option value="Commercial">Commercial</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-primary w-100 fs-5">Publish Listing</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProperty;