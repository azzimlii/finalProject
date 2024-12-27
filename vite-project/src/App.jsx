import React from 'react';
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import Lists from './pages/lists/Lists';
import Homepage1 from './pages/homepage1/homepage1';
import { Provider } from 'react-redux';
import { store } from './app/store';
import Details from './pages/details/Details';
import Homepage2 from './pages/homepage2/homepage2';
import SignUp from './pages/signInForm/SignUp';
import LogIn from './pages/logInForm/LogIn';
import AdminPanel1 from './pages/adminPanel1/AdminPanel1';
import AdminPanel2 from './pages/adminPanel2/AdminPanel2';
import AdminPanel3 from './pages/adminPanel3/AdminPanel3';

export default function App() {
  return (
    <BrowserRouter>
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Homepage1 />} />
        <Route path="/homepage2" element={<Homepage2 />} />
        <Route path="/lists" element={<Lists />} />
        <Route path="/details/:coinId" element={<Details />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/adminpanel1" element={<AdminPanel1 />} />
        <Route path="/adminpanel2" element={<AdminPanel2 />} />
        <Route path="/adminpanel3" element={<AdminPanel3 />} />
      </Routes>
      </Provider>
    </BrowserRouter>
  );
}
