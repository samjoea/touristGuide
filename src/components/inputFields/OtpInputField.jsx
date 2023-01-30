import React, { useState }  from 'react';
import { useFormContext } from 'react-hook-form';

const OtpInputField = () => {
	const { register, getValues } = useFormContext();
	const [isFocused, setIsFocused] = useState(false);

	return (
		<>
			<div className={`border w-[11.438rem] ml-7 h-14 centerRow px-1 rounded-lg mb-6 ${isFocused ? ' border-2 border-black': ''}`}>
				{['-','-','-','-'].map((digit, i )=> {
					return (
						<input
							onFocus={() => setIsFocused(true)}
							{...register(`otp.${i}`, {
								value: getValues(`otp.${i}`),
								onChange: (e) => {
									e.target.nextSibling?.focus();
								},
								validate: (e, data) => {
									if(data['otp'].every(v => v === ''))
										return 'Code is invalid.';
									if(!/^\+?[0-9]\d{0,1}$/.test(e))
										return 'Code is invalid';
								},
							}
							)}
							key={i}
							type="text" placeholder={'-'}
							maxLength={1}
							className='w-full center pl-4 appearance-none h1 focus:outline-none'
						/>
					);})}
			</div>
		</>

	);
};

export default OtpInputField;