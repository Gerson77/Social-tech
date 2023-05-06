import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function useChat({ senderId, receiverId, c }){
    const user = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const [conversation, setConversation] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [friend, setFriend] = useState([]);
  
    const handleConversation = async (senderId, receiverId) => {
      // const response = await fetch(
      //   `${import.meta.env.VITE_NODE_API_URL}/conversation`,
      //   {
      //     method: "POST",
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({
      //       senderId: senderId,
      //       receiverId: receiverId,
      //     }),
      //   }
      // );
  
      // const result = await response.json();
  
      // await getAllConversation(user.id);
  
      const result = {
        id: '64549e-ID-FAKE-4dd2970000',
        senderId: senderId,
        receiverId: receiverId,
        members: [senderId, receiverId]
      }
  
      const conversationExists = conversation.find((conver) => conver.receiverId === receiverId)
  
      if(!conversationExists) {
        setConversation([...conversation, result]);
        
        await getByOneUser(result)
      } else {
        await getByOneUser(result)
        await getAllConversation(user.id);
      }
  
      console.log(currentChat)
    };
  
    const getByOneUser = async (c) => {
      const response = await fetch(
        `${import.meta.env.VITE_NODE_API_URL}/users/${c.receiverId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      const data = await response.json();
      setCurrentChat(c);
      setFriend(data);
      // await getAllConversation(user.id);
    };
  
    const getAllConversation = async (idUser) => {
      const response = await fetch(
        `${import.meta.env.VITE_NODE_API_URL}/conversation/${idUser}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      const data = await response.json();
  
      setConversation(data);
    };
    useEffect(() => {
      getAllConversation(user.id);
    }, [user.id]);

    return { setConversation, getAllConversation, setFriend, getByOneUser, conversation, currentChat, friend, handleConversation }
}