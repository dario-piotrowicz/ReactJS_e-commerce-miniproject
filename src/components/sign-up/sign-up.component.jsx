import React, { useState } from 'react';
import './sign-up.styles.scss'
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { signUp } from '../../redux/user/user.actions';
import { useDispatch } from 'react-redux';
import { toastAutoCloseMillis } from '../../common/constants';

const SignUp = () => {

    const [
        userCredentials,
        setUserCredentials
    ] = useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const dispatch = useDispatch();
    const dispatchSignUp = signUpData => dispatch(signUp(signUpData));

    const { displayName,
            email,
            password,
            confirmPassword
    } = userCredentials;

    let submissionEnabled = true;

    const submitEventHandler = async event => {
        event.preventDefault();
        if( submissionEnabled ){
            dispatchSignUp(userCredentials);
            submissionEnabled = false;
            setTimeout(
                () => { submissionEnabled = true },
                toastAutoCloseMillis
            );
        }
    };

    const inputChangeEventHandler = event => {
        const { name , value } = event.target;
        setUserCredentials({ ...userCredentials, [name]: value });
    };

    return <div className="sign-up">
            <h2 className="title">I do not have an account</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={submitEventHandler}>
                <FormInput type="text"
                           name="displayName"
                           value={displayName}
                           onChange={inputChangeEventHandler}
                           label="Display Name"
                           required />
                <FormInput type="email"
                           name="email"
                           value={email}
                           onChange={inputChangeEventHandler}
                           label="Email"
                           required />
                <FormInput type="password"
                           name="password"
                           value={password}
                           onChange={inputChangeEventHandler}
                           label="Password"
                           required />
                <FormInput type="password"
                           name="confirmPassword"
                           value={confirmPassword}
                           onChange={inputChangeEventHandler}
                           label="Confirm Password"
                           required />
                <CustomButton type="submit">Sign Up</CustomButton>
            </form>
        </div>;
};

export default SignUp;