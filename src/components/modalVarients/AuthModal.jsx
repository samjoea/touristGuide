import React from 'react';
import { GlobalButton, SocialAuthButton } from '../buttons';
import { InputFieldPhone } from '../inputFields';
import { Close } from '../svgImports/SVG';
import GeneralModal from './GeneralModal';
import { useFormContext } from 'react-hook-form';
import { useSetAtom } from 'jotai';
import { navigatorAtom } from '../../pages/HomePage';
import { sendOtp } from '../../utils/authApi';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const AuthModal = ({ title }) => {
	const goto = useSetAtom(navigatorAtom);
	const { handleSubmit, getValues, formState: { isSubmitting, isValid } } = useFormContext();

	useQuery({
		queryKey: ['otpData'],
		queryFn: () => sendOtp({phone: `${getValues('country_code')}${getValues('phone')}`}),
		retry: false,
		enabled: isSubmitting && isValid,
		onSuccess: (data) => {
			if (data.status === 400)
				toast.error(data.data.message);
			else if (data.data.otpToken) {
				toast.success(data.message);
				goto(1);
			}
		},
	});
		
	return (
		<GeneralModal Icon={Close} title={title} >
			<form onSubmit={handleSubmit(data => {}, error => {

			})}>
				<div className='h1 mb-[0.875rem]'>Welcome to TravelSite</div>
				<InputFieldPhone />
				<div className='mt-3 mb-[1.125rem] text-[12px] leading-[18px]'>
					<p>A confirmation code will be sent to you. By signing up, 
							you agree to our <span className='underline font-medium'>Privacy Policy</span>  &
					<span className='underline font-medium'> Terms of use</span>
					</p>
				</div>
				<GlobalButton title='Continue' />
				<Seperator />
				<SocialAuthButton title={isSubmitting ? 'Loading...' : title} />
			</form>
		</GeneralModal>

	);
};

export const Seperator = () => {
	return (
		<div className='my-6 centerRow'>
			<span className='border w-full'></span>
			<span className='mx-[30px] text-[#18181B] text-[12px] leading-[18px] font-light '>Or</span>
			<span className='border w-full'></span>
		</div>
	);
};

export default AuthModal;