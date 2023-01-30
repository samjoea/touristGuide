import { useAtomValue, useSetAtom } from 'jotai';
import React from 'react';
import { toast } from 'react-toastify';
import { navigatorAtom, popUpNavigator } from '../../pages/HomePage';
import { closeModal } from '../modalVarients/GeneralModal';

const DropDown = ({ className, data, settings }) => {
	const { setIsOverList, setIsOpen } = settings;
	const showModal = useSetAtom(closeModal);
	const openTo = useAtomValue(popUpNavigator);
	const showPopup = useSetAtom(navigatorAtom);

	return (
		<div
			onMouseEnter={() => setIsOverList(true)}
			onMouseLeave={() => setIsOverList(false)}
			className={`${className ? className : 'border card absolute top-[2.3rem] pt-5'}`}>
			{/* Up */}
			<div className='h-[87px] space-y-3 p2Paragraph_1'>
				{data[0]?.data.map(item => (
					<p
						onClick={() => {
							setIsOpen(false);
							setIsOverList(false);
							showModal(true);
							showPopup(openTo[item]);
						}}
						className='pl-9 py-[9px] font-light hover:bg-[#D9D9D9CC] hover:p2Paragraph_1 cursor-pointer' key={item}>{item}</p>
				))}
			</div>
			{/* Divider */}
			<div className='border w-full absolute inset-x-0 top-[7.688rem]'></div>
			{/* Down */}
			<div className='mt-6 mb-5 space-y-3 p2Paragraph_1'>
				{data[1]?.data.map(item => (
					<p
						onClick={() => {
							setIsOpen(false);
							setIsOverList(false);
							if(item === 'Log out') {
								localStorage.clear();
								window.location.href = import.meta.env.VITE_APP_APP_DOMAIN;
								toast.success('Log out successfully');
							}
						}}
						className='pl-9 py-[9px] font-light hover:bg-[#D9D9D9CC] hover:p2Paragraph_1 cursor-pointer' key={item}>{item}</p>
				))}
			</div>
		</div>
	);
};

export default DropDown;