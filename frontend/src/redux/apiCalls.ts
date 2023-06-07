import { Dispatch } from 'redux';
import { loginFailure, loginStart, loginSuccess } from './userSlice';
import { publicRequest } from './publicRequest';

export const login = async (dispach: Dispatch, user: object): Promise<void> => {
    dispach(loginStart());

    try {
        const res = await publicRequest.post("auth/login", user);
        dispach(loginSuccess(res.data))

    } catch (error) {
        dispach(loginFailure());
    }
}