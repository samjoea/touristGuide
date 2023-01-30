import React from 'react';
import profile from '../../assets/profileIcon.svg';
import lang from '../../assets/react.svg';
import close from '../../assets/closeIcon.svg';
import arrowDown from '../../assets/arrowDownIcon.svg';
import facebookIcon from '../../assets/facebookIcon.svg';
import googleIcon from '../../assets/googleIcon.svg';
import mailIcon from '../../assets/mailIcon.svg';
import arrowLeft from '../../assets/arrowLeftIcon.svg';
import uploadPic from '../../assets/uploadPic.svg';
import deleteIcon from '../../assets/deleteIcon.svg';
import editIcon from '../../assets/editIcon.svg';
import  callIcon from '../../assets/callIcon.svg';
import smsIcon from '../../assets/smsIcon.svg';
import eye from '../../assets/eye.svg';

export const Profile = (props, img) => {
	return <img src={profile} alt='profile' {...props} />;
};

export const Language = (props) => {
	return <img src={lang} alt='language' {...props} />;
};

export const Close = (props) => {
	return <img src={close} alt='close' {...props} />;
};

export const ArrowDown = (props) => {
	return <img src={arrowDown} alt='down' {...props} />;
};

export const FaceBook = (props) => {
	return <img src={facebookIcon} alt='facebook' {...props} />;
};

export const Google = (props) => {
	return <img src={googleIcon} alt='google' {...props} />;
};

export const Mail = (props) => {
	return <img src={mailIcon} alt='mail' {...props} />;
};

export const ArrowLeft = (props) => {
	return <img src={arrowLeft} alt='back' {...props} />;
};

export const UploadPicIcon = (props) => {
	return <img src={uploadPic} alt='uploadImage' {...props} />;
};

export const DeleteIcon = (props) => {
	return <img src={deleteIcon} alt='delete' {...props} />;
};

export const EditIcon = (props) => {
	return <img src={editIcon} alt='edit' {...props} />;
};

export const SmsIcon = (props) => {
	return <img src={smsIcon} alt='sms' {...props} />;
};
export const CallIcon = (props) => {
	return <img src={callIcon} alt='call' {...props} />;
};
export const EyeIcon = (props) => {
	return <img src={eye} alt='show password' {...props} />;
};




