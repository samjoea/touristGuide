import { useSetAtom } from 'jotai';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { navigatorAtom } from '../../pages/HomePage';
import { GlobalButton } from '../buttons';
import { InputFieldGlobal } from '../inputFields';
import { ArrowLeft } from '../svgImports/SVG';
import GeneralModal from './GeneralModal';
import { useQuery } from '@tanstack/react-query';
import { initiatePasswordReset } from '../../utils/authApi';
import { toast } from 'react-toastify';

const ForgotPasswordModal = () => {
	const goto = useSetAtom(navigatorAtom);
	const { handleSubmit, getValues, formState: { isSubmitting } } = useFormContext();

	useQuery({
		queryKey: ['initiatePasswordReset'],
		queryFn: () => {
			const email = getValues('resetEmail');
			return initiatePasswordReset({ email });
		},
		retry: false,
		enabled: isSubmitting,
		onSuccess: async (data) => {
			if (data.status === 200) {
				toast.success('Check your mail to reset your password');
				goto(400);
			} else {
				toast.error(data.data.message);
			}
		}
	});

	return (
		<GeneralModal Icon={ArrowLeft} title='Forgot password?'>
			<form onSubmit={handleSubmit(data => {
			})}>
				<div className='w-full'>
					<div className='mb-5'>
						<p className='p mb-2'>Enter the email address associated with your account, and we’ll email you a link to reset your password.</p>
					</div>
					<InputFieldGlobal name='resetEmail' placeholder='Email' />
				</div>
				<div className='pb-6'>
					<GlobalButton title='Send reset link' />
				</div>
			</form>
		</GeneralModal>
	);
};

export default ForgotPasswordModal;