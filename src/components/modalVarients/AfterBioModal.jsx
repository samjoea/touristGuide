import { useSetAtom } from 'jotai';
import React from 'react';
import { navigatorAtom } from '../../pages/HomePage';
import { GlobalButton } from '../buttons';
import { ArrowLeft } from '../svgImports/SVG';
import GeneralModal from './GeneralModal';

const AfterBioModal = () => {
	const goto = useSetAtom(navigatorAtom);
	return (
		<GeneralModal Icon={ArrowLeft} title='Create your profile'>
			<form onSubmit={(e) => {
				e.preventDefault();
				goto(32);
			}}>
				<div className='w-[4.125rem] h-[4.125rem] bg-[#D9D9D9] mx-auto'></div>
				<div className='-mt-1 mb-6 px-11'>
					<p className='h1 text-center my-2'>Welcome to TouristSite</p>
					<p className=' text-center text-[16px] leading-[18px]'>Discover places, compare prices, and make the best 
	choice on where to stay on your next vacation.</p>
				</div>
				<div className='pb-6'>
					<GlobalButton title='Continue' />
				</div>
			</form>
		</GeneralModal>
	);
};

export default AfterBioModal;