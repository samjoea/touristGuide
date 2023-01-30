import { FaceBook, Google, CallIcon } from '../components/svgImports';
import { BASE_URL } from '../utils/authApi';

export const emailAuth = [
	{
		id : 'facebook',
		data: 'Continue with Facebook',
		url: `${BASE_URL}auth/social/facebook`,
		Icon: FaceBook
	},
	{
		id : 'google',
		data: 'Continue with Google',
		url: `${BASE_URL}auth/social/google`,
		Icon: Google
	},
	{
		id : 'phone',
		data: 'Continue with Phone',
		Icon: CallIcon
	}
];