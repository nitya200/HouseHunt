import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axios.get('https://househunt-backend-6vgr.onrender.com/api/properties');
        setProperties(res.data);
      } catch (err) {
        console.error('Error fetching properties:', err);
      }
    };
    fetchProperties();
  }, []);

  const filteredProperties = properties.filter((property) => {
    const isApproved = property.adminApproved !== false;
    const matchLocation = property.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchType = typeFilter === '' || property.type === typeFilter;
    const matchPrice = maxPrice === '' || property.price <= parseInt(maxPrice);
    
    return isApproved && matchLocation && matchType && matchPrice;
  });

  // --- Animation Rules ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15 // This creates the cascade effect
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100, damping: 15 }
    }
  };

  return (
    <div className="container mt-5">
      <motion.h2 
        className="mb-4 text-center fw-bold"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Explore Available Properties
      </motion.h2>
      
      <motion.div 
        className="row mb-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="col-md-4 mb-2">
          <input type="text" className="form-control" placeholder="Search by Location (e.g. Downtown)" onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
        <div className="col-md-4 mb-2">
          <select className="form-select" onChange={(e) => setTypeFilter(e.target.value)}>
            <option value="">All Types</option>
            <option value="Apartment">Apartment</option>
            <option value="House">House</option>
            <option value="Villa">Villa</option>
            <option value="Commercial">Commercial</option>
          </select>
        </div>
        <div className="col-md-4 mb-2">
          <input type="number" className="form-control" placeholder="Max Price (per month)" onChange={(e) => setMaxPrice(e.target.value)} />
        </div>
      </motion.div>

      {/* --- Animated Grid --- */}
      <motion.div 
        className="row"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {filteredProperties.length === 0 ? (
          <div className="col-12 text-center">
            <p className="lead text-muted">No properties found matching your criteria.</p>
          </div>
        ) : (
          filteredProperties.map((property) => (
            <motion.div className="col-md-4 mb-4" key={property._id} variants={itemVariants}>
              <div className="card h-100 p-2">
                <div className="card-body">
                  <h5 className="card-title text-primary fw-bold">{property.title}</h5>
                  <h6 className="card-subtitle mb-3 text-muted">📍 {property.location}</h6>
                  <p className="card-text text-truncate opacity-75">{property.description}</p>
                  <hr className="text-muted" />
                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <span className="fw-bold fs-5 text-dark">${property.price}<span className="fs-6 text-muted fw-normal">/mo</span></span>
                    <span className="badge bg-primary rounded-pill px-3 py-2">{property.type}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </motion.div>
    </div>
  );
};

export default Home;