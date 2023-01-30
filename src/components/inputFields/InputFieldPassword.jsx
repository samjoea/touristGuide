import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { passwordStrength, returnStrength } from '../../utils/helpers';
import { EyeIcon } from '../svgImports';


const InputFieldPassword = ({placeholder, name}) => {
	const [isFocused, setIsFocused] = useState(false);
	const [isFilled, setIsFilled] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [passStrength, setPassStrength] = useState(5);
	const { register, getValues, watch } = useFormContext();

	const pass = passwordStrength(watch(name || 'password'));

	return (
		<>
			<div 
				className={
					` relative border-2 h-14 pl-3 pr-3 rounded-lg mb-2 centerRow
					${isFocused ? 'border-black centerColumn' : ''} 
					${isFilled ? 'border-black centerColumn': ''}`
				}>
				{(isFocused || isFilled) && 
				<p className='text-[12px] w-full leading-[18px] text-[#757575]'>
					{placeholder ? placeholder : 'password'}
				</p>
				}
				<input
					name={name ? name : 'password'}
					onFocus={() => setIsFocused(true)}
					{...register(name ? name : 'password', {
						onBlur: () => {
							setIsFocused(false);
							getValues(name ? name : 'password').length ? setIsFilled(true) : setIsFilled(false);
						},
						onChange: (e) => {
							const pass = passwordStrength(e.target.value);
							const strength = pass.length;
							setPassStrength(strength);
						},
						required: {
							value: true,
							message: 'Password is required'
						},
						validate: () => {
							return pass.length === 0;
						}
					})}
					type={`${showPassword ? 'text' : 'password'}`}
					placeholder={!isFocused ? 'Password' : null}
					className='w-full appearance-none p focus:outline-none'
				/>
				<div className='absolute right-0 mr-3'>
					<EyeIcon onClick={() => setShowPassword(e => !e)} />
				</div>
			</div>

			{isFocused ? 
				<>
					<div className='mb-3 font-medium p2Paragraph pl-1'>
						{pass.map((item, i) => (
							<p className='text-red-500' key={i}>{item}</p>
						))}
					</div>
					<div className='w-full bg-gray-200 h-1 mb-5 pl-1'>
						<div className={`${returnStrength(passStrength)[1]} h-1 transition-all`} style={{width: `${returnStrength(passStrength)[0]}%`}}></div>
					</div>
				</> : null
			}
		</>
	);
};

export default InputFieldPassword;