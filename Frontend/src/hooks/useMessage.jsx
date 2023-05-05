import { useEffect, useRef,  useState } from "react";
import { useSelector } from "react-redux";

export default function useMessage({ currentChat }) {
    const scrollRef = useRef();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    const token = useSelector((state) => state.token);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const response = await fetch(
        `${import.meta.env.VITE_NODE_API_URL}/messages`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            conversationId: currentChat.id,
            senderId: currentChat.senderId,
            messageContent: newMessage,
          }),
        }
      );
  
      const result = await response.json();
  
      setMessages([...messages, result]);
    };
  
    const handleKeyEnter = (e) => {
      if (e.code === "Enter" || e.code === "NumpadEnter") {
        return handleSubmit(e);
      }
    };
  
    useEffect(() => {
      scrollRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }, [messages]);
  
    const getAllMessages = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_NODE_API_URL}/messages/${currentChat?.id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      const data = await response.json();
      setMessages(data);
    };
    useEffect(() => {
      getAllMessages();
    }, [currentChat]);

    return { scrollRef, messages, newMessage, setNewMessage, getAllMessages, setMessages, handleKeyEnter, handleSubmit }
}
