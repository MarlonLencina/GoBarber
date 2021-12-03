import React, { useEffect } from "react";
import { FiAlertCircle, FiXCircle } from "react-icons/fi";

import { toastMessages, useToast } from "../../../hooks/toastContext";
import { Container } from "./style";

// import { Container } from './styles';

interface toastProps {
    message: toastMessages;
}

const Toast: React.FC<toastProps> = ({ message }) => {
    const { removeToast } = useToast();

    useEffect(() => {
        const timer = setTimeout(() => {
            removeToast(message.id);
        }, 3000);

        return () => {
            clearTimeout(timer);
        };
    }, [removeToast, message]);

    return (
        <Container type={message.type} hasDescription={!!message.description}>
            <FiAlertCircle size={20} />
            <div>
                <strong>{message.title}</strong>
                {message.description && <p>{message.description}</p>}
            </div>

            <button onClick={() => removeToast(message.id)} type="button">
                <FiXCircle size={18} />
            </button>
        </Container>
    );
};

export default Toast;
