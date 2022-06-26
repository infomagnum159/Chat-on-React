import React, {useEffect, useState} from 'react';
import Messages from "../../Components/Messages/Messages";

const Chat = () => {
    const [messages, setMessages] = useState([]);
    let url = 'http://146.185.154.90:8000/messages';
    useEffect(() => {
        let interval = setInterval (() => {
        let datetime = messages.length > 0 ? '?datetime='+messages[messages.length - 1].datetime : ''
        let messagesCopy = [...messages]
        const fetchData = async () => {
            const response = await fetch(url + datetime);

            if (response.ok) {
                const posts = await response.json();
                posts.map((item) => {
                    return messagesCopy.push(item)
                })
                setMessages(messagesCopy);
            }
        };

        fetchData().catch(e => console.error(e));
    }, 2000)
    return () => clearInterval(interval);
});



    return (
        <div>
            {messages.map((message, index) => (
            <Messages
            key={index}
                text={message.message}
            author={message.author}
            datetime={message.datetime}
            />
            ))}
        </div>
    );
};

export default Chat;