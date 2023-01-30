import { useQuery } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { toast } from 'react-toastify';
import { navigatorAtom } from '../../pages/HomePage';
import { resetPassword } from '../../utils/authApi';
import { GlobalButton } from '../buttons';
import { InputFieldPassword } from '../inputFields';
import { Close } from '../svgImports/SVG';
import GeneralModal from './GeneralModal';

const ResetPassword = ({ id }) => {
	const {
		handleSubmit,
		getValues,
		formState: { isValid }
	} = useFormContext();
	const goto = useSetAtom(navigatorAtom);
	const [submit, setSubmit] = useState(false);
	useQuery({
		queryKey: ['resetPassword'],
		queryFn: () => {
			const password1 = getValues('password1');
			const password2 = getValues('password2');
			return resetPassword({ password1, password2, token: id });
		},
		retry: false,
		enabled: submit,
		onSuccess: (data) => {
			if (data.status === 200) {
				toast.success('Reset was successful');
				goto(400);
			} else {
				toast.error(data.data.message);
			}
		}
	});
	return (
		<GeneralModal Icon={Close} title='Forgot password?'>
			<form
				onSubmit={handleSubmit((data) => {
					setSubmit(isValid);
				})}
			>
				<div className='w-full'>
					<div className='mb-5'>
						<p className='p mb-2'>
									Must include at least one symbol or number and must have at least 8
									characters
						</p>
					</div>
					<InputFieldPassword name='password1' />
					<InputFieldPassword
						placeholder='Re-enter your password'
						name='password2'
					/>
				</div>
				<div className='pb-5 mt-4'>
					<GlobalButton title='Update' />
				</div>
			</form>
		</GeneralModal>
	);
};
export default ResetPassword;