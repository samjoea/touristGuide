import { useQuery } from '@tanstack/react-query';
import React  from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { validateToken } from '../../utils/authApi';

const SocialLogin = () => {
	const search = new URLSearchParams(useLocation().search);
	const token = search.get('token');
	const navigate = useNavigate();
	const action = search.get('action');

	useQuery({
		queryKey: ['socialLogin'],
		queryFn: () => {
			return validateToken({ accessToken: token });
		},
		retry: false,
		enabled: action != null,
		onSuccess: async (data) => {
			switch (data.status) {
			case 200:
				navigate(`/home?action=access&token=${token}`);
				break;
			case 400:
				localStorage.setItem('accessToken', token);
				navigate('/home');
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
				Redirecting...
			</div>
		</div>
	);
};

export default SocialLogin;