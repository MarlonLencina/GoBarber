import styled, { css } from "styled-components";

import tooltip from "../tooltip"

interface ContainerProps {
    isfocused: boolean;
    isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
    padding: 5px 10px;
    width: 100%;
    background: #232129;
    border-radius: 10px;
    border: 2px solid #232129;
    border-style: none;
    outline: 0;
    color: black;
    margin-top: 10px;
    display: flex;
    align-items: center;
    transition: .2s;

    p {
        color: #fff;
    }


    svg {
        color: #383542;
    }

    ${(props) =>
     props.isErrored &&
     css`
        border:2px solid #c53030;
     `}

    ${(props) =>
     props.isfocused &&
     css`
     border: 2px solid #ff9000;
     svg, input {
        color: #ff9000;
     }
     `}

     span {
         background-color: #c53030;
         color: #fff;

         &::before {
             border-color: #c53030 transparent;
         }

     }

`;

export const Error = styled(tooltip)`

`
