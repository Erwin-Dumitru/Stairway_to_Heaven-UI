// import React from 'react'
import { useState } from 'react'
import './styles/App.css'

function App() {
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
        <div className='App'>
            <div className="signup">
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
                    <a href="../login/">Login</a>
                </div>

                <div className="loginSocial">
                    <div className="strike"><span>Or with</span></div>
                    
                    <a href="./signup/">
                        <img src="../assets/facebook.svg" alt="Facebook" />
                        Sign up with Facebook
                    </a>
                    <a href="./signup/">
                        <img src="../assets/google.svg" alt="Google" />
                        Sign up with Google
                    </a>
                </div>
            </div>
        </div>
    )
}

export default App;
