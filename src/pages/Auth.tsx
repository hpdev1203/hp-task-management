import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseConfig } from '../firebase/firebaseConfig';

const Auth: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            console.log('User signed up successfully');
        } catch (error) {
            console.error('Error signing up:', error);
        }
    };

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log('User signed in successfully');
        } catch (error) {
            console.error('Error signing in:', error);
        }
    };

    return (
        <div className="flex justify-center items-center border p-4 w-full h-full flex-col gap-4">
            <h1 className='text-2xl font-bold'>Authentication Page</h1>
            <form onSubmit={handleSignUp} className='flex flex-col gap-2'>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className='border p-2' />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className='border p-2' />
                <button type="submit" className='bg-blue-500 text-white p-2 rounded'>
                    Sign Up
                </button>
            </form>
             <form onSubmit={handleSignIn} className='flex flex-col gap-2'>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className='border p-2' />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className='border p-2' />
                 <button type="submit" className='bg-blue-500 text-white p-2 rounded'>
                    Sign In
                </button>
            </form>
        </div>
    );
};

export default Auth;