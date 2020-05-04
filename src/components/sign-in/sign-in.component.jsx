import React from 'react';
import './sign-in.styles.scss';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import { connect } from 'react-redux';
import { signIn } from '../../redux/user/user.actions';

class SignIn extends React.Component {
    state = { email: '', password: '' };

    submitEventHandler = async event => {
        event.preventDefault();
        const { signIn } = this.props;
        const { email, password } = this.state;
        signIn({ withEmailAndPassword: { email, password } });
        this.setState({ email: '', password: '' });
    }

    inputChangeEventHandler = event => {
        const { name , value } = event.target;
        this.setState({ [name]: value });
    }

    render(){
        const { signIn } = this.props;
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
                    <CustomButton type="submit">
                        Sign In
                    </CustomButton>
                    <CustomButton type="button"
                                  isGoogleSignIn
                                  onClick={() => signIn({ withGoogle: true })}>
                        Sign In with Google
                    </CustomButton>
                </div>
            </form>
        </div>;
    }
}

const mapDispatchToProps = dispatch => ({
    signIn: signInOptions => dispatch(signIn(signInOptions))
});

export default connect(null,mapDispatchToProps)(SignIn);