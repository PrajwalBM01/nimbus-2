'use client';

import { useChat } from '@ai-sdk/react';
import { useTheme } from 'next-themes';
import Markdown from 'react-markdown';

export default function Chat() {
    const { messages, input, handleInputChange, handleSubmit } = useChat();
    const { theme } = useTheme();
  return (
    <div className='h-full w-full overflow-auto relative'>
        <div className={`flex flex-col w-full max-w-3xl pb-24 mt-20 mx-auto stretch rounded-2xl pt-4 ${theme=="dynamic" && 'backdrop-blur-sm shadow-md backdrop-brightness-95'}`}>
        {messages.map(message => (
            <div key={message.id} className={`${message.role === "user" && 'flex justify-end items-end text-end'} whitespace-pre-wrap px-4`}>
                <div>
                    {message.role === 'user' ? 'User: ' : 'AI: '}
                    {message.parts.map((part, i) => {
                    switch (part.type) {
                        case 'text':
                        return <Markdown key={`${message.id}-${i}`}>{part.text}</Markdown>;
                    }
                    })}
                </div>
            </div>
        ))}
        </div> 
        <div className='fixed bottom-0 w-full left-0 right-0'>
                <div className='flex justify-center items-center mb-8'>
                    <form onSubmit={handleSubmit}>
                        <textarea
                            className={`${theme==="dynamic" && 'text-black  backdrop-brightness-95'} border border-borderColor resize-none w-2xl field-sizing-content p-2  bg-backBackground rounded-2xl backdrop-blur-md shadow-md focus:outline-none`} 
                            value={input}
                            placeholder="Say something..."
                            onChange={handleInputChange}
                            onKeyDown={e => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSubmit(e);
                                }
                            }}/>
                    </form>
                </div>
            </div>
    </div>
  );
}