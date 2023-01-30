import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { toast } from 'react-toastify';
import { navigatorAtom } from '../../pages/HomePage';
import { verifyOtp } from '../../utils/authApi';
import { GlobalButton } from '../buttons';
import { OtpInputField } from '../inputFields';
import { ArrowLeft } from '../svgImports/SVG';
import GeneralModal from './GeneralModal';

const OtpModal = ({title}) => {
	const goto = useSetAtom(navigatorAtom);
	const queryClient = useQueryClient();
	const { handleSubmit, getValues, formState: {isSubmitting, isValid, errors} } = useFormContext();

	useQuery({
		queryKey: ['otpToken'],
		queryFn: () => {
			const { data: {otpToken} } = queryClient.getQueryData(['otpData']);
			const otp = getValues('otp').join('');
			if (title === 'otp mail') {
				const { data: { data } } = queryClient.getQueryData(['createProfile']);
				return verifyOtp({otpToken, otp, userToken: data.accessToken});
			}
			return verifyOtp({otpToken, otp});
		},
		retry: false,
		enabled: isSubmitting && isValid,
		onSuccess: (data) => {
			switch (data.status) {
			case 200:
				toast.success('Phone number verified successfully');
				gotoModal(title);
				break;
			case 401:
				toast.error(data.data.message);
				break;
			default:
				toast.error(data.data.message);
				break;
			}
		},
	});

	const gotoModal = (t) => {
		if(t === 'otp phone') {
			goto(3);
		}
		else if(t === 'otp mail') {
			goto(15);
		}
		else if(t === 'otp signIn') {
			goto(24);
		}
	};

	return (
		<GeneralModal
			bodyStyle='bg-white pt-6 h-auto rounded-b-lg block' 
			Icon={ArrowLeft} title='Confirm your number'>
			<form onSubmit={handleSubmit( data => {}, error => {
				toast.error(errors['otp'][0]?.message);
			})}>
				<div className='h2 -mt-1 mb-6 mx-7'>
					<p>Enter the code we sent over SMS to {`${getValues('country_code')}${getValues('phone')}`} </p>
				</div>
				<OtpInputField />
				<div className='border-t-2 py-7 pl-9 pr-14 centerRow justify-between'>
					<div onClick={() => goto(2)} className='p2Paragraph_1 underline hover:cursor-pointer active:scale-95'>
						<p>More Options</p>
					</div>
					<GlobalButton 
						title='Continue'
						customize='relative w-[7.625rem] h-12 rounded-lg bg-primaryTeal center hover:bg-opacity-90 hover:cursor-pointer active:scale-95 '
					/>
				</div>
			</form>
		</GeneralModal>
	);
};

export default OtpModal;