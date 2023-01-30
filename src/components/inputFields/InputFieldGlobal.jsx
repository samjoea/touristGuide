import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';

const InputFieldGlobal = ({ placeholder, name }) => {
	const [isFocused, setIsFocused] = useState(false);
	const [isFilled, setIsFilled] = useState(false);
	const { register, getValues, formState: { errors } } = useFormContext();

	const fieldRegexs = {
		email: /^([a-zA-Z0-9_\-\\.]+)@([a-zA-Z0-9_\\-]+)(\.[a-zA-Z]{2,5}){1,2}$/,
		resetEmail: /^([a-zA-Z0-9_\-\\.]+)@([a-zA-Z0-9_\\-]+)(\.[a-zA-Z]{2,5}){1,2}$/,
		firstName: /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
		lastName: /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
		city: /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/,
	};

	const fieldNames = {
		email: 'Email',
		resetEmail: 'Email',
		firstName: 'First Name',
		lastName: 'Last Name',
		city: 'City Name',
		birthDate: 'Date',
	};
             
	return (
		<>
			<div 
				className={
					` relative border-2 h-14 pl-3 pr-3 rounded-lg mb-4 centerRow
					${isFocused ? 'border-black centerColumn' : ''} 
					${isFilled ? 'border-black centerColumn': ''}`
				}>
				{(isFocused || isFilled) && <p className='w-full text-[12px] leading-[18px] text-[#757575]'>{placeholder}</p> }
				<input
					type={name === 'birthDate' ? 'date': 'text'}
					onFocus={() => setIsFocused(true)}
					{...register(name, {
						onBlur: () => {
							setIsFocused(false);
							getValues(name).length ? setIsFilled(true) : setIsFilled(false);
						},
						required: `${fieldNames[name]} is required`,
						validate: (e) => {
							if (!fieldRegexs[name]?.test(e) && name !== 'birthDate') {
								return `${fieldNames[name]} is not valid`;
							}
							else {
								const thisYear = new Date().getFullYear();
								let year = getValues('birthDate')?.split('-')[0];
								return year > thisYear ? 'Date is invalid, check the year': null;
							}
						},
					})}
					placeholder={!isFocused ? placeholder : null}      
					className='w-full appearance-none p focus:outline-none'
				/>
			</div>
			{
				<>
					<div className='pl-1 text-red-500 font-medium mb-6 p2Paragraph -mt-2'>
						<p>{errors[name]?.message}</p>
					</div>
				</>
			}
		</>
	);
};

export default InputFieldGlobal;