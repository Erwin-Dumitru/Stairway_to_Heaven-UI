import ChatAdmin from "./chatAdmin/ChatAdmin";
import ChatAssoc from "./chatAssoc/ChatAssoc";
import ChatClient from "./chatClient/ChatClient";
import { AddressContext } from "@/components/Context";
import "./Chat.scss";

function Chat() {
    return (
        <AddressContext.Consumer>
            {(context) => {
                return (() => {
                    if (context && context.currentAddress?.type === "client") {
                        return <ChatClient />;
                    } else if (context && context.currentAddress?.type === "association") {
                        return <ChatAssoc />;
                    } else if (context && context.currentAddress?.type === "admin") {
                        return <ChatAdmin />;
                    }
                })();
            }}
        </AddressContext.Consumer>
    );
}

export default Chat;
