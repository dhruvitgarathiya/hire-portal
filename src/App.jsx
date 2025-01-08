import React from "react";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import Home from "./pages/Home";
import ApplyJobs from "./pages/ApplyJobs";
import Applications from "./pages/Applications";
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/apply-job/:id" element={<ApplyJobs />}></Route>
        <Route path="/applications" element={<Applications />}></Route>
      </Routes>
    </div>
  );
};

export default App;
