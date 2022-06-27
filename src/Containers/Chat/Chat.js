import React, {useEffect, useState} from 'react';
import Messages from "../../Components/Messages/Messages";
import EnterMessage from "../../Components/EnterMessage/EnterMessage";
import axios from "axios";
import './Chat.css';


const Chat = () => {
    const [messages, setMessages] = useState([]);

    const url = 'http://146.185.154.90:8000/messages';
    useEffect(() => {
        const interval = setInterval (() => {
        const datetime = messages.length > 0 ? '?datetime='+ messages[messages.length - 1].datetime : '';
        const messagesCopy = [...messages];
                const fetchData = async () => {
                    try {
                    const response = await axios(url + datetime);
                    const posts = response.data;
                    posts.map((item) => {
                        return messagesCopy.push(item);
                    })
                    setMessages(messagesCopy.reverse());
                } catch(e) {
                    console.log("Что-то пошло не так");
                }
                };
                document.querySelector('.preloader').style.display = 'none';
            fetchData().catch(e => console.error(e));
    }, 2000)
    return () => clearInterval(interval);
}, []);

    const addMessage = async (event) => {
        event.preventDefault()
        try {
            const data = new URLSearchParams();
            data.set('message', event.target.text.value);
            data.set('author', event.target.author.value);
            await axios.post(url, data);
            setMessages([...messages]);
            event.target.reset();
        } catch (e) {
            console.log('Error send message:');
        }
    }
    return (
        <>
            <div className="preloader">
                <div className="preloader__row">
                    <div className="preloader__item">
                        <div className="preloader__item">
                        </div>
                    </div>
                </div>
            </div>
        <div className="chat">
            <EnterMessage
                addMessage = {addMessage}
            />
            <div className="messages">
                {messages.map((message,index) => (
                    <Messages
                        key={index}
                        text={message.message}
                        author={message.author}
                        datetime={message.datetime}
                    />
                ))}
            </div>
        </div>
        </>
    );
};

export default Chat;