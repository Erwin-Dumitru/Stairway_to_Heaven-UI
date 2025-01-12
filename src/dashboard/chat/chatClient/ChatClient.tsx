import "./ChatClient.scss";

function ChatClient() {
    function RenderChats() {
        let chats = [];
        const chatData = [
            { key: 1, name: 'Tristan', address: 'Penthouse', message: '51%? 🥺', 
            avatar: 'https://doodleipsum.com/100x100/avatar?bg=63C8D9&i=f09941a6f1650d51929781a86c6a8411' },
            { key: 2, name: 'Dorel', address: 'Ap. 1', message: 'Ai 10 lei până mâine?', 
            avatar: 'https://doodleipsum.com/100x100/avatar?bg=6392D9&i=0c5f0f051abc28a103e6785cc3e3699f' },
            { key: 3, name: 'Irina', address: 'Ap. 18', message: 'Vii la un Netflix and chill?', 
            avatar: 'https://doodleipsum.com/100x100/avatar?bg=D96363&i=c4dc7b95ebea00be8106260981c237e8' },
            { key: 4, name: 'Nicușor Bond', address: 'Ap. 20', message: 'Sunt PUTERNIC!!!', 
            avatar: 'https://doodleipsum.com/100x100/avatar?bg=7463D9&i=ddca8586297823667d3bc8df76612061' },
        ];
    
        chats = chatData.map(chat => (
            <div className="conversation" key={chat.key}>
                <img src={chat.avatar} alt="avatar" />
                <div className="info">
                    <div className="name">
                        {chat.name}
                        <div className="address">{chat.address}</div>
                    </div>
                    <div className="lastMessage">
                        {chat.message}
                        {/* <div className="date">12:00</div> */}
                    </div>
                </div>
            </div>
        ));
    
        return (
            <div className="conversations">
                {chats}
            </div>
        );
    }

    function Message({ message, time, isMine }: { message: string, time: string, isMine: boolean }) {
        return (
            <div className={`messageContainer ${isMine ? "sent" : "received"}`}>
                <div className="message">
                    {message}
                </div>
                <div className="time">
                    {time}
                </div>
            </div>
        );
    }

    return (
        <div className="chat dashboard-page dashboard-container">
            <div className="dashboard-left"> {/* chatList */}
                <div className="searchBar">
                    <input type="text" placeholder="Caută" />
                    <i className="ri-search-line"></i>
                </div>

                <RenderChats />
            </div>

            <div className="dashboard-right"> {/* chatContent */}
                <div className="chatHeader">
                    <div className="info">
                        <img src="https://doodleipsum.com/100x100/avatar?bg=63C8D9&i=f09941a6f1650d51929781a86c6a8411" alt="avatar" />
                        <div className="name">
                            Tristan
                            <div className="address">Penthouse</div>
                        </div>
                    </div>

                    <div className="actions">
                        {/* <i className="ri-search-line"></i> */}
                        <i className="ri-more-fill"></i>
                    </div>
                </div>

                <div className="messages">
                    <Message message="Salut! 🤗" time="12:00" isMine={true} />
                    <Message message="Ce faci?" time="12:00" isMine={false} />
                    {/* <Message message="Bă! Ai chef să mai mergem la Cluj?" time="12:00" isMine={true} />
                    <Message message="Și mie ce-mi iese?" time="12:00" isMine={false} />
                    <Message message="Poate dai și tu de o gagică, ceva" time="12:01" isMine={true} />
                    <Message message="Am destule" time="12:01" isMine={false} />
                    <Message message="Da' ce vrei?" time="12:01" isMine={true} />
                    <Message message="51%? 🥺" time="12:02" isMine={false} /> */}
                </div>

                <div className="chatFooter">
                    <i className="ri-add-circle-line"></i>
                    <div className="chatInput">
                        <input type="text" placeholder="Scrie un mesaj" />
                        <i className="ri-emoji-sticker-fill"></i>
                    </div>
                    <i className="ri-send-plane-fill"></i>
                </div>
            </div>
        </div>
    );
}

export default ChatClient;
