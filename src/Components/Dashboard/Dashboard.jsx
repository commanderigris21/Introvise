import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import axios from 'axios';
import jsPDF from 'jspdf';

function Dashboard() {
  const [progressData, setProgressData] = useState({ progress1: 0, progress2: 0, progress3: 0 });

  useEffect(() => {
    const fetchProgressData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/progress');
        setProgressData(response.data); // Assuming the response contains 'progress1', 'progress2', and 'progress3' fields
      } catch (error) {
        console.error('Error fetching progress data:', error);
      }
    };

    fetchProgressData();
  }, []);

  const handleDownloadCertificate = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/certificate');
      const certificateData = response.data;

      const doc = new jsPDF();
      doc.text('Certificate of Achievement', 10, 10);
      doc.text(`Beheviour: ${certificateData.progress1}%`, 10, 20);
      doc.text(`Communication: ${certificateData.progress2}%`, 10, 30);
      doc.text(`Problem Solving: ${certificateData.progress3}%`, 10, 40);
      doc.save('certificate.pdf');
    } catch (error) {
      console.error('Error fetching certificate data:', error);
    }
  };

  const handleDownloadReport = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/report');
      const reportData = response.data;

      const doc = new jsPDF();
      doc.text('Progress Report', 10, 10);
      doc.text(`Beheviour: ${reportData.progress1}%`, 10, 20);
      doc.text(`Communication: ${reportData.progress2}%`, 10, 30);
      doc.text(`Problem Solving: ${reportData.progress3}%`, 10, 40);
      doc.save('report.pdf');
    } catch (error) {
      console.error('Error fetching report data:', error);
    }
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-header">Dashboard</h1>
      <div className="progress-bars">
        <div className="progress-bar">
          <p className='progress-text1'>Beheviour</p>
          <CircularProgressbar value={progressData.progress1} maxValue={100} text={`${progressData.progress1}%`} />
        </div>
        <div className="progress-bar">
          <p className='progress-text2'>Communication</p>
          <CircularProgressbar value={progressData.progress2} maxValue={100} text={`${progressData.progress2}%`} />
        </div>
        <div className="progress-bar">
          <p className='progress-text3'>Problem Solving</p>
          <CircularProgressbar value={progressData.progress3} maxValue={100} text={`${progressData.progress3}%`} />
        </div>
      </div>
      <table className="progress-table">
        <thead>
          <tr>
            <th>Beheviour</th>
            <th>Communication</th>
            <th>Problem Solving</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{progressData.progress1}%</td>
            <td>{progressData.progress2}%</td>
            <td>{progressData.progress3}%</td>
          </tr>
        </tbody>
      </table>
      <div className="buttons-container">
        <button className="download-button" onClick={handleDownloadCertificate}>Download Certificate</button>
        <button className="download-button" onClick={handleDownloadReport}>Download Report</button>
      </div>
    </div>
  );
}

export default Dashboard;
