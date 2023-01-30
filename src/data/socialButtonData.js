import { FaceBook, Google, Mail } from '../components/svgImports';
import { BASE_URL } from '../utils/authApi';

export const socialAuthButtonData = [
	{
		id : 'facebook',
		data: 'Continue with Facebook',
		Icon: FaceBook,
		url: `${BASE_URL}auth/social/facebook`,
	},
	{
		id : 'google',
		data: 'Continue with Google',
		Icon: Google,
		url: `${BASE_URL}auth/social/google`,
	},
	{
		id : 'mail',
		data: 'Continue with Email',
		Icon: Mail
	}
];