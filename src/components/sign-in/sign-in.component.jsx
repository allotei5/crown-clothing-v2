import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";
import { createUserDocumentFromAuth, signInWithGooglePopup } from "../../utils/firebase/firebase.utils";

import SignUpForm from "../sign-up-form/sign-up-form.component";

const SignIn = () => {


    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    }
    
    return (
        <div>
            Sign In
            <button onClick={logGoogleUser}>Sign in with Google</button>
            <SignUpForm />
        </div>
    )
}

export default SignIn;