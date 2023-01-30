import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { verifyEmail } from '../../utils/authApi';
import { toast } from 'react-toastify';


function EmailVerificationRedirect() {
	const search = new URLSearchParams(useLocation().search);
	const id = search.get('id');
	const navigate = useNavigate();

	useQuery({
		queryKey: ['verifyEmail'],
		queryFn: () => {
			return verifyEmail({ token: id });
		},
		retry: false,
		enabled: id.length > 0,
		onSuccess: async (data) => {
			switch (data.status) {
			case 200:
				toast.success('Email Verified Successfully!');
				navigate('/');
				break;
			case 401:
				toast.error('Link expired!');
				break;
			default:
				toast.error(data.data.message);
				break;
			}
		}
	});

	return ( 
		<div className="h-screen flex justify-center items-center">
			<div className="text-center">
				<h1>Redirecting...</h1>
			</div>
		</div>
	);
}

export default EmailVerificationRedirect;