import axios from 'axios';

export const BASE_URL = `${import.meta.env.VITE_APP_BASE_URL}`;

export const authApi = axios.create({
	baseURL: BASE_URL,
});

authApi.defaults.headers.common['Content-Type'] = 'application/json';

export const sendOtp = async (phone) => {
	try {
		const { data } = await authApi.post('auth/sendOTP', phone);
		return data || 'request failed';
	} catch (error) {
		return error.response;
	}
};

export const verifyOtp = async (otpData) => {
	try {
		const data  = await authApi.post('auth/verifyOTP', otpData);
		return data;
	} catch (error) {
		return error.response;
	}
};

export const createProfile = async (user) => {
	try {
		const data = await authApi.post('auth/register-user', user);
		return data;
	} catch (error) {
		return error.response;
	}
};


export const uploadProfilePic = async (file, accessToken) => {
	try {
		const res  = await authApi.post('profile/profilePic', file, {
			headers: {
				'authorization': `Bearer ${accessToken}`,
				'content-type': 'multipart/form-data'
			}
		});
		return res;
	} catch (error) {
		return error.response;
	}
};

export const getProfilePic = async (accessToken) => {
	try {
		const res = await authApi.get('profile/profilePic', {
			headers: {
				'authorization': `Bearer ${accessToken}`,
			}
		});
		return res;
	} catch (error) {
		return error.response;
	}
};

export const registerWithEmail = async (data) => {
	try {
		const res  = await authApi.post('auth/register-email', data);
		return res;
	} catch (error) {
		return error.response;
	}
};

export const verifyEmail = async (data) => {
	try {
		const res  = await authApi.post('auth/verify-email', data);
		return res;
	} catch (error) {
		return error.response;
	}
};


export const initiatePasswordReset = async (data) => {
	try {
		const res  = await authApi.post('auth/initiate-reset', data);
		return res;
	} catch (error) {
		return error.response;
	}
};

export const resetPassword = async (data) => {
	try {
		const res  = await authApi.post('auth/reset-password', data);
		return res;
	} catch (error) {
		return error.response;
	}
};

export const validateToken = async (data) => {
	try {
		const res  = await authApi.post('auth/social/validateToken', data);
		return res;
	} catch (error) {
		return error.response;
	}
};


