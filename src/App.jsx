import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import "./index.css";
import Navbar from "./components/common/Navbar.tsx";
import ProjectDetail from "./pages/ProjectDetail.tsx";
import KeycloakRoute from "./routes/KeycloakRoute";
import Footer from "./components/common/Footer.tsx";
import TestPage from "./pages/TestPage.tsx";

export default function App() {
  console.log("App render");
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/profile"
          element={
            <KeycloakRoute redirectTo="/home">
              <ProfilePage />
            </KeycloakRoute>
          }
        />
        <Route path="/projectDetails/:id" element={<ProjectDetail />} />
        <Route path="/users/:username" element={<ProfilePage />} />
        <Route path="/test" element={<TestPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();