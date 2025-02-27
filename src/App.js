import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";
import Home from "./components/Home";
import Mahasiswa from "./components/Mahasiswa";
import Create from "./components/Create";
import Detail from "./components/Detail";
import Edit from "./components/Edit";
import Delete from "./components/Delete";

function App() {
  return (
    <Router>
      <>
        <nav className="navbar navbar-expand-lg bg-info">
          <div className="container-fluid">
            <NavLink className="navbar-brand" to="/">
              Belajar ReactJS
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/mahasiswa">
                    Mahasiswa
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mahasiswa" element={<Mahasiswa />} />
          <Route path="/mahasiswa/create" element={<Create />} />
          <Route path="/mahasiswa/:id" element={<Detail />} />
          <Route path="/mahasiswa/:id/edit" element={<Edit />} />
          <Route path="/mahasiswa/:id/delete" element={<Delete />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
