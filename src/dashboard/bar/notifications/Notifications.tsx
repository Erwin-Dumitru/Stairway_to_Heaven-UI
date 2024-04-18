import { useEffect } from 'react';
import './Notifications.scss';

export default function Notifications({notifyRef}: {notifyRef: React.RefObject<HTMLDialogElement>}) {
    useEffect(() => {
        const dialog = notifyRef.current;
        if (dialog) {
            dialog.addEventListener("click", (event: any) => {
                if (event.target === dialog) {
                    dialog.classList.add("isClosing");
                    dialog.addEventListener("webkitAnimationEnd", function handleAnimationEnd() {
                        dialog.classList.remove("isClosing");
                        dialog.close();
                        dialog.removeEventListener("webkitAnimationEnd", handleAnimationEnd, false);
                    }, false);
                }
            });

            const closeButton = dialog.querySelector('.close-button');
            if (closeButton) {
                closeButton.addEventListener("click", () => {
                    dialog.classList.add("isClosing");
                    dialog.addEventListener("webkitAnimationEnd", function handleAnimationEnd() {
                        dialog.classList.remove("isClosing");
                        dialog.close();
                        dialog.removeEventListener("webkitAnimationEnd", handleAnimationEnd, false);
                    }, false);
                });
            }
        }
    }, [notifyRef]);

    return (
        <dialog ref={notifyRef} className="notifications">
            <div className="notifications-panel">
                <div className="top">
                    <div className="close-button" 
                        // onClick={setOpen(false)}
                        >
                        <i className="ri-arrow-left-line"></i>
                    </div>

                    <h2>Notifications</h2>
                </div>

                <div className="notification">
                    <div className="notification-front">
                        <div className="icon">
                            <i className="ri-user-add-line"></i>
                        </div>

                        <div className="notification-content">
                            <h3>New User</h3>
                            <p>A new user has been added to the system.</p>
                        </div>
                    </div>

                    <div className="delete">
                        <i className="ri-close-line"></i>
                    </div>
                </div>

                <div className="notification">
                    <div className="notification-front">
                        <div className="icon">
                            <i className="ri-user-add-line"></i>
                        </div>

                        <div className="notification-content">
                            <h3>New User</h3>
                            <p>A new user has been added to the system.</p>
                        </div>
                    </div>

                    <div className="delete">
                        <i className="ri-close-line"></i>
                    </div>
                </div>
            </div>
        </dialog>
    );
}
