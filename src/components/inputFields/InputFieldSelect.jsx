import React from 'react';
import { useFormContext } from 'react-hook-form';
import { ArrowDown } from '../svgImports';

const InputFieldSelect = ({data, name}) => {

	const { register, formState: {errors}} = useFormContext();
	return (
		<>
			<div className={`mb-4 relative border-2 pl-3 h-14 rounded-lg ${'border-black'}`}>
				<p className='p2Paragraph'>{name}</p>
				<select
					className='appearance-none bg-white p w-full h-7 centerRow outline-none rounded-lg hover:cursor-pointer'
					{...register(name, {
						required: 'Select a gender',
						validate: (e) => {
							if(e === 'Select Gender') {
								return 'Please select a gender';
							}
						},
					})}
				>
					<option>Select Gender</option>
					{data.map(item => (
						<option key={item.id} value={item.gender} className=' appearance-none p hover:bg-primaryTeal'>
							{`${item.gender}`}
						</option>
					))} 
				</select>
				<div
					className='absolute top-1/2 right-0 mr-4 rounded-full cursor-pointer'
				>
					<ArrowDown  className='h2' />
				</div>

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

export default InputFieldSelect;