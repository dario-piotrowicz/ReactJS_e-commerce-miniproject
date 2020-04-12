import React from 'react';
import './sign-up.styles.scss'
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { auth, firestoreUtils } from '../../firebase/firebase.utils';

class SignUp extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        };
    }

    submitEventHandler = async event => {
        event.preventDefault();

        const { displayName, email, password, confirmPassword } = this.state;

        if( password !== confirmPassword ){
            alert("Passwords Don't match");
            return;
        }

        try {
            const userCreationResponse = await auth.createUserWithEmailAndPassword(email,password);
            const userAuth = userCreationResponse.user;
            await firestoreUtils.createUserDoc(userAuth, {displayName});

            this.setState({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: ''
            });
        } catch(error) {
            console.error(error);
        }
    }

    inputChangeEventHandler = event => {
        const { name , value } = event.target;
        this.setState({ [name]: value });
    }

    render(){
        const { displayName, email, password, confirmPassword } = this.state;
        return <div className="sign-up">
            <h2 className="title">I do not have an account</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={this.submitEventHandler}>
                <FormInput type="text"
                           name="displayName"
                           value={displayName}
                           onChange={this.inputChangeEventHandler}
                           label="Display Name"
                           required />
                <FormInput type="email"
                           name="email"
                           value={email}
                           onChange={this.inputChangeEventHandler}
                           label="Email"
                           required />
                <FormInput type="password"
                           name="password"
                           value={password}
                           onChange={this.inputChangeEventHandler}
                           label="Password"
                           required />
                <FormInput type="password"
                           name="confirmPassword"
                           value={confirmPassword}
                           onChange={this.inputChangeEventHandler}
                           label="Confirm Password"
                           required />
                <CustomButton type="submit">Sign Up</CustomButton>
            </form>
        </div>;
    }
}

export default SignUp;