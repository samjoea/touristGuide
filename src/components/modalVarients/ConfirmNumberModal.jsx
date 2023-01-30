import { useQuery } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { navigatorAtom } from '../../pages/HomePage';
import { sendOtp } from '../../utils/authApi';
import { GlobalButton } from '../buttons';
import { InputFieldPhone } from '../inputFields';
import { ArrowLeft } from '../svgImports/SVG';
import GeneralModal from './GeneralModal';

const ConfirmNumberModal = ({title}) => {
	const goto = useSetAtom(navigatorAtom);
	const { handleSubmit, getValues, formState: { isSubmitting} } = useFormContext();
	useQuery({
		queryKey: ['otpData'],
		queryFn: () => sendOtp({phone: `${getValues('country_code')}${getValues('phone')}`}),
		retry: false,
		enabled: isSubmitting,
		onSuccess: () => {},
	});

	return (
		<GeneralModal Icon={ArrowLeft} title={title} >
			<form onSubmit={handleSubmit(data => {
				goto(13);
			})}>
				<div className='h1 mb-[0.875rem] center'>Confirm your number</div>
				<InputFieldPhone />
				<div className='mt-3 mb-[1.125rem] text-[12px] leading-[18px]'>
					<p>A confirmation code will be sent to you. By signing up, 
							you agree to our <span className='underline font-medium'>Privacy Policy</span>  & 
					<span className='underline font-medium'>Terms of use</span>
					</p>
				</div>
				<div className='mb-4'>
					<GlobalButton title='Continue' />
				</div>
			</form>
		</GeneralModal>

	);
};

export default ConfirmNumberModal;