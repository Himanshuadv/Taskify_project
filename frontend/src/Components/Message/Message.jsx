import React from 'react'
import './Message.css'
import { BiMessageSquareDetail } from "react-icons/bi";
import { useTaskContext } from '../TaskContext';

const Message = (props) => {

    const {fetchNotifications} = useTaskContext();

    const handleMsgSeen = async () => {
        try {
            const response = await fetch("http://localhost:5000/update-msg-status", {
                method: "PUT",
                credentials: "include",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({
                notificationId: props.id, // Pass the task's unique identifier here
                }),
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                fetchNotifications();
            } else {
                console.error("Failed to update Message status");
            }
            } catch (error) {
            console.error("Error", error);
            }
    }

    return (
    <div className={props.seen? 'msg-div-seen' : 'msg-div'} onClick={()=>{handleMsgSeen()}}>
    <div className={props.seen? "message-icon-seen" : "message-icon"}>
                <BiMessageSquareDetail size={24}/>
                </div>
                <div className={props.seen? "msg-seen" : "msg"}>
                <div className={props.seen? "msg-title-seen" : "msg-title"}>
                    <h3>{props.remindMessage}</h3>
                </div>
                <div className={props.seen? "msg-text-seen" : "msg-text"}>
                    <p>{props.note}</p>
                </div>
                </div>
    </div>
    )
}

export default Message