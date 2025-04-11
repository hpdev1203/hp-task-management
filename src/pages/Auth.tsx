import React, { useState } from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'; // Import GoogleAuthProvider and signInWithPopup
import { auth } from '../firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';

const Auth: React.FC = () => {
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false); // Add loading state
    const navigate = useNavigate();

    const handleGoogleSignIn = async () => {
        setError(null);
        setIsLoading(true);
        const provider = new GoogleAuthProvider(); // Create a GoogleAuthProvider instance

        try {
            const result = await signInWithPopup(auth, provider);
            // This gives you a Google Access Token. You can use it to access the Google API.
            // const credential = GoogleAuthProvider.credentialFromResult(result);
            // const token = credential?.accessToken;
            // The signed-in user info.
            const user = result.user;
            console.log('User signed in with Google successfully:', user);
            navigate('/'); // Redirect to dashboard after sign in
        } catch (error: any) {
            console.error('Error signing in with Google:', error);
            // Handle specific errors
            let friendlyError = 'Failed to sign in with Google. Please try again.';
            if (error.code === 'auth/popup-closed-by-user') {
                friendlyError = 'Sign-in process cancelled.';
            } else if (error.code === 'auth/account-exists-with-different-credential') {
                friendlyError = 'An account already exists with the same email address but different sign-in credentials. Try signing in using the original method.';
            }
            setError(friendlyError);
        } finally {
            setIsLoading(false); // Stop loading
        }
    };

    return (
        <div className="flex justify-center items-center w-full h-screen flex-col gap-4 bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm text-center">
                <h1 className='text-2xl font-bold mb-6'>Sign In</h1>
                {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">{error}</div>}

                <button
                    onClick={handleGoogleSignIn}
                    disabled={isLoading} // Disable button while loading
                    className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out w-full flex items-center justify-center ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {isLoading ? (
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    ) : (
                       // Optional: Add Google Icon here 
                       <span>Sign in with Google</span>
                    )}
                </button>
            </div>
        </div>
    );
};

export default Auth;
