import {  useSetAtom } from 'jotai';
import React from 'react';
import { socialAuthButtonData } from '../../data';
import { navigatorAtom } from '../../pages/HomePage';

const SocialAuthButton = ({data, title}) => {
	const goto = useSetAtom(navigatorAtom);
	if(!data) {
		data = socialAuthButtonData;
	}
	return (
		data.map(item => (
			<a 
				name={item.id}
				href={item.url}
				key={item.id}
				onClick={(e) => {
			
					if(item.id === 'phone' ) goto(0);
					if(item.id === 'mail' ) goto(10);
					if(title === 'Sign In' && item.id === 'phone' ) goto(20);
					if(title === 'Sign In' && item.id === 'mail') goto(22);
				}}
				className=' relative w-full h-[2.8125rem] space-x-[3.75rem] rounded-lg mb-6 border border-stone-900 centerRow justify-center hover:scale-[1.01] hover:cursor-pointer active:scale-95 '>
				<div><item.Icon className='w-5 h-5' /></div>
				<div className='flex-[0.5] text-sm'>{item.data}</div>
			</a>
		))
	);
};

export default SocialAuthButton;