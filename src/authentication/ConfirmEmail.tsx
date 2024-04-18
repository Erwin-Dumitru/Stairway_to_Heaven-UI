import agent from "@/api/agent";
import useQuery from "@/utils/hooks";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ConfirmEmail(){
    const email = useQuery().get('email') as string;
    const token = useQuery().get('token') as string;
    const navigate = useNavigate();
    
    console.log("EMAIL FROM CONFIRM: ", email);

    const Status = {
        Verifying: 'Verifying',
        Failed: 'Failed',
        Success: 'Success'
    }

    const [status, setStatus] = useState(Status.Verifying);

    const handleConfirmationEmailResend = async () => await agent.Auth.resendEmailConfirm(email);

    useEffect(() => {
        agent.Auth.confirmEmail(token, email)
                  .then(() => setStatus(Status.Success))
                  .catch(() => setStatus(Status.Failed));

    }, [Status.Failed, Status.Success, token, email]);

    function getBody(){
        switch(status){
            case Status.Verifying:
                return <p>Verifying...</p>
            case Status.Failed:
                return (
                    <div>
                        <p>Verification failed. You can try resent the verify link to your email</p>
                        <button onClick={handleConfirmationEmailResend} >Resend email</button>
                    </div>
                );
            case Status.Success:
                return (
                    <div>
                        <p>Email has been verified - you can now login</p>
                        <button onClick={() => navigate('/login')}>Login</button>
                    </div>
                );

        }
    }

    return (
        <>
            <div>
                { getBody() }
            </div>
        </>
    );
}