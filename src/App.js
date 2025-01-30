import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import UserForm from "./components/UserForm";
import {HashRouter} from "react-router-dom";

const App = () => {
  return (
    <HashRouter>
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<UserForm isEdit={false} />} />
          <Route path="/edit/:id" element={<UserForm isEdit={true} />} />
        </Routes>
      </div>
    </HashRouter>
  );
};

export default App;
