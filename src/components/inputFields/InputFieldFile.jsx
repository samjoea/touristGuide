import { useSetAtom } from 'jotai';
import React, { useRef } from 'react';
import { profilePicAtom } from '../modalVarients';

const InputFieldFile = ({ Icon, title, setRef }) => {
	const setImg = useSetAtom(profilePicAtom);
	const imgRef = useRef(null);


	return (
		<div className=' relative w-full h-[2.813rem] rounded-lg mb-6 border border-stone-900 centerRow justify-center btn-effect'>
			<input
				ref={imgRef}
				onChange={(e) => {
					setRef(imgRef.current);
					setImg(e.target.files[0]);
				}}
				type='file' name='profilePic'
				accept='image/*'
				className='z-50 w-full h-full opacity-0 text-center appearance-none border file:border-none file:bg-white btn-effect'
			/>
			{/* Upload button */}
			<div className='border rounded-lg absolute w-full h-full center space-x-16 btn-effect'>
				<div className='w-1/6 flex flex-row-reverse btn-effect'><Icon  /></div>
				<div className=' w-[52%] btn-effect'><p>{title}</p></div>
			</div>
		</div>
	);
};

export default InputFieldFile;