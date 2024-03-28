import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Login.scss'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        if (name === 'email') {
            setEmail(value);
        } else {
            setPassword(value);
        }
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        // TODO: Send the email and password to the server
        console.log('Email:', email);
        console.log('Password:', password);
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
                        onChange={handleChange}
                    />
                    <input
                        type='password'
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={handleChange}
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
