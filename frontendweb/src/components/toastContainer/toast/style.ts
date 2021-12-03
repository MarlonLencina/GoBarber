import styled, { css } from "styled-components";
import { animated } from "react-spring"

interface ToastProperties {
    type?: "success" | "error" | "info";
    hasDescription: boolean;
}

const toatsTypeVariations = {
    info: css`
        background: #ebf8ff;
        color: #3172b7;
    `,
    success: css`
        background: #e6fffa;
        color: #2e656e;
    `,
    error: css`
        background: #fddede;
        color: #c53030;
    `,
};

export const Container = styled(animated.div)<ToastProperties>`
    width: 36rem;
    position: relative;
    padding: 1.6rem 3rem 1.6rem 1.6rem;
    border-radius: 1rem;
    box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.2);

    display: flex;
    background-color: #ebf8ff;
    color: #3172b7;

    & + div {
        margin-top: 5px;
    }

    > svg {
        margin: 4px 12px 0 0;
    }

    div {
        flex: 1;

        p {
            margin-top: 5px;
            font-size: 14px;
            opacity: 0.8;
            line-height: 20px;
        }
    }

    button {
        position: absolute;
        right: 16px;
        top: 19px;
        border: 0;
        background: transparent;
        color: inherit;
    }

    ${(props) => toatsTypeVariations[props.type || "info"]}
    ${(props) =>
        !props.hasDescription &&
        css`
            align-items: center;
            margin-top: 0;
        `}
`;
