import "./styles/Settings.css";
import { useState } from "react";

function Settings({currentAddress}: {currentAddress: string}) {
    const sectionElements = ["Administrație", "Cont", "Notificări", "Profil"];
    const [section, setSection] = useState(sectionElements[0]);
    const [details, setDetails] = useState([
        "Dorel Administration",
        "Strada Cerna 18",
    ]);

    function RenderSectionElements() {
        let elements = [];
        elements = sectionElements.map(element => (
            <div className={`sectionElement ${section === element ? "selected" : ""}`} key={element} onClick={() => setSection(element)}>
                {element}
            </div>
        ));

        return elements;
    }

    function RenderSection() {
        switch (section) {
            case "Profil":
                return (
                    <div className="section">
                        <h1>Profil</h1>
                    </div>
                );
            case "Administrație":
                return (
                    <div className="section">
                        <div className="details">
                            <h2>Setări Administrație</h2>
                            <div className="detailValue">
                                <span>Nume asociație</span>
                                <input type="text" value={details[0]} onChange={(e) => setDetails([e.target.value])} />
                            </div>
                            <div className="detailValue">
                                <span>Adresă</span>
                                <input type="text" value={details[1]} onChange={(e) => setDetails([e.target.value])} />
                            </div>

                            <button className="save">Salvează</button>

                            
                        </div>
                    </div>
                );
            default:
                return (
                    <div className="section">
                        <h1>Default</h1>
                    </div>
                );
        }
    }
    
    return (
        <div className="settings">
            <div className="settingSections">
                { RenderSectionElements() }
            </div>

            <div className="settingsRight">
                { RenderSection() }
            </div>
        </div>
    );
}

export default Settings;
