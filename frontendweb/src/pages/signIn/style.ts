import styled, { keyframes } from "styled-components";

import SignInBackground from "../../styles/img/sign-in-background.png";

export const Container = styled.div`
    height: 100vh;
    display: flex;
    align-items: stretch;
`;

export const Background = styled.div`
    flex: 1;
    background: url(${SignInBackground}) no-repeat center;
    background-size: cover;
`;

export const Content = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 600px;
`;

const appearFromLeft = keyframes`
from {
   opacity: 0;
   transform: translateX(-50px)
}
to {
   opacity: 1;
   transform: translateX(0px)
}
`;

export const AnimationContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    animation: ${appearFromLeft} 1s;

    img {
        width: 200px;
    }

    > a {
        display: flex;
        align-items: center;
        text-decoration: none;
        color: white;
        font-size: 16px;

        p {
            margin-left: 5px;
        }
    }

    form {
        display: flex;
        flex-direction: column;
        margin: 80px 0;
        width: 340px;
        text-align: center;

        h1 {
            margin-bottom: 24px;
            font-weight: 500;
        }

        input {
            padding: 16px;
            width: 100%;
            background: #232129;
            border-radius: 10px;
            border: 2px solid #232129;
            border-style: none;
            outline: 0;
            color: #f4ede8;

            & + input {
                margin-top: 10px;
            }
        }

        button {
            background-color: #ff9000;
            height: 56px;
            border-radius: 10px;
            border-style: none;
            padding: 0 16px;
            color: #312e38;
            font-weight: 500;
            margin-top: 16px;
            transition: 0.2s;
            cursor: pointer;

            &:hover {
                background: #cc7300;
            }
        }

        a {
            color: #f4ede8;
            text-decoration: none;
            margin-top: 10px;
            font-size: 16px;
        }
    }
`;
