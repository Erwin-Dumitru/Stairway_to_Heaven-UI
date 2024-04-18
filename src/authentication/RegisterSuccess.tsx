import agent from "@/api/agent";
import useQuery from "@/utils/hooks";


export default function RegisterSuccess() {
    const email = useQuery().get('email') as string;
 
    const handleConfirmationEmailResend = async () => await agent.Auth.resendEmailConfirm(email);

    return (
        <div>
            <h2>Succesfully registered!</h2>

            <p>PLease check your email for the verification email</p>

            {
                 email &&
                <>
                    <p>Didn't receive the email ? Click the below button to resend</p>
                    <button onClick={handleConfirmationEmailResend}>Resend email</button>
                </>
            }
        </div>
    );
}