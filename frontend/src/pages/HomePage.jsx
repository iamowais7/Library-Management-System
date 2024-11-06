import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = ({ role }) => {
  return (
    <div>
      <h2>Welcome to the Library Management System</h2>
      <nav>
        <Link to="/reports">Reports</Link>
        <Link to="/transactions">Transactions</Link>
        {role === 'admin' && (
          <>
            <Link to="/maintenance">Maintenance</Link>
          </>
        )}
      </nav>
    </div>
  );
};

export default HomePage;
