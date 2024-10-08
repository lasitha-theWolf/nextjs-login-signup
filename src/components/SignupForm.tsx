'use client';
import { useState } from 'react';
import axios from 'axios';
import useUserStore from '@/stores/userStore';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { setCookie } from '@/utils/cookies';
import 'font-awesome/css/font-awesome.min.css';

const SignupForm = () => {
    const router = useRouter();
    const { setUsername, setEmail } = useUserStore();
    const [username, setUsernameState] = useState('');
    const [email, setEmailState] = useState('');
    const [password, setPassword] = useState('');
    const [agreeToTerms, setAgreeToTerms] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        setIsLoading(true);
        e.preventDefault();
        if (!agreeToTerms) {
            Swal.fire({
                icon: 'warning',
                title: 'Terms & Conditions',
                text: 'Please agree to the Terms & Conditions',
                confirmButtonText: 'OK',
            });
            return;
        }
        try {
            const res = await axios.post('/api/signup', { username, email, password });
            console.log(res.data.message);
            // Set cookie on successful signup
            setCookie('user', JSON.stringify(res.data.user), { expires: 1 });
    
            Swal.fire({
                icon: 'success',
                title: 'Signup Successful',
                text: res.data.message, 
                confirmButtonText: 'OK',
            }).then(() => {
                router.push('/login');
            });
            setIsLoading(false);
        } catch (err) {
            if (axios.isAxiosError(err) && err.response) {
                console.error(err.response.data.message);
    
                Swal.fire({
                    icon: 'error',
                    title: 'Signup Failed',
                    text: err.response.data.message, 
                    confirmButtonText: 'Try Again',
                });
            } else {
                console.error(err);
               
                Swal.fire({
                    icon: 'error',
                    title: 'Something went wrong',
                    text: 'Please try again later.',
                    confirmButtonText: 'OK',
                });
            }
        }
        setIsLoading(false);
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen">
            {/* Left Image Section */}
            <div className="hidden md:flex w-1/2 bg-white justify-center">
                <img
                    src="/img/signup.png"
                    alt="Abstract Graphic"
                    className="w-full h-fit object-cover"
                />
            </div>

            {/* Right Form Section */}
            <div className="w-full md:w-1/2 flex justify-center md:mt-16">
                <form onSubmit={handleSubmit} className="bg-white p-6 md:p-10 rounded-lg w-full max-w-md">
                    <h2 className="text-4xl font-bold mb-4 text-green-800">Sign Up</h2>
                    <p className="text-gray-600 text-left mb-6">Create your account in seconds!</p>

                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Full Name"
                            onChange={(e) => {
                                setUsername(e.target.value);
                                setUsernameState(e.target.value);
                            }}
                            required
                            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-800 text-gray-800"
                        />
                    </div>

                    <div className="mb-4">
                        <input
                            type="email"
                            placeholder="Email Address"
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setEmailState(e.target.value);
                            }}
                            required
                            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-800 text-gray-800"
                        />
                    </div>

                    <div className="mb-4">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-800 text-gray-800"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="inline-flex items-center">
                            <input
                                type="checkbox"
                                checked={agreeToTerms}
                                onChange={(e) => setAgreeToTerms(e.target.checked)}
                                className="mr-2"
                            />
                            <span className="text-gray-600">I agree to the <a href="/terms" className="text-green-700 hover:underline">Terms & Conditions</a></span>
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-800 text-white py-3 rounded-lg hover:bg-green-700 transition duration-200"
                    >
                        Sign Up {isLoading && <i className="ml-2 fas fa-spinner fa-spin text-white"></i>}
                    </button>

                    {/* Social Media Login */}
                    <div className="mt-6 text-left">
                        <span className="text-gray-600">Already have an account? </span>
                        <a href="/login" className="text-green-700 hover:underline">Login</a>
                    </div>

                    <div className="mt-6 flex items-center justify-center">
                        <div className="border-b-2 border-green-700 flex-grow mr-2"></div>
                        <span className="text-gray-800">Or continue with</span>
                        <div className="border-b-2 border-green-700 flex-grow ml-2"></div>
                    </div>

                    <div className="mt-4 text-center">
                        <div className="flex justify-between gap-4 mt-4">
                            <button type="button" className="p-2 px-4 rounded bg-green-800 hover:bg-green-700">
                                <img src="/icons/twitter.svg" alt="Twitter" width="42" height="32" />
                            </button>
                            <button type="button" className="p-2 px-4 rounded bg-green-800 hover:bg-green-700">
                                <img src="/icons/facebook.svg" alt="Facebook" width="42" height="32" />
                            </button>
                            <button type="button" className="p-2 px-4 rounded bg-green-800 hover:bg-green-700">
                                <img src="/icons/google.svg" alt="Google" width="42" height="32" />
                            </button>
                            <button type="button" className="p-2 px-4 rounded bg-green-800 hover:bg-green-700">
                                <img src="/icons/apple.svg" alt="Apple" width="38" height="28" />
                            </button>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default SignupForm;
