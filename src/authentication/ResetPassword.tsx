import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import agent from "../api/agent";

const ResetPassword = () => {
    const [email, setEmail] = useState<string>('');
    const [token, setToken] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const navigate = useNavigate();


    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const email = urlParams.get('email');
        const token = urlParams.get('token');

        if (!email || !token) {
            // redirectioneza catre o pagina de eroare
        } else {
            setEmail(email);
            setToken(token);
        }


    }, []);

    const handleSubmit = async (e : any) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Parolele nu se potrivesc.');
            return;
        }

        try {


            const response = await agent.Auth.validateToken({ email, token });
            
            if (response) {
                await agent.Auth.resetPassword({ email, password, token })

                setMessage('Parola a fost resetată cu succes.');
                navigate('/login');

            } else {
                setMessage("Link-ul de resetare a parolei este invalid!");
            }


        } catch (error) {
            console.error(error);
            setMessage('A apărut o eroare. Vă rugăm să încercați din nou mai târziu.');
        }
    };


    return (
        <div>
            <h2>Resetare Parolă</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="password">Parolă nouă:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirmă parola nouă:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Resetează Parola</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ResetPassword;