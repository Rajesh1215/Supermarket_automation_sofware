import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Owner from "./owner/owner";
import Manager from "./manager/manager";
import Supervisor from "./supervisor/supervisor";
import Staff from "./staff/staff";
import 'bootstrap/dist/css/bootstrap.min.css';
import UserRoleSelection from "./login";
import { useUserContext } from "./data/data";
function App() {
  const {User}= useUserContext();
  console.log(User);
  return (
    
      <div className="App">
        <Router>
          {/* <Owner /> */}
          <Routes>
            <Route path="/" element={<UserRoleSelection />} />
            <Route path="/owner/*" element={<Owner />} />
            <Route path="/manager/*" element={<Manager />} />
            <Route path="/supervisor/*" element={<Supervisor />} />
            <Route path="/staff/*" element={<Staff />} />

          </Routes>
        </Router>
      </div>
      );
}

export default App;
