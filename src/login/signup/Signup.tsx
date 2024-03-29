// import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Signup.scss'

function Signup() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        } else {
            setConfirmPassword(value);
        }
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        // TODO: Send the email and password to the server
        console.log('Email:', email);
        console.log('Password:', password);
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
                        onChange={handleChange}
                    />
                    <input
                        type='password'
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={handleChange}
                    />
                    <input
                        type='password'
                        name="confirmPassword"
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={handleChange}
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
}

export default Signup;
