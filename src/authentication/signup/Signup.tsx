import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Signup.scss'
import agent from '../../api/agent'
import { observer } from "mobx-react-lite";


export default observer(function Signup() {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const navigate = useNavigate();

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value);
    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value);
    const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(event.target.value);


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        console.log('Email:', email);
        console.log('Password:', password);

        setEmail('');
        setPassword('');
        setConfirmPassword('');

       // const encodedEmail = encodeURIComponent(email);
        //console.log("EMAIL: ", encodedEmail);
        await agent.Auth.register({email, password});

        navigate(`/account/registerSuccess?email=${email}`);
    }

    return (
        <div className='loginContainer'>
            <div className="login">
                <h1>Create an account</h1>
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
                    <input
                        type='password'
                        name="confirmPassword"
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                    />
                    <button>Sign up</button>
                </form>

                <div className="alternative">
                    <p>Already have an account?</p>
                    {/* <a href="../login/">Login</a> */}

                    <Link to="/login/" id="login">Login</Link>
                </div>

                <div className="loginSocial">
                    <div className="strike"><span>Or with</span></div>
                    
                    {/* <a href="./signup/">
                        <img src="../assets/facebook.svg" alt="Facebook" />
                        Sign up with Facebook
                    </a>
                    <a href="./signup/">
                        <img src="../assets/google.svg" alt="Google" />
                        Sign up with Google
                    </a> */}

                    <Link to="/signup">
                        <img src="/src/assets/facebook.svg" alt="Facebook" />
                        Sign up with Facebook
                    </Link>

                    <Link to="/signup">
                        <img src="/src/assets/google.svg" alt="Google" />
                        Sign up with Google
                    </Link>
                </div>
            </div>
        </div>
    )
})

export {};
