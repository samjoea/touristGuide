import { useSetAtom } from 'jotai';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { emailAuth } from '../../data';
import { navigatorAtom } from '../../pages/HomePage';
import { GlobalButton, SocialAuthButton } from '../buttons';
import { InputFieldGlobal, InputFieldPassword } from '../inputFields';
import { Close } from '../svgImports/SVG';
import { Seperator } from './AuthModal';
import GeneralModal from './GeneralModal';

const AuthWithEmail = ({title}) => {
	const goto = useSetAtom(navigatorAtom);
	const { handleSubmit, formState: {isValid} } = useFormContext();


	return (
		<GeneralModal Icon={Close} title={title} >
			<form onSubmit={handleSubmit(data => {
				if(isValid) {
					goto(11);
				}
				// reset({}, {keepIsValid: false});
			})}>
				<div className='h1 mb-[0.875rem]'>Welcome to TravelSite</div>
				<InputFieldGlobal name='email' placeholder='Email' />
				<InputFieldPassword placeholder='Password' />

				{
					title === 'Sign Up' ?
						<>
							<div className='mt-3 mb-[1.125rem] text-[12px] leading-[18px] '>
								<p>A confirmation code will be sent to you. By signing up, 
									you agree to our <span className='underline font-medium'>Privacy Policy</span>  & <span className='underline font-medium'>Terms of use</span>
								</p>
							</div>
							<GlobalButton title='Continue' />
							<Seperator />
							<SocialAuthButton data={emailAuth} title={title} />
						</>
						:
						<div className='mb-5'>
							<p onClick={() => {
								goto(23);
							}} className='forgotten btn-effect w-1/3 u mb-4'>Forgot password?</p>
							<GlobalButton title='Continue' />
						</div> 
				}

			</form>
		</GeneralModal>

	);
};

export default AuthWithEmail;