import { useQuery, useQueryClient } from '@tanstack/react-query';
import { atom, useAtom, useSetAtom } from 'jotai';
import React, { useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { navigatorAtom } from '../../pages/HomePage';
import { uploadProfilePic } from '../../utils/authApi';
import { displayPicUpload } from '../../utils/helpers';
import { GlobalButton } from '../buttons';
import { InputFieldFile } from '../inputFields';
import { ArrowLeft, DeleteIcon, EditIcon, Profile, UploadPicIcon } from '../svgImports/SVG';
import GeneralModal from './GeneralModal';

export const profilePicAtom = atom(null);

const ProfilePicModal = () => {
	const queryClient = useQueryClient();
	const [, setImgTagRef] = useState(null);
	const [getImg, setGetImg] = useAtom(profilePicAtom);
	const [submit, setSubmit] = useState(false);
	const imgUrl = useRef(null);
	const newImgRef = useRef(null);
	const goto = useSetAtom(navigatorAtom);
	const { handleSubmit  } = useFormContext();
	
	imgUrl.current = displayPicUpload(getImg);
	
	
	const handleFileChange = (e) => {
		setGetImg(e.target.files[0]);
	};

	const {isFetching} = useQuery({
		queryKey: ['uploadPic'],
		queryFn: () => {
			const { data: { data }} = queryClient.getQueryData(['createProfile']);
			let profileData = new FormData();
			profileData.append('profilePic', getImg);
			return uploadProfilePic(profileData, data.accessToken);
		},
		retry: false,
		enabled: submit,
		onSuccess: (data) => {
			goto(400);
			window.location.href = import.meta.env.VITE_APP_APP_DOMAIN;
		}
	});
	

	return (
		<GeneralModal Icon={ArrowLeft} title='Create your profile'>
			<form onSubmit={handleSubmit(data => {
				setSubmit(getImg !== null);
			})}>
				<div className='-mt-1 mb-6 px-11'>
					{/* Two dots  */}
					<div className='w-full space-x-6 center'>
						<span className={`w-6 h-6 rounded-full ${!imgUrl.current ? 'bg-primaryTeal': 'border border-black'}`}></span>
						<span className={`w-6 h-6  rounded-full ${imgUrl.current ? 'bg-primaryTeal': 'border border-black'}`}></span>
					</div>
					<p className='h1 text-center my-2'>
						{
							imgUrl.current ? 'Looking good!' : 'Add a profile photo'
						}
					</p>
					<p className=' text-center text-[16px] leading-[18px]'>
						{
							imgUrl.current ? 'This photo will be added to your profile. '
								: 'Pick an image that shows your face.'
						}
					</p>
				</div>

				<div className='w-full center mb-20'>
					<div className='h-[11.625rem] w-[11.626rem] center rounded-full overflow-hidden bg-cover relative'>
						<input
							ref={newImgRef}
							onChange={handleFileChange}
							type='file' name='profilePic'
							accept='image/*'
							className='z-50 w-full h-full opacity-0 text-center appearance-none border file:border-none file:bg-white btn-effect'
						/>
						<div onClick={() => newImgRef.current.click()} className='h-full w-1/2 left-0 rounded-tl-full btn-effect center hover:bg-slate-500 hover:bg-opacity-20 rounded-bl-full absolute'>
							<EditIcon className=' text-black effect z-50 p-3 opacity-0 hover:opacity-100' />
						</div>
						{
							imgUrl.current ? <img src={imgUrl?.current} alt='profile' className='rounded-full h-[11.625rem] w-[11.626rem]' /> :
								<Profile className=' h-[9.063rem] w-[9.563rem]' />
						}
						<div onClick={() => {
							imgUrl.current = null;
							setGetImg(null);
						}} className='h-full w-1/2 right-0 rounded-tr-full btn-effect center hover:bg-slate-500 hover:bg-opacity-20 rounded-br-full absolute'>
							<DeleteIcon  className='btn-effect opacity-0 p-3 hover:opacity-100' />
						</div>
					</div>
				</div>
				<div className='mb-4'>
					{
						imgUrl.current ?
							<GlobalButton title={isFetching ? 'Loading...':'Done'} /> :
							<>
								<InputFieldFile Icon={UploadPicIcon} title='Upload image' setRef={setImgTagRef} />
								<div className='p2Paragraph_1 w-full center'>
									<p className='btn-effect rounded-lg hover:p-3 hover:-my-3 hover:bg-[#D4D4D473]'>I will do that later</p>
								</div>
						
							</>
					}
				</div>
			</form>
		</GeneralModal>
	);
};

export default ProfilePicModal;