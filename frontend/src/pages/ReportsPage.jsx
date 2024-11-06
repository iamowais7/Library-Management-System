import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ReportsPage = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get('/api/reports');
        setReports(response.data);
      } catch (error) {
        console.error("Error fetching reports", error);
      }
    };
    fetchReports();
  }, []);

  return (
    <div>
      <h2>Reports</h2>
      <table>
        <thead>
          <tr>
            <th>Report Type</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report, index) => (
            <tr key={index}>
              <td>{report.type}</td>
              <td>{report.details}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportsPage;
