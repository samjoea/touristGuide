import { useQuery } from '@tanstack/react-query';
import { useAtomValue, useSetAtom } from 'jotai';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { gobackAtom, navigatorAtom } from '../../pages/HomePage';
import { sendOtp } from '../../utils/authApi';
import { GlobalButton } from '../buttons';
import { ArrowLeft, CallIcon, SmsIcon } from '../svgImports/SVG';
import GeneralModal from './GeneralModal';


const MoreOptionsModal = () => {
	const goBack = useAtomValue(gobackAtom);
	const goto = useSetAtom(navigatorAtom);
	const { handleSubmit, getValues, register, formState: {isSubmitting}} = useFormContext();

	useQuery({
		queryKey: ['otpData'],
		queryFn: () => sendOtp({phone: `${getValues('country_code')}${getValues('phone')}`}),
		retry: false,
		enabled: getValues('otpResend') === 'sms' && isSubmitting,
		onSuccess: () => {},
	});

	return (
		<GeneralModal Icon={ArrowLeft} title='Create your profile'>
			<form onSubmit={handleSubmit(data => {
				goto(goBack);
			})}>
				<div className='w-full'>
					<div className='mb-5'>
						<p className='p mb-2'>Choose among the options below to verify your contact</p>
						<p className='mb-5 text-[12px] leading-[18px] text-[#505050]'>Make sure to turn on your notifications</p>
					</div>
					<div>

						{/* radio one  */}
						<div className='centerRow border-b-2 pb-4 mb-7'>
							<div className='mr-[1.125rem]'><SmsIcon /></div>
							<div className='flex-1'>
								<p className='p2Paragraph_1'>Text message (SMS)</p>
								<p className='text-[14px] leading-5'>We will text you a code.</p>
							</div>
							<div className=''>
								<input type='radio'
									id='sms'
									name='option'
									value='sms'
									{...register('otpResend')}
									className='radio-btn appearance-none h-6 w-6 border-2 border-black rounded-full cursor-pointer checked:border-[7px]  ' />
							</div>
						</div>

						{/* radio two  */}
						<div className='centerRow border-b-2 pb-4 mb-7'>
							<div className='mr-[1.125rem]'><CallIcon /></div>
							<div className='flex-1'>
								<p className='p2Paragraph_1'>Phone call</p>
								<p className='text-[14px] leading-5'>We will call you with a code.</p>
							</div>
							<div className=''>
								<input type='radio'
									id='call'
									name='option'
									value='call'
									{...register('otpResend')}
									className='radio-btn appearance-none h-6 w-6 border-2 border-black rounded-full cursor-pointer checked:border-[7px] ' />
							</div>
						</div>
					</div>
				</div>
				<div className='pb-6'>
					<GlobalButton title='Continue' />
				</div>
			</form>
		</GeneralModal>
	);
};

export default MoreOptionsModal;