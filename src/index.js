import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './index.css';
import App from './LandingPage';
import Sidebar from './Components/SideBar';
import Dashboard from './Components/Dashboard';
import Transaction from './Components/Transaction';
import Reports from './Components/Reports';
import SignIn from './Authentication/Signin';
import SignUp from './Authentication/SignUp';
import LandingPage from './LandingPage';
import { Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const MainLayout = () => {
  const location = useLocation();
  const noSidebarRoutes = ['/signin', '/signup','/'];

  const isAuthPage = noSidebarRoutes.includes(location.pathname);

  return isAuthPage ? (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="*" element={<Navigate to="/signin" />} />
    </Routes>
  ) : (
    <div className="app">
      <Sidebar />
      <div className="main">
        <Routes>
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/add" element={<Transaction />} />
          <Route path="/rep" element={<Reports />} />
          {/* <Route path="*" element={<Navigate to="/" />} /> */}
          
        </Routes>
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>

    <MainLayout />
    <ToastContainer position="top-right" autoClose={3000} />

  </BrowserRouter>
);

// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
// import './index.css';
// import App from './LandingPage';
// import Sidebar from './Components/SideBar';
// import Dashboard from './Components/Dashboard';
// import Transaction from './Components/Transaction';
// import Reports from './Components/Reports';
// import SignIn from './Authentication/Signin';
// import SignUp from './Authentication/SignUp';
// import LandingPage from './LandingPage';
// import { Navigate } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const MainLayout = () => {
//   const location = useLocation();
//   const noSidebarRoutes = ['/signin', '/signup', '/'];

//   const isAuthPage = noSidebarRoutes.includes(location.pathname);

//   return (
//     <>
//       <ToastContainer position="top-right" autoClose={3000} />

//       {isAuthPage ? (
//         <Routes>
//           <Route path="/" element={<LandingPage />} />
//           <Route path="/signin" element={<SignIn />} />
//           <Route path="/signup" element={<SignUp />} />
//           <Route path="*" element={<Navigate to="/signin" />} />
//         </Routes>
//       ) : (
//         <div className="app">
//           <Sidebar />
//           <div className="main">
//             <Routes>
//               <Route path="/Dashboard" element={<Dashboard />} />
//               <Route path="/add" element={<Transaction />} />
//               <Route path="/rep" element={<Reports />} />
//             </Routes>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };
