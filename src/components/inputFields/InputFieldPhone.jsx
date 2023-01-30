import { useAtom, useAtomValue } from 'jotai';
import React, { useEffect,  useState, useRef } from 'react';
import useGetCountry from '../../hooks/useGetCountry';
import { ArrowDown } from '../svgImports';
import { countryCodeState, countryState } from './InputFieldsContext';
import { useFormContext } from 'react-hook-form';

const InputFieldPhone = () => {
	return (
		<>
			<SelectCountry />
			<PhoneField />
		</>
	);
};

const SelectCountry = () => {
	const defaultCountry = useGetCountry();
	const countryCodes = useAtomValue(countryCodeState);
	const [countryCode, setCountryCode] = useAtom(countryState);
	const { register, getValues } = useFormContext();
	const openSelect = useRef();

	useEffect(() => {
		if (defaultCountry && !countryCode)
			setCountryCode(
				defaultCountry.split(')')
					.join('')
					.split('(')[1]
			);
	},[defaultCountry, countryCode, setCountryCode]);

	return (
		<div className={` mb-4 relative border-2 pl-3 h-14 rounded-lg ${countryCode ? 'border-black': 'null'}`}>
			<p className='p2Paragraph'>Country/Region</p>
			{defaultCountry  ?
				<select
					onMouseEnter={(e) => {
						openSelect.current = e.target;
					}}
					title='Country Codes'
					className='z-50 bg-transparent appearance-none bg-white p w-full h-7 centerRow outline-none rounded-lg hover:cursor-pointer'
					{...register('country_code',{
						value: countryCode || defaultCountry.split(')').join('').split('(')[1],
						onChange: (e) => {
							setCountryCode(e.target.value);
						},
						validate: () => {
							return getValues('phone')?.length !== 0;
						},
					})}
				>
					{countryCodes.map(code => (
						<option key={code.flag} value={code?.dial_code} className=' appearance-none p hover:bg-primaryTeal'>
							{`${code.flag} ${code.name} (${code.dial_code})`}
						</option>
					))} 
				</select> : null}
			<div
				className='absolute -z-0 top-1/2 right-0 mr-4 rounded-full cursor-pointer'
			>
				<ArrowDown  className='h2' />
			</div>

		</div>
	);
};


const PhoneField = () => {
	const countryCode = useAtomValue(countryState);
	const [isFilled, setIsFilled] = useState(false);
	const [isFocused, setIsFocused] = useState(false);
	const { register, getValues, formState: {errors} } = useFormContext();

	return (
		<>
			<div className={`border-2 h-14 centerRow pl-3 rounded-lg mb-4 centerColumn 
			${isFilled ? 'border-black': ''} ${isFocused ? 'border-black' : ''}`}>
				{(isFocused || isFilled) && <p className='w-full p2Paragraph'>Phone number</p> }
				<div className='centerRow w-full'>
					<p className='pr-1'>{(isFocused || isFilled) ? countryCode : null}</p>
					<input
						maxLength={15}
						onFocus={() => setIsFocused(true)}
						type="tel" placeholder={!(isFocused || isFilled) ? 'Phone Number' : null}
						className='appearance-none w-full  p focus:outline-none'
						disabled={!countryCode && true}
						{...register('phone', {
							required: 'Phone number is required',
							onBlur: () => {
								setIsFocused(false);
								getValues('phone').length ? setIsFilled(true) : setIsFilled(false);
							},
							validate: (e, data) => {
								if(!/^\+?[0-9]\d{0,15}$/.test(e))
									return 'Phone number is invalid, digits only.';
								if(!data['phone'].length)
									return 'Phone number is required.';
							}
						})}
					/>
				</div>
				<div></div>
			</div>
			{
				<>
					<div className='pl-1 text-red-500 font-medium mb-6 p2Paragraph -mt-2'>
						<p>{errors['phone']?.message}</p>
					</div>
				</>
			}
		</>
	);
};

export default InputFieldPhone;