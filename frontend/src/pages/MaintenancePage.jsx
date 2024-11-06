import React from 'react';
import { Link } from 'react-router-dom';

const MaintenancePage = () => {
  return (
    <div>
      <h2>Admin Maintenance Page</h2>
      <nav>
        <Link to="/add-membership">Add Membership</Link>
        <Link to="/update-membership">Update Membership</Link>
        <Link to="/add-book">Add Book</Link>
        <Link to="/update-book">Update Book</Link>
        <Link to="/user-management">User Management</Link>
      </nav>
    </div>
  );
};

export default MaintenancePage;
