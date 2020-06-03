import React, { useState } from 'react';
import './sign-in.styles.scss';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import { useDispatch } from 'react-redux';
import { signIn } from '../../redux/user/user.actions';

const SignIn = () => {

    const [
            userCredentials,
            setUserCrendentials
    ] = useState({ email: '', password: '' });

    const { email, password } = userCredentials;

    const dispatch = useDispatch();
    const dispatchSignIn = signInOptions => dispatch(signIn(signInOptions));

    const submitEventHandler = async event => {
        event.preventDefault();
        dispatchSignIn({ withEmailAndPassword: { email, password } });
        setUserCrendentials({ email: '', password: '' });
    }

    const inputChangeEventHandler = event => {
        const { name , value } = event.target;
        setUserCrendentials({...userCredentials, [name]: value });
    }


    return <div className="sign-in">
        <h2 className="title">I already have an account</h2>
        <span>Sign in with your email and password</span>
        <form onSubmit={submitEventHandler}>
            <FormInput name="email"
                        label="Email"
                        type="email"
                        value={email}
                        onChange={inputChangeEventHandler}
                        required />
            <FormInput name="password"
                        label="Password"
                        type="password"
                        value={password}
                        onChange={inputChangeEventHandler}
                        required />
            <div className="buttons-container">
                <CustomButton type="submit">
                    Sign In
                </CustomButton>
                <CustomButton type="button"
                                isGoogleSignIn
                                onClick={() => dispatchSignIn({ withGoogle: true })}>
                    Sign In with Google
                </CustomButton>
            </div>
        </form>
    </div>;
};

export default SignIn;