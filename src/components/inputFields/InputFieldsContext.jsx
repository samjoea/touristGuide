import { countryCodes } from '../../data';
import { atom } from 'jotai';


export const countryCodeState = atom(countryCodes);
export const isFocusedState = atom(false);
export const countryState = atom(null);
