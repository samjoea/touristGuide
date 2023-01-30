import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import React from 'react';
import { gobackAtom, navigatorAtom } from '../../pages/HomePage';

export const closeModal = atom(false);

const GeneralModal = ({ Icon, title, children, bodyStyle}) => {
	const [showModal, setShowModal] = useAtom(closeModal);
	const goBack = useAtomValue(gobackAtom);
	const goto = useSetAtom(navigatorAtom);

	const handleModal = (e) => {
		const id = e.target.id;
		if (['close'].includes(id) || e.target.alt === 'close') {
			setShowModal(false);
		}
	};

	return (
		<>
			{showModal ? 
				<div
					id='backdrop'
					onClick={(e) => {
						handleModal(e);
					}}
					className='absolute h-full w-full bg-black bg-opacity-[0.3] backdrop-blur-[1px] inset-0 center'>
					<div  className='w-[35.5rem] min-h-[18.5rem] flex flex-col bg-transparent'>
						<div className='relative centerRow bg-white px-7 border-b-[2px] h-16 rounded-t-lg'>
							<div
								onClick={(e) => {
									handleModal(e);
								}}
								className=''>
								<Icon onClick={() => goBack >= 0 ? goto(goBack): null} className=' h2 rounded-full cursor-pointer active:scale-75 hover:scale-[1.3]' />
							</div>
							<div className=' flex-1 flex'>
								<p className='m-auto h2'>{title}</p>
							</div>
						</div>

						{/* Body */}
						<div className={bodyStyle || 'bg-white px-8 border pt-6 pb-4 h-auto rounded-b-lg block'}>
							{children}
						</div>
					</div>
				</div>
				: null
			}
		</>
	);
};

export default GeneralModal;