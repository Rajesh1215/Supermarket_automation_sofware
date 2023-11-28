import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserRoleSelection = () => {
  const [userRole, setUserRole] = useState('');
  const navigate = useNavigate();

  const handleUserRoleChange = (event) => {
    setUserRole(event.target.value);
  };

  const handleSubmit = () => {
    switch (userRole) {
      case 'owner':
        navigate('/owner');
        break;
      case 'manager':
        navigate('/manager');
        break;
      case 'supervisor':
        navigate('/supervisor');
        break;
      case 'staff':
        navigate('/staff');
        break;
      default:
        alert('Please select a valid user role.');
    }
  };

  return (
    <div className="user-role-selection-container">
      <h2>Select Your User Role</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="userRole">User Role:</label>
        <select id="userRole" value={userRole} onChange={handleUserRoleChange}>
          <option value="">Select Role</option>
          <option value="owner">Owner</option>
          <option value="manager">Manager</option>
          <option value="supervisor">Supervisor</option>
          <option value="staff">Staff</option>
        </select>
        <button type="submit">Next</button>
      </form>
    </div>
  );
};

export default UserRoleSelection;
