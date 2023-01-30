import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useRef } from 'react';
import { DropDown } from '../../components/dropDowns';
import { Language, Profile } from '../../components/svgImports';
import { profilePopup, profilePopup2 } from '../../data';
import { useOnHoverDropClose } from '../../hooks';
import { displayPicUpload } from '../../utils';
import { getProfilePic } from '../../utils/authApi';

const Header = ({children, update}) => {
	const ref = useRef();
	const imgRef = useRef();
	const { isOpen, setClicked, setIsOpen, setIsOverItem, setIsOverList } = useOnHoverDropClose(ref);
	const accessToken = localStorage.getItem('accessToken');
	
	useEffect(() => {
		if(update) {
			imgRef.current = displayPicUpload(update);
		}
	}, [update]);

	useQuery({
		queryKey: ['ProfilePic'],
		queryFn: () => {
			return getProfilePic(accessToken);
		},
		retry: false,
		enabled: accessToken ? true : false,
		onSuccess: (data) => {
			if(data.status === 200) {
				imgRef.current = data.data.data;
			}
		}
	});
	

	return (
		<div className='w-screen h-[10.75rem] bg-primaryTeal border-b-[1px] shadow-sm px-[11.4rem] pt-[3.625rem]'>
			<div className='h-full relative flex'>
				{children}
				{/* profile & languague */}
				<div className='absolute right-0 space-x-[1.875rem] centerRow'>
					<div className='w-[39px] h-[39px] rounded-full bg-white center'>
						<Language className='w-[23px] h-[21px]' />
					</div>
					<div
						id='profile'
						ref={ref}
						onClick={() => {
							setClicked(true);
							setIsOpen(e => !e);
						}}
						onMouseEnter={() => {
							setIsOverItem(true);
						}}
						onMouseLeave={() => {
							setIsOverItem(false);
						}}
						className={'w-[39px] h-[39px] rounded-full bg-white center relative'}>
						{
							imgRef.current ? <img src={imgRef?.current} alt='Profile pic' className='rounded-full w-[39px] h-[39px]' />
								:	<Profile className='w-[23px] h-[21px]' />
							
						}
					</div>
					{isOpen && <DropDown data={
						accessToken ? 
							profilePopup2 :
							profilePopup
					} settings={{ setIsOverList, setIsOpen }} />}
				</div>
			</div>
		</div>
	);
};

export default Header;