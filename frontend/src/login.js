import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from './data/data';

const UserRoleSelection = () => {
  const context = useUserContext();
  const [userRole, setUserRole] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const navigate = useNavigate();

  const handleUserRoleChange = (event) => {
    setUserRole(event.target.value);
  };

  const handleEmployeeChange = (event) => {
    setSelectedEmployee(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Assuming that you have an array of employees in your context named Employees
    const selectedEmployeeData = context.Employees.find(
      (employee) => employee.name === selectedEmployee
    );

    context.setUser({
      username: selectedEmployeeData.name,
      status: userRole,
      id:selectedEmployeeData.user_id,
    });

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

  // Assuming that you have an array of employees in your context named Employees
  const employeeNames = context.Employees
    .filter((employee) => employee.status === userRole)
    .map((employee) => employee.name);

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

        {userRole && (
          <>
            <label htmlFor="employee">Select Employee:</label>
            <select id="employee" value={selectedEmployee} onChange={handleEmployeeChange}>
              <option value="">Select Employee</option>
              {employeeNames.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </>
        )}

        <button type="submit">Next</button>
      </form>
    </div>
  );
};

export default UserRoleSelection;
