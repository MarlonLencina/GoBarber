import React, { createContext, useContext, useCallback, useState } from "react";
import { uuid } from "uuidv4";

import ToastContainer from "../components/toastContainer";

export interface toastMessages {
    id: string;
    type: "success" | "error" | "info";
    title: string;
    description?: string;
}

interface toastContextData {
    addToast(messages: Omit<toastMessages, "id">): void;
    removeToast(id: string): void;
}

const ToastContext = createContext<toastContextData>({} as toastContextData);

// import { Container } from './styles';

const ToastProvider: React.FC = ({ children }) => {
    const [messages, setMessages] = useState<toastMessages[]>([]);
    const addToast = ({
        type,
        title,
        description,
    }: Omit<toastMessages, "id">) => {
        const id = uuid();
        const toast = {
            id,
            type,
            title,
            description,
        };

        setMessages((messages) => [...messages, toast]);
    };
    const removeToast = (id: string) => {
        setMessages((messages) =>
            messages.filter((message) => message.id !== id)
        );
    };

    return (
        <ToastContext.Provider value={{ addToast, removeToast }}>
            {children}
            <ToastContainer messages={messages} />
        </ToastContext.Provider>
    );
};

function useToast(): toastContextData {
    const context = useContext(ToastContext);

    if (!context) {
        throw new Error("use toats must be used within a toastprovider");
    }

    return context;
}

export { ToastProvider, useToast };
