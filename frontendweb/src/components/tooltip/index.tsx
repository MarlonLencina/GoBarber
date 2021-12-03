import React from "react";

import { Container } from "./style";

interface tooltipProps {
    title: string;
    className?: string;
}

const tooltip: React.FC<tooltipProps> = ({title,className, children}) => {
    return (
        <Container className={className}>
            {children}
            <span>{title}</span>
        </Container>
    )
}

export default tooltip
