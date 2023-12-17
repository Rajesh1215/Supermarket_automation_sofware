import React from "react";
import "./profile.css"
const Profile = () => {
  return (
    <div className="profile-main-container">
      <div className="profile-performance d-flex flex-wrap justify-content-between">
        <div className="profile">
        <img src="https://via.placeholder.com/150x150" alt="hi" />
          <div className="profile-info">
            <h2>John Doe</h2>
            <p>Software Engineer</p>
            <p>john.doe@example.com</p>
          </div>
        </div>

        <div className="performance">
          <h2>Performance Highlights</h2>
          <ul>
            <li>Received an "Exceeds Expectations" performance rating in the last review</li>
            <li>Successfully completed two major projects on time and within budget</li>
            <li>Consistently exceeded individual sales targets</li>
          </ul>
        </div>
      </div>

      <div className="alldetails-community d-flex flex-wrap justify-content-between">
        <div className="alldetails">
          <h2>Employee Details</h2>
          <ul>
            <li>Department: Engineering</li>
            <li>Location: New York</li>
            <li>Start Date: 2020-01-01</li>
            <li>Manager: Jane Smith</li>
          </ul>
        </div>

        <div className="community">
          <h2>Employee Community Engagement</h2>
          <ul>
            <li>Member of the company's softball team</li>
            <li>Volunteer for the company's charity events</li>
            <li>Participates in regular company social gatherings</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
