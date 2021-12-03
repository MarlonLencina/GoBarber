import React from "react";
import { FiAlertCircle, FiXCircle } from "react-icons/fi";

import { toastMessages, useToast } from "../../hooks/toastContext";
import { Container } from "./style";
import Toast from "./toast";

interface toastContainerProps {
    messages: toastMessages[];
}

// import { Container } from './styles';

const ToastContainer: React.FC<toastContainerProps> = ({ messages }) => {
    return (
        <Container>
            {messages.map((message) => (
                <Toast key={message.id} message={message} />
            ))}
        </Container>
    );
};

export default ToastContainer;
