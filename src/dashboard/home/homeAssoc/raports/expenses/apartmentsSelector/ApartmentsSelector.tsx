import { useState, useRef, useEffect } from 'react';
import './ApartmentsSelector.scss';
// import { set } from 'mobx';

export default function ApartmentsSelector() {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(0);
    const [groupName, setGroupName] = useState('');
    const [section, setSection] = useState(false); // Switch: false = group, true = individual
    const [dropdownHeight, setDropdownHeight] = useState(0);
    const [groupPosition, setGroupPosition] = useState(0);
    const [individualPosition, setIndividualPosition] = useState(0);
    const [upButton, setUpButton] = useState(false);
    const [downButton, setDownButton] = useState(false);

    const ref = useRef<HTMLDivElement>(null);
    const groupRef = useRef<HTMLDivElement>(null);
    const groupsRef = useRef<HTMLDivElement>(null);
    const individualsRef = useRef<HTMLDivElement>(null);

    const groups = [
        {
            name: 'Bloc A',
            apartments: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        },
        {
            name: 'Bloc B',
            apartments: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
        },
        {
            name: 'Bloc C',
            apartments: [21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
        }
    ];

    const [apartments, setApartments] = useState([
        {
            name: '1',
            selected: false
        },
        {
            name: '2',
            selected: false
        },
        {
            name: '3',
            selected: false
        },
        {
            name: '4',
            selected: false
        },
        {
            name: '5',
            selected: false
        },
        {
            name: '6',
            selected: false
        },
        {
            name: '7',
            selected: false
        },
        {
            name: '8',
            selected: false
        },
        {
            name: '9',
            selected: false
        },
        {
            name: '10',
            selected: false
        },
        {
            name: '11',
            selected: false
        },
        {
            name: '12',
            selected: false
        },
        {
            name: '13',
            selected: false
        },
        {
            name: '14',
            selected: false
        },
        {
            name: '15',
            selected: false
        },
        {
            name: '16',
            selected: false
        },
        {
            name: '17',
            selected: false
        },
        {
            name: '18',
            selected: false
        },
        {
            name: '19',
            selected: false
        },
        {
            name: '20',
            selected: false
        },
        {
            name: '21',
            selected: false
        },
        {
            name: '22',
            selected: false
        },
        {
            name: '23',
            selected: false
        },
        {
            name: '24',
            selected: false
        },
        {
            name: '25',
            selected: false
        },
        {
            name: '26',
            selected: false
        },
        {
            name: '27',
            selected: false
        },
        {
            name: '28',
            selected: false
        },
        {
            name: '29',
            selected: false
        },
        {
            name: '30',
            selected: false
        }
    ]);

    // Close the dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    // Count the selected apartments
    useEffect(() => {
        let count = 0;
        apartments.forEach(apartment => {
            if (apartment.selected) {
                count++;
            }
        });
        setSelected(count);
    }, [apartments]);

    // Set the height of the dropdown
    useEffect(() => {
        if (groupRef.current) {
            setDropdownHeight(groupRef.current.offsetHeight * 5 + 31.25);
        }
    }, [groupRef]);

    // Check if the scroll buttons should be displayed
    useEffect(() => {
        let groupsHeight = groupsRef.current ? groupsRef.current.offsetHeight : 0;
        let individualsHeight = individualsRef.current ? individualsRef.current.offsetHeight : 0;
        let groupsSlises = Math.ceil(groupsHeight / dropdownHeight);
        let individualsSlises = Math.ceil(individualsHeight / dropdownHeight);

        console.log(groupPosition, individualPosition, groupsSlises, individualsSlises);

        if (!section) {
            if (groupPosition === 0) {
                setUpButton(false);
            } else {
                setUpButton(true);
            }

            if (groupPosition === -groupsSlises + 1) {
                setDownButton(false);
            } else {
                setDownButton(true);
            }
        } else {
            if (individualPosition === 0) {
                setUpButton(false);
            } else {
                setUpButton(true);
            }

            if (individualPosition === -individualsSlises + 1) {
                setDownButton(false);
            } else {
                setDownButton(true);
            }
        }
    }, [section, groupPosition, individualPosition, groupsRef]);

    return (
        <div className="apartments-selector" ref={ref}>
            <div className={`cell` + (isOpen ? ' open' : '')} onClick={() => setIsOpen(!isOpen)}>
                {groupName ? 
                    <h3>{groupName}</h3> : 
                    <h3>{selected} / 48</h3>
                }

                <div className="icon">
                    <i className="ri-arrow-down-s-line" onClick={() => setIsOpen(!isOpen)}></i>
                </div>
            </div>

            <div className={`dropdown ${isOpen ? '' : 'closed'}`}>
                <div className="switch">
                    <div className="item" onClick={() => setSection(false)}>
                        <h3>Grup</h3>
                    </div>

                    <div className="item" onClick={() => setSection(true)}>
                        <h3>Indiv.</h3>
                    </div>

                    <div className={`background ${section ? 'right' : ''}`} />
                </div>

                <div className={`scroll-button scroll-button-up ${upButton ? 'active' : ''}`} onClick={() => {
                    if (!section) {
                        setGroupPosition(groupPosition + 1);
                    } else {
                        setIndividualPosition(individualPosition + 1);
                    }
                }}>
                    <div className="inner">
                        <i className="ri-arrow-up-s-line"></i>
                    </div>
                </div>

                <div className="content" style={{ maxHeight: dropdownHeight + "px" }}>
                    <div className={`groups-ap ${section ? 'closed' : ''}`} style={{ marginTop: groupPosition * dropdownHeight + "px" }} ref={groupsRef}>
                        {groups.map((group, index) => {
                            return (
                                <div className="group-ap" key={index} ref={groupRef} onClick={() => {
                                    setGroupName(group.name);
                                    let newApartments = [...apartments];
                                    newApartments.forEach(apartment => {
                                        apartment.selected = false;
                                    });
                                    setApartments(newApartments);
                                    setIsOpen(false);
                                }}>
                                    <h3>{group.name}</h3>
                                </div>
                            );
                        })}
                    </div>
                    
                    <div className={`individuals-ap ${section ? '' : 'closed'}`} style={{ marginTop: individualPosition * dropdownHeight + "px" }} ref={individualsRef}>
                        {apartments.map((apartment, index) => {
                            return (
                                <div className={`individual-ap ${apartment.selected ? 'selected' : ''}`} key={index} onClick={() => {
                                    let newApartments = [...apartments];
                                    newApartments[index].selected = !newApartments[index].selected;
                                    setApartments(newApartments);
                                    setGroupName('');
                                }}>
                                    <h3>{apartment.name}</h3>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className={`scroll-button scroll-button-down ${downButton ? 'active' : ''}`} onClick={() => {
                    if (!section) {
                        setGroupPosition(groupPosition - 1);
                    } else {
                        setIndividualPosition(individualPosition - 1);
                    }
                }}>
                    <div className="inner">
                        <i className="ri-arrow-down-s-line"></i>
                    </div>
                </div>
            </div>
        </div>
    );
}
