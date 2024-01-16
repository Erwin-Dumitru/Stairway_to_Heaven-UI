import React, { RefObject, useEffect } from 'react';
import "./styles/CreateAssociation.css";
import "./styles/Dialog.css";

interface CreateAssociationProps {
    dialogRef: RefObject<HTMLDialogElement>;
}

function CreateAssociation({ dialogRef }: CreateAssociationProps) {
    useEffect(() => {
        const dialog = dialogRef.current;
        if (dialog) {
            dialog.addEventListener("click", (event) => {
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
        <dialog className="dialogCreateAssociation" ref={dialogRef} >
            <div className="createAssociation">
                <h1>
                    Creează asociație
                </h1>
                <button type="submit">Creează</button>
            </div>
        </dialog>
    )
}

export default CreateAssociation;