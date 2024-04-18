import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Login.scss'
import { useStore } from '../../stores/store';

function Login() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const { userStore } = useStore();
    const navigate = useNavigate();

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value);
    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value);
        

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        console.log('Email:', email);
        console.log('Password:', password);

        setEmail('');
        setPassword('');

        await userStore.login({email, password})
                       .then(() => navigate('/dashboard/'));
    }

    return (
        <div className='loginContainer'>
            <div className="login">
                <h1>Welcome back</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={handleEmailChange}
                    />
                    <input
                        type='password'
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    <button>Login</button>
                </form>

                <div className="alternative">
                    {/* <a href="./login/">Forgot password?</a>
                    <a href="../signup/">Sign up</a> */}

                    <Link to="/login" id="forgotPassword">Forgot password?</Link>
                    <Link to="/signup" id="signUp">Sign up</Link>
                </div>

                <div className="loginSocial">
                    <div className="strike"><span>Or with</span></div>
                    
                    {/* <a href="./login/">
                        <img src="../assets/facebook.svg" alt="Facebook" />
                        Sign in with Facebook
                    </a>
                    <a href="./login/">
                        <img src="../assets/google.svg" alt="Google" />
                        Sign in with Google
                    </a> */}

                    <Link to="/login">
                        <img src="/src/assets/facebook.svg" alt="Facebook" />
                        Sign in with Facebook
                    </Link>
                    <Link to="/login">
                        <img src="/src/assets/google.svg" alt="Google" />
                        Sign in with Google
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Login;
