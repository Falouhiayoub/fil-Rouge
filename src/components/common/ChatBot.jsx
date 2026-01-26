import { useState, useEffect, useRef } from "react";
import {getAIResponse} from '../../services/chatbotService'
import '../../styles/ChatBot.css'

import React from 'react'

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [message, setMessage] = useState([
        {role: 'ai', text: 'Hello! I am your Fashion Fuel assistant. How can I help you today?'}
    ])
    const [input, setInput] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const messageEndRef = useRef(null)

    const scrollToBottom = () => {
        messageEndRef.current?.scrollIntoView({ behavior: 'smooth'})
    }

    useEffect(() => {
        scrollToBottom()
    }, [message, isTyping])

    const handleSend = async () => {
        if(!input.trim()) return

        const userMessage = { role: 'user', text: input}
        setMessage(prev => [...prev, userMessage])
        setInput('')
        setIsTyping(true)

        const aiResText = await getAIResponse(input)
        setMessage(prev => [...prev, { role: 'ai', text: aiResText}])
        setIsTyping(false)
    }

    const handleKeyPress = (e) => {
        if(e.key === 'Enter') {
            handleSend()
        }
    } 



return (
    <div className="chatbot-container">
        {!isOpen && (
            <button className="chatbot-toggle" onClick={() => setIsOpen(true)}>
                <span>💬</span>
            </button>
        )}

        {isOpen && (
            <div className="chatbot-window">
                <div className="chatbot-header">
                    <h3>Fashion AI Fuel</h3>
                    <button className="cahtbot-close" onClick={() => setIsOpen(false)}>✕</button>
                </div>

                <div className="chatbot-messages">
                    {message.map((msg, index) => (
                        <div key={index} className={`message ${msg.role}`}>
                            {msg.text}
                        </div>
                    ))}
                    {isTyping && <div className="typing-indicator ai">AI is Thinking....</div>}
                    <div ref={messageEndRef}/>
                </div>

                <div className="chatbot-input-area">
                    <input type="text"
                        placeholder="Ask Me Anything..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        disabled= {isTyping}
                    />
                    <button onClick={handleSend} disabled = {isTyping || !input.trim()}>
                        ➤
                    </button>
                </div>
            </div>
        )}
    </div>
)
}

export default ChatBot  