import React, { useState,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const Login = () => {
  const [rememberLogin, setRememberLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, login } = UserAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
        // User is logged in, navigate or perform additional actions
        navigate("/");
    }
}, [user, navigate]);


const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
        await login(email, password, rememberLogin);
        // Navigation logic moved to useEffect to ensure user is updated
    } catch (err) {
        console.log(err);
    }
};

  return (
    <>
      <div className='w-full h-screen'>
        <img
          className='hidden sm:block absolute w-full h-full object-cover'
          src="https://assets.nflxext.com/ffe/siteui/vlv3/c31c3123-3df7-4359-8b8c-475bd2d9925d/15feb590-3d73-45e9-9e4a-2eb334c83921/IN-en-20231225-popsignuptwoweeks-perspective_alpha_website_small.jpg"
          alt="///"
        />
        <div className='bg-black/70 fixed top-0 left-0 w-full h-screen' />
        <div className='fixed w-full px-4 py-24 z-20'>
          <div className='max-w-[450px] h-[500px] mx-auto bg-black/80 rounded-lg'>
            <div className='max-w-[320px] mx-auto py-16'>
              <h1 className='text-3xl font-nsans-bold'>Login</h1>
              <form
                onSubmit={handleFormSubmit}
                className='w-full flex flex-col py-4'
              >
                <input
                  className='p-3 my-2 bg-gray-700 rounded'
                  type='email'
                  placeholder='Email'
                  autoComplete='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  className='p-3 my-2 bg-gray-700 rounded'
                  type='password'
                  placeholder='Password'
                  autoComplete='current-password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type='submit' // Added button type
                  className='bg-red-600 py-3 my-6 rounded font-nsans-bold'
                >
                  Login
                </button>
                <div className='flex justify-between items-center text-gray-600'>
                  <p>
                    <input
                      type='checkbox'
                      className='mr-2'
                      checked={rememberLogin}
                      onChange={(e) => setRememberLogin(!rememberLogin)}
                    />
                    Remember Me
                  </p>
                  <p>Need Help?</p>
                </div>
                <p className='my-4'>
                  <span className='text-gray-600 mr-2'>
                    New to Netflix?
                  </span>
                  <Link to='/signup'>Sign Up</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
