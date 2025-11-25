import React from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import PublicationsList from "./PublicationsList";
import PublicationForm from "./PublicationForm";
import Login from "./Login";
import Signup from "./Signup";
import PublicPublications from "./PublicPublications";

export default function App() {
  const nav = useNavigate();
  return (
    <>
      <header className="app-nav">
        <div className="inner">
          <a className="brand" onClick={() => nav("/")}>
            <span className="dot" style={{marginRight:8}}></span> Beehively
          </a>

          <nav className="nav-links">
            <Link to="/">My Pubs</Link>
            <Link to="/new">New</Link>
            <Link to="/public">Public</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </nav>
        </div>
      </header>

      <main className="container">
        <Routes>
          <Route path="/" element={<PublicationsList />} />
          <Route path="/new" element={<PublicationForm />} />
          <Route path="/publications/:id/edit" element={<PublicationForm />} />
          <Route path="/public" element={<PublicPublications />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </main>
    </>
  );
}
