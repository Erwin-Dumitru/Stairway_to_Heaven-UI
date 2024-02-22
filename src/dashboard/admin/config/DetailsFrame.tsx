import "./styles/DetailsFrame.css";

function DetailsFrame({selectedElement}: {selectedElement: any[]}) {
    function getDetails() {
        if (selectedElement[0] === -1) {
            return (
                <div className="details">
                    <h3>
                        {selectedElement[0] + " " + selectedElement[1] + " " + selectedElement[2]}
                    </h3>
                    <p>Administration</p>
                </div>
            );
        } else if (selectedElement[1] === -1) {
            return (
                <div className="details">
                    <h3>
                        {selectedElement[0] + " " + selectedElement[1] + " " + selectedElement[2]}
                    </h3>
                    <p>Block</p>
                </div>
            );
        } else if (selectedElement[2] === -1) {
            return (
                <div className="details">
                    <h3>
                        {selectedElement[0] + " " + selectedElement[1] + " " + selectedElement[2]}
                    </h3>
                    <p>Stair</p>
                </div>
            );
        } else {
            return (
                <div className="details">
                    <h3>
                        {selectedElement[0] + " " + selectedElement[1] + " " + selectedElement[2]}
                    </h3>
                    <p>Apartment</p>
                </div>
            );
        }
    }

    return (
        <div className="detailsFrame">
            {
                getDetails()
            }
        </div>
    );
}

export default DetailsFrame;
