import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [myProperties, setMyProperties] = useState([]);
  const [pendingProperties, setPendingProperties] = useState([]); // For Admins
  const navigate = useNavigate();
  
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchProperties = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/properties');
        
        // 1. Get properties owned by the current user
        const userProps = res.data.filter(property => 
          property.owner === user.id || (property.owner && property.owner._id === user.id)
        );
        setMyProperties(userProps);

        // 2. If the user is an Admin, get ALL unapproved properties
        if (user.role === 'admin') {
          const pending = res.data.filter(property => property.adminApproved === false);
          setPendingProperties(pending);
        }
      } catch (err) {
        console.error('Error fetching properties:', err);
      }
    };

    fetchProperties();
  }, [navigate]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      try {
        await axios.delete(`http://localhost:5000/api/properties/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setMyProperties(myProperties.filter(property => property._id !== id));
        setPendingProperties(pendingProperties.filter(property => property._id !== id));
      } catch (err) {
        alert('Error deleting property');
      }
    }
  };

  const handleApprove = async (id) => {
    try {
      // Send a PUT request to update the adminApproved flag
      await axios.put(`http://localhost:5000/api/properties/${id}`, 
        { adminApproved: true },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Remove it from the pending list on the screen
      setPendingProperties(pendingProperties.filter(p => p._id !== id));
      alert('Property approved and is now live!');
    } catch (err) {
      alert('Error approving property');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">My Dashboard</h2>
      
      {/* --- ADMIN ONLY SECTION --- */}
      {user?.role === 'admin' && (
        <div className="mb-5 p-4 border border-warning rounded bg-light">
          <h4 className="text-warning pb-2">Admin Panel: Pending Approvals</h4>
          <div className="row mt-3">
            {pendingProperties.length === 0 ? (
              <div className="col-12"><p className="text-muted">No pending properties to approve.</p></div>
            ) : (
              pendingProperties.map((property) => (
                <div className="col-md-4 mb-4" key={property._id}>
                  <div className="card shadow-sm border-warning">
                    <div className="card-body">
                      <h5 className="card-title">{property.title}</h5>
                      <p className="card-text text-muted mb-2">📍 {property.location}</p>
                      <button className="btn btn-success btn-sm w-100 mb-2" onClick={() => handleApprove(property._id)}>
                        Approve Listing
                      </button>
                      <button className="btn btn-danger btn-sm w-100" onClick={() => handleDelete(property._id)}>
                        Reject / Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
      {/* --------------------------- */}

      <h4 className="border-bottom pb-2 mt-4">My Posted Properties</h4>
      <div className="row mt-3">
        {myProperties.length === 0 ? (
          <div className="col-12">
            <div className="alert alert-info">You haven't posted any properties yet.</div>
          </div>
        ) : (
          myProperties.map((property) => (
            <div className="col-md-4 mb-4" key={property._id}>
              <div className="card shadow-sm border-0">
                <div className="card-body">
                  <h5 className="card-title">{property.title}</h5>
                  <p className="card-text text-muted mb-2">📍 {property.location}</p>
                  <p className="fw-bold">${property.price}/mo</p>
                  <p>
                    Status: {property.adminApproved === false ? 
                      <span className="text-danger fw-bold">Pending Approval</span> : 
                      <span className="text-success fw-bold">Live</span>
                    }
                  </p>
                  <button className="btn btn-danger btn-sm w-100 mt-2" onClick={() => handleDelete(property._id)}>
                    Delete Listing
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;