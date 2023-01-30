import PasswordValidator from 'password-validator';

export const generateObjFromArray = (arrValues, arrKeys) => {
	return arrKeys.reduce((acc, current, index) => ({...acc, [current]: arrValues[index]}), {});
};

export const displayPicUpload = (file) => {
	if (!file) return null;
	const img = URL.createObjectURL(file);
	return img;
};

export const passwordStrength = (password) => {
	const schema = new PasswordValidator();
	schema.is().min(8)
		.has().uppercase()
		.has().lowercase()
		.has().digits(1)
		.has().symbols(1);
	
	const errorMessages = schema.validate(password, {details: true});
	const passError = {
		uppercase: 'One uppercase',
		lowercase: 'One lowercase',
		digits: 'One digit',
		symbols: 'One special character',
		min: 'A minimum of 8',
	};
	return errorMessages.map(item => passError[item.validation]);
};


export const returnStrength = (value) => {
	switch (value) {
	case 5:
		return [0, 'bg-red-700'];
	case 4:
		return [20, 'bg-red-500'];
	case 3:
		return [40, 'bg-red-300'];
	case 2:
		return [60, 'bg-yellow-400'];
	case 1:
		return [80, 'bg-primaryTeal'];
	case 0:
		return [100, 'bg-primaryTeal'];
	default:
		return [0, 'bg-primaryTeal'];
	}
};
