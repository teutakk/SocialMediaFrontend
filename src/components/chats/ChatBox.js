import React, { useEffect, useRef, useState } from "react";
import classes from "./ChatBox.module.css"
import { getUser } from '../../api/UserRequests'
import { addMessage, getMessages } from "../../api/MessageRequests";
import {format} from "timeago.js"
import InputEmoji from 'react-input-emoji';
import { IoIosHappy, IoIosMic, IoMdSend } from "react-icons/io";

const ChatBox = ({ chat, currentUser, setSendMessage, receivedMessage  }) => {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const scroll = useRef()

 

  //fetching data for header
  useEffect(() => {
    const userId = chat?.members?.find((id) => id !==currentUser);
    const getUserData = async () =>{
      try {
          const {data} = await getUser(userId)
          setUserData(data)
      } catch (error) {
          console.error("Error fetching user data:", error.response);
      }
    };
    if(chat!==null) getUserData();
  }, [chat, currentUser])

  //fetching data for messages
  useEffect(() => {
    const fetchMessages = async()=>{
      try {
        const {data} = await getMessages(chat._id);
        setMessages(data);
      } catch (error) {
        console.log(error)
      }
    };
    if(chat!==null) fetchMessages();
  }, [chat])

  const handleChange = (newMessage) => {
    setNewMessage(newMessage)
  }

  const handleSend = async(e)=> {
    e.preventDefault()
    const message = {
      senderId : currentUser,
      text: newMessage,
      chatId: chat._id,
  }
  const receiverId = chat.members.find((id)=>id!==currentUser);
  // send message to socket server
  setSendMessage({...message, receiverId})
  // send message to database
  try {
    const { data } = await addMessage(message);
    setMessages([...messages, data]);
    setNewMessage("");
  }
  catch
  {
    console.log("error")
  }
}
  //receive message from socket server
  useEffect(()=> {
    console.log("Message Arrived: ", receivedMessage)
    if (receivedMessage !== null && receivedMessage.chatId === chat._id) {
      setMessages([...messages, receivedMessage]);
    }
  
  },[receivedMessage])

  //always scroll to the last message
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior : "smooth"})
  }, [messages])

  return (
      <>
        <div className={classes["ChatBox-container"]}>
          {chat? ( 
              <>
              <div className={classes["chat-header"]}>
                <div className={classes.friends}>
                  <div>
                    <div className={classes["online-dot"]}></div>
                        <img src={userData?.profilePicture} alt='' width={"60px"} height={"60px"} style={{"borderRadius": "50%", "margin": "10px"}}/>
                        <div className='username' style={{fontSize: "1rem", fontWeight: "700", display: "flex", flexDirection: "column", marginLeft: "5rem", marginTop: "-3rem"}}>
                            <span style={{color: "#393939"}}>{userData?.firstName} {userData?.lastName}</span>
                        </div>
                  </div>
                </div>
                <hr key="static-hr" className={classes.hr}/>
              </div>
              <div className={classes["chat-body"]}>
                {messages.map((message)=>(
                  <>
                    <div key={message?._id} ref={scroll} className={message?.senderId === currentUser? classes.own : classes.message}>
                    {message && message.text && (
                      <>
                        <span>{message.text}</span>
                        <span className={classes.time}>{format(message.createdAt)}</span>
                        </>
                    )}
                    </div>
                  </>
                ))}
              </div>
              <div className={classes["chat-sender"]}>
                <div className={classes.plus}>+</div>
                  <InputEmoji
                    value = {newMessage}
                    onChange = {handleChange}
                  />
                  <div className={classes["send-button"]} onClick={handleSend}>
                    <IoMdSend/>
                  </div>
              </div>
            </>
          ) : (
            <span style={{fontFamily: "Montserrat, sans-serif", fontWeight: "500", textAlign:"center", display: "flex", justifyContent: "center", alignItems:"flex-end"}}>Tap on a chat to start conversation</span>
          )}
        </div>
      </>
    );
};

export default ChatBox;
