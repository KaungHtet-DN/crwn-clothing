import { useState } from "react";
import { signInWithGooglePopup, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import './sign-in-form.style.scss';
import Button from "../button/button.component";

const defaultFormFields = {
    email: '',
    password: '',
};

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!email || !password) return;

        try {
            const response = await signInAuthUserWithEmailAndPassword(email, password);
            console.log(response);
            resetFormFields();
        }
        catch (error) {

            switch (error.code) {
                case 'auth/invalid-credential':
                    alert('Email or password is invalid.');
                    break;
                case 'auth/user-not-found':
                    alert('No user found with this email.');
                    break;
                default:
                    console.log('Error in sign in user.', error)
            }
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({ ...formFields, [name]: value })
    }

    return (
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label='Email' type='email' onChange={handleChange} name="email" value={email} required></FormInput>
                <FormInput label='Password' type='password' onChange={handleChange} name="password" value={password} required></FormInput>
                <div className="buttons-container">
                    <Button type='submit'>Sign In</Button>
                    <Button type='button' onClick={signInGoogleUser} buttonType='google'>Google Sign In</Button>
                </div>

            </form>
        </div>
    );
}

export default SignInForm;