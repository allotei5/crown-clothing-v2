import { useState } from 'react';

import { createUserDocumentFromAuth, signInWithGooglePopup, signInAuthWithEmailAndPassword } from "../../utils/firebase/firebase.utils";

import FormInput from '../form-input/form-input.component';
import './sign-in-form.styles.scss';
import Button from '../button/button.component';

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

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
}

  const handleSubmit = async (event) => {
    event.preventDefault();


    try {
      const response = await signInAuthWithEmailAndPassword(email, password)
      console.log(response)
      resetFormFields();

    } catch (error) {
      switch (error.code) {
        case 'auth/wrong-password':
          alert('incorrect password')
          break;

        case 'auth/user-not-found':
          alert('no user associated with this email')
          break;

        default:
          console.log(error)
      }
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value })
  };

  return (
    <div className='sign-up-container'>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>

        <FormInput
          label="Email"
          name='email'
          type='email'
          required
          value={email}
          onChange={handleChange}
        />

        <FormInput
          label="Password"
          name='password'
          type='password'
          required
          value={password}
          onChange={handleChange}
        />
        <div className='buttons-container'>
          <Button type='submit'>Sign In</Button>
          <Button type='button' buttonType='google' onClick={signInWithGoogle}>Google Sign In</Button>
        </div>
        
      </form>
    </div>
  );
};

export default SignInForm;