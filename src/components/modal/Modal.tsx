import { useEffect} from 'react';
import './Modal.scss';

interface Props {
    children: React.ReactNode;
    dialogRef: React.RefObject<HTMLDialogElement>;
}

export default function Modal({children, dialogRef}: Props) {
    useEffect(() => {
        const dialog = dialogRef.current;
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
        }
    }, [dialogRef]);

    return (
        <dialog ref={dialogRef} className="modal">
            <div className="modal-content">
                {children}
            </div>
        </dialog>
    );
}

export function SmallModal({children, dialogRef}: Props) {
    useEffect(() => {
        const dialog = dialogRef.current;
        if (dialog) {
            dialog.addEventListener("click", (event: any) => {
                // get the button with the class 'close-button'
                // const closeButton = dialog.querySelector('.close-button');

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
    }, [dialogRef]);

    return (
        <dialog ref={dialogRef} className="small-modal">
            <div className="modal-content">
                {children}
            </div>
        </dialog>
    );
}
