import { useQuery } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { toast } from 'react-toastify';
import { navigatorAtom } from '../../pages/HomePage';
import { createProfile } from '../../utils/authApi';
import { generateObjFromArray } from '../../utils/helpers';
import { GlobalButton } from '../buttons';
import { InputFieldGlobal, InputFieldSelect } from '../inputFields';
import { ArrowLeft } from '../svgImports/SVG';
import GeneralModal from './GeneralModal';

const BioModal = ({title, accessToken}) => {
	const [submit, setSubmit] = useState(false);
	const goto = useSetAtom(navigatorAtom);
	const { handleSubmit, getValues, formState: { isValid }} = useFormContext();

	const { isloading } = useQuery({
		queryKey: ['createProfile'],
		queryFn: () => {
			const userInfoKeys = ['password','phone', 'country_code','firstName', 'lastName', 'email', 'gender', 'city', 'birthDate'];
			const userInfo = getValues([...userInfoKeys]);
			const userInfoObj = generateObjFromArray(userInfo, userInfoKeys);
			const phone = `${userInfoObj['country_code']}${userInfoObj['phone']}`;
			const type = {
				'bio phone': 'phone',
				'bio mail': 'email',
				'bio social': 'social'
			};
			const userData = {
				'bio phone': {phone},
				'bio mail': {email: userInfoObj['email'], password: userInfoObj['password']},
				'bio social': {accessToken},
			};
			return createProfile({
				profileData: {...userInfoObj, type: type[title]},
				userData: userData[title]
			});
		},
		retry: false,
		enabled: submit,
		onSuccess: (data) => {
			switch (data.status) {
			case 201:
				toast.success('Profile created successfully');
				localStorage.setItem('accessToken', data.data.data.accessToken);
				if(title === 'bio mail') {
					goto(12);
				}
				else if (title === 'bio phone') {
					goto(4);
				}
				else if (title === 'bio social') {
					goto(31);
				}
				break;
			case 200:
				toast.info(data.data.message);
				break;
			default:
				toast.error(data.data.message);
				break;
			}

		}
	});

	return (
		<GeneralModal Icon={ArrowLeft} title='Finish signing up' >
			<form onSubmit={handleSubmit(data => {
				setSubmit(isValid);
			})}>
				<InputFieldGlobal name='firstName' placeholder='First name' />
				<InputFieldGlobal name='lastName' placeholder='Last name' />
				<InputFieldGlobal name='birthDate' placeholder='Birthdate' />
				<InputFieldSelect name='gender' data={[{id: 'm', gender: 'Male'}, {id: 'f', gender: 'Female'}, {id: 'o', gender: 'Other'}]}/>
				<InputFieldGlobal name='email' placeholder='Email' />
				<p className='text-[12px] leading-[18px] text-[#505050] mb-4 -mt-5'>You will recieve and Email to confirm you account</p>
				<InputFieldGlobal name='city' placeholder='City of residence ...eg Vienna, Austria or Accra, Ghana' />
				<p className='text-[12px] leading-[18px] mb-7'>
					By selecting 
					<span className='font-semibold cursor-pointer'> Agree and continue</span>, I agree to TravelSite’s
					<span className='u cursor-pointer'> Privacy Policy</span> &
					<span className='u cursor-pointer'> Terms of use</span>.
				</p>
				<div className='mb-6'>
					<GlobalButton title={isloading ? 'Loading...':'Agree and continue'} />
				</div>

			</form>
		</GeneralModal>
	);
};

export default BioModal;