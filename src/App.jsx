import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import { ToastContainer } from 'react-toastify';
import EmailVerificationRedirect from './pages/featurePages/EmailVerificationRedirect';
import SocialLogin from './pages/featurePages/ResetPasswordRedirect';


function App() {
	return (
		<>
			<ToastContainer />
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/home' element={<HomePage />} />
				<Route path='/verify-email' element={<EmailVerificationRedirect />} />
				<Route path='/social-login' element={<SocialLogin />} />
			</Routes>
		</>
	);
}

export default App;
