import { useState } from 'react';
import './Indexes.scss';

type Index = {
    name: string;
    value: boolean;
    contors?: { name: string }[];
};

function Indexes() {
    const [indexes, setIndexes] = useState<Index[]>([
        {
            name: "Apa caldă",
            value: false,
            contors: []
        },
        {
            name: "Apa rece",
            value: true,
            contors: [
                {
                    name: "Bucătărie"
                },
                {
                    name: "Baie"
                }
            ]
        },
        {
            name: "Încălzire",
            value: false,
            contors: []
        },
        {
            name: "Electricitate",
            value: false,
            contors: []
        },
        {
            name: "Salubritate",
            value: false
        },
        {
            name: "Întreținere",
            value: false
        },
        {
            name: "Întreținere",
            value: false
        },
        {
            name: "Întreținere",
            value: false
        }
    ]);

    return (
        <div className="indexesWrapper">
            <h4>Contoare</h4>

            <div className="indexes">
                {indexes.map((index, indexKey) => (
                    <div className="index" key={indexKey}
                    style={{ gridRowEnd: `span ${index.contors ? index.contors.length + 1 : 1}` }}>
                        <div className="indexHeader">
                            <input type="checkbox" id={index.name} name={index.name} />
                            <h3>{index.name}</h3>

                            {index.value && (
                                <div className='contorBox'>
                                    <h5>Contor +</h5>
                                    {/* <div className="icon">
                                        <i className="ri-add-line"></i>
                                    </div> */}
                                </div>
                            )}
                        </div>

                        <div className='contoare'>
                            {index.contors && index.contors.length > 0 &&
                             index.contors.map((contor, contorKey) => (
                                <input
                                    className="contor"
                                    key={contorKey}
                                    type="text"
                                    id={contor.name}
                                    name={contor.name}
                                    value={contor.name}
                                    onChange={() => contor.name = contor.name}
                                />
                            ))}
                        </div>
                        
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Indexes;
