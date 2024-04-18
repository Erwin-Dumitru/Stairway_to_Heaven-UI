import { Link } from 'react-router-dom';
import './Profile.scss';
import userProfile from "@/assets/User-2.svg";
import { useEffect, useState } from 'react';

export default function Profile() {
    useEffect(() => {
        const handler = (event: any) => {
            if (event.target.closest('.profile') === null) {
                setOpen(false);
            }
        }

        document.body.addEventListener("click", handler);

        return () => {
            document.body.removeEventListener("click", handler);
        }
    }, []);

    const [open, setOpen] = useState(false);

    return (
        <div className="profile">
            <div className="img-nav default" onClick={() => setOpen(!open)}>
                <img src={userProfile} alt="User Profile" />
            </div>
            
            <div className={`dropdown ${open ? 'open' : ''}`}>
                <div className="profile-nav">
                    <div className="img-nav default">
                        <img src={userProfile} alt="User Profile" />
                    </div>

                    <div className="info">
                        <h3>John Doe</h3>
                        <span>@johnny</span>
                    </div>
                </div>

                <div className="links">
                    <Link to="/dashboard/profile">
                        <i className="ri-user-line"></i>
                        <h3>Profile</h3>
                    </Link>

                    <Link to="/dashboard/settings">
                        <i className="ri-settings-3-line"></i>
                        <h3>Settings</h3>
                    </Link>

                    <Link to="/dashboard/help">
                        <i className="ri-question-line"></i>
                        <h3>Help</h3>
                    </Link>

                    <Link to="/dashboard/logout">
                        <i className="ri-logout-circle-r-line"></i>
                        <h3>Logout</h3>
                    </Link>
                </div>
            </div>
        </div>
    );
}
