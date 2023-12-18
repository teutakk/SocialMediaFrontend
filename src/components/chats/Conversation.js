import React, { useEffect, useState } from 'react'
import { getUser } from '../../api/UserRequests'
import classes from "./Conversation.module.css"

const Conversation = ({data, currentUserId, online}) => {

    const [userData, setUserData] = useState(null)

    useEffect(() => {
        const userId = data.members.find((id) => id !==currentUserId)
        const getUserData = async () =>{
            try {
                const {data} = await getUser(userId)
                setUserData(data)
            } catch (error) {
                console.error("Error fetching user data:", error.response);
            }
        }
        getUserData();
    }, [])
  return (
    <>
    <div className={classes["friends-conversation"]}>
        <div>
        {online && <div className={classes["online-dot"]}></div>} 
                <img src={userData?.profilePicture} alt='' width={"60px"} height={"60px"} style={{"borderRadius": "50%"}}/>
                <div className='username' style={{fontSize: "1rem", fontWeight: "700", display: "flex", flexDirection: "column", marginLeft: "5rem", marginTop: "-3rem"}}>
                    <span style={{color: "#393939"}}>{userData?.firstName} {userData?.lastName}</span>
                    <span style={{color: "#b7b6b7", fontSize: "0.7rem"}}>{online? "Online": "Offline"}</span>
                </div>
        </div>
    </div>
    <hr style={{marginTop:"10px", width:"85%", border: "0.1px solid #ececec", marginLeft: "15px"}}/>
    </>
  )
}

export default Conversation