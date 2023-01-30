import { atom, useAtomValue, useSetAtom } from 'jotai';
import React, { useEffect } from 'react';
import { Header } from '../layouts/header';
import { AfterBioModal, AuthModal, AuthWithEmail, BioModal, ConfirmNumberModal, ForgotPasswordModal, MoreOptionsModal, OtpModal, profilePicAtom, ProfilePicModal, ResetPassword } from '../components/modalVarients';
import { popUpRoute } from '../routes/popUpRoutes';
import { FormProvider, useForm } from 'react-hook-form';
import { closeModal } from '../components/modalVarients/GeneralModal';
import { useLocation } from 'react-router-dom';

export const navigatorAtom = atom(400);
export const currentModal = atom((get) => get(navigatorAtom));
export const gobackAtom = atom((get) => get(currentModal) - 1);
export const popUpNavigator = atom(popUpRoute);
export const formDataAtom = atom({
	phone: '',
	country_code: '',
});

const HomePage = () => {
	const navigation = useAtomValue(navigatorAtom);
	const setModalState = useSetAtom(closeModal);
	const opento = useSetAtom(navigatorAtom);
	const getImg = useAtomValue(profilePicAtom);


	//take params from the url
	const search = new URLSearchParams(useLocation().search);
	const id = search.get('id');
	const action = search.get('action');
	const accessToken = search.get('token');
	const methods = useForm();
	
	const signUpWithPhone = {
		0: <AuthModal title='Sign Up' />,
		1: <OtpModal title='otp phone' />,
		2: <MoreOptionsModal />,
		3: <BioModal title='bio phone' />,
		4: <AfterBioModal />,
		5: <ProfilePicModal title='profilePic phone' />,
	};
	
	const signUpWithMail = {
		9: <AuthModal />,
		10: <AuthWithEmail title='Sign Up'  />,
		11: <BioModal title='bio mail' />,
		12: <ConfirmNumberModal title='Create your profile' />,
		13: <OtpModal title='otp mail' />,
		14: <MoreOptionsModal />,
		15: <ProfilePicModal title='profilePic mail' />,
	};
	
	const signInWithPhone = {
		20: <AuthModal title='Sign In' />,
		21: <OtpModal  title='otp signIn' />,
		22: <AuthWithEmail title='Sign In' />,
		23: <ForgotPasswordModal />,
		24: <MoreOptionsModal />,
		25: <ResetPassword id={id} />
	};
	const socialAuth = {
		30: <BioModal title='bio social' accessToken={accessToken} />,
		31: <AfterBioModal />,
		32: <ProfilePicModal />
	};

	useEffect(() => {
		if (action === 'reset') {
			setModalState(true);
			opento(25);
		} else if (action === 'access') {
			setModalState(true);
			opento(30);
		}
	}, [action, accessToken, opento, setModalState]);

	return (
		<div className='relative h-screen w-screen'>
			<Header update={getImg}>
			</Header>
			<FormProvider {...methods}>
				{navigation < 10 ? 
					signUpWithPhone[navigation] :
					signUpWithMail[navigation]
				}
				{
					(navigation > 19 && navigation < 30) ?
						signInWithPhone[navigation] : socialAuth[navigation]
				}
			</FormProvider>
		</div>
	);
};

export default HomePage;