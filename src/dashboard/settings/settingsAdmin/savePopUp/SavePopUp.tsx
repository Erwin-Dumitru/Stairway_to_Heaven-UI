import './SavePopUp.scss';

export default function SavePopUp({open, resetHandle, saveClickHandle}: {open: boolean, resetHandle: any, saveClickHandle: any}) {
    return (
        <div className={`save-popup-container ${open ? 'active' : ''}`}>
            <div className="save-popup">
                <div className="text">
                    <i className="ri-information-line"></i>
                    <h3>Unsaved changes</h3>
                </div>

                <div className="buttons">
                    <button onClick={resetHandle}>
                        Reset
                    </button>

                    <button onClick={saveClickHandle}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}
