import React from 'react';

const GlobalButton = ({ title, customize, ...props}) => {
	return (
		<button type='submit' {...props}  className={customize || ' relative w-full h-12 rounded-lg bg-primaryTeal center hover:bg-opacity-90 hover:cursor-pointer active:scale-95 '}>
			<span className='text-white p2Paragraph_1'>{title}</span>
		</button>
	);
};

export default GlobalButton;