import React from 'react';
import './sign-in.styles.scss';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import { auth, signInWithGoogle } from '../../firebase/firebase.utils';

class SignIn extends React.Component {
    constructor(props){
        super(props);

        this.state = { email: '', password: '' };
    }

    submitEventHandler = async event => {
        event.preventDefault();
        const { email, password } = this.state;
        try {
            await auth.signInWithEmailAndPassword(email, password);
            this.setState({ email: '', password: '' });
        } catch(error) {
            console.error(error);
            if(error.code === 'auth/user-not-found') alert('Error, invalid user');
            if(error.code === 'auth/wrong-password') alert('Error, invalid password');
        }
    }

    inputChangeEventHandler = event => {
        const { name , value } = event.target;
        this.setState({ [name]: value });
    }

    render(){
        return <div className="sign-in">
            <h2 className="title">I already have an account</h2>
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
                <div className="buttons-container">
                    <CustomButton type="submit"> Sign In </CustomButton>
                    <CustomButton type="button" onClick={signInWithGoogle} isGoogleSignIn> Sign In with Google </CustomButton>
                </div>
            </form>
        </div>;
    }
}

export default SignIn;