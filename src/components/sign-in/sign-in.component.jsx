import React from 'react';

import FormInput from '../form-input/form-input.component';

import './sign-in.styles.scss';

import CustomButton from '../../components/custom-button/custom-button.component';

import { signInWithGoogle } from '../../firebase/firebase.utils';

class SignIn extends React.Component {
    constructor(props){
        super(props);

        this.state = { email: '', password: '' };
    }

    submitEventHandler = event => {
        event.preventDefault();
        this.setState({ email: '', password: '' });
    }

    inputChangeEventHandler = event => {
        const { name , value } = event.target;
        this.setState({ [name]: value });
    }

    render(){
        return <div className="sign-in">
            <h2 class="title">I already have an account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={this.submitEventHandler}>
                <FormInput name="email"
                           label="Email"
                           type="email"
                           value={this.state.email}
                           onChange={this.inputChangeEventHandler}
                           required />
                <FormInput name="password"
                           label="Password"
                           type="password"
                           value={this.state.password}
                           onChange={this.inputChangeEventHandler}
                           required />
                <CustomButton type="submit"> Sign In </CustomButton>
                <CustomButton type="button" onClick={signInWithGoogle}> Sign In with Google </CustomButton>
            </form>
        </div>;
    }
}

export default SignIn;