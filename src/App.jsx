import React from 'react';
//import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage from "./pages/HomePage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import './index.css';
import Navbar from './components/common/Navbar.tsx';
import ProjectDetail from './pages/ProjectDetail.tsx';
import KeycloakRoute from './routes/KeycloakRoute';


export default function App(){
    console.log("App render")
  return(
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/home" element={<HomePage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/profile" element={
            <KeycloakRoute role="default-roles-lagaltusers" redirectTo='/NotAuthorized'>
              <ProfilePage/>
            </KeycloakRoute>
          }
        />
        <Route path="/projectDetails/:id" element={<ProjectDetail/>}/>
      </Routes>
    </BrowserRouter>
  );
}

//const root = ReactDOM.createRoot(document.getElementById('root'));
//root.render(<App/>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();