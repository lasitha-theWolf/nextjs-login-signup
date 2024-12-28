'use client';
import { useState } from 'react';
import axios from 'axios';
import useUserStore from '@/stores/userStore';
import Swal from 'sweetalert2';
import { setCookie } from '@/utils/cookies';
import 'font-awesome/css/font-awesome.min.css';

//function main   
const LoginForm = () => {
    const { setEmail, email } = useUserStore();
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    let [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        setIsLoading(true);
        e.preventDefault();
        try {
            const res = await axios.post('/api/login', { email, password });
            // Set cookie on successful login
            setCookie('user', JSON.stringify(res.data.user), { expires: 1 });
            console.log(res.data.message);

        // Show success alert
            Swal.fire({
                icon: 'success',
                title: 'Login Successful',
                text: res.data.message, 
                confirmButtonText: 'OK',
            });
            setIsLoading(false);
        } catch (err) {
            if (axios.isAxiosError(err) && err.response) {
                console.error(err.response.data.message);
    
                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
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
            <div className="hidden md:flex w-1/2 bg-white justify-center sm:z-10">
                <img
                    src="/img/login.png"
                    alt="Abstract Graphic"
                    className="w-full h-fit object-cover"
                />
            </div>

            {/* Right Form Section */}
            <div className="w-full md:w-1/2 flex justify-center md:mt-16 sm:rounded-3xl sm:z-20">
                <form onSubmit={handleSubmit} className="bg-white p-6 md:p-10 rounded-lg w-full max-w-md">
                    <h2 className="text-4xl font-bold mb-4 text-[#3C1AB9]">Login</h2>
                    <p className="text-gray-600 text-left mb-6">Please enter your login details to start having fun!</p>

                    <div className="mb-4">
                        <input
                            type="email"
                            placeholder="Email Address"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600 text-gray-800"
                        />
                    </div>

                    <div className="mb-4">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600 text-gray-800"
                        />
                    </div>

                    <div className="flex items-center mb-4">
                        <input
                            type="checkbox"
                            id="rememberMe"
                            checked={rememberMe}
                            onChange={() => setRememberMe(!rememberMe)}
                            className="mr-2 text-purple-600 focus:ring-purple-500"
                        />
                        <label htmlFor="rememberMe" className="text-gray-700">Keep me logged in</label>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#3C1AB9] text-white py-3 rounded-lg hover:bg-[#3C1AB9] transition duration-200"
                    >
                        Log in {isLoading && <i className="ml-2 fas fa-spinner fa-spin text-white"></i>}
                    </button>

                    {/* Social Media Login */}
                    <div className="mt-6 text-left">
                        <span className="text-gray-600">Don’t have an account? </span>
                        <a href="/signup" className="text-purple-700 hover:underline">Sign up</a>
                    </div>

                    <div className="mt-6 flex items-center justify-center">
                        <div className="border-b-2 border-purple-700 flex-grow mr-2"></div>
                        <span className="text-gray-800">Or continue with</span>
                        <div className="border-b-2 border-purple-700 flex-grow ml-2"></div>
                    </div>

                    <div className="mt-4 text-center">
                        <div className="flex justify-between gap-4 mt-4">
                            <button type="button" className="p-2 px-4 rounded bg-[#3C1AB9] hover:bg-purple-700">
                                <img src="/icons/twitter.svg" alt="Twitter" width="42" height="32" />
                            </button>
                            <button type="button" className="p-2 px-4 rounded bg-[#3C1AB9] hover:bg-purple-700">
                                <img src="/icons/facebook.svg" alt="Facebook" width="42" height="32" />
                            </button>
                            <button type="button" className="p-2 px-4 rounded bg-[#3C1AB9] hover:bg-purple-700">
                                <img src="/icons/google.svg" alt="Google" width="42" height="32" />
                            </button>
                            <button type="button" className="p-2 px-4 rounded bg-[#3C1AB9] hover:bg-purple-700">
                                <img src="/icons/apple.svg" alt="Apple" width="38" height="28" />
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
