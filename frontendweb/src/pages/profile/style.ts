import styled from "styled-components";

export const Container = styled.div``;
export const Header = styled.div`
    div {
        max-width: 1100px;
        margin: 0 auto;
        display: flex;
        align-items: center;
        height: 12rem;

        a {
            text-decoration: none;
            svg {
                font-size: 2rem;
                color: #fff;
            }
        }
    }
    background-color: #28262e;
`;

export const ProfileContainer = styled.div`
    max-width: 110rem;
    margin: 0 auto;

    div {
        display: flex;
        justify-content: center;
    }
`;

export const ProfileComponent = styled.div`
    margin-top: -12rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 36rem;

    h1 {
        align-self: flex-start;
        font-size: 1.8rem;
        font-weight: 400;
    }

    form {
        width: 100%;
        input {
            padding: 12px;
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
            width: 100%;
            background-color: #ff9000;
            height: 50px;
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
    }
`;

export const ProfileImage = styled.div`
    position: relative;
    width: 18.6rem;

    img {
        width: 18rem;
        border-radius: 50%;
        margin: 2rem 0;
    }

    label {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        right: 5%;
        bottom: 5%;
        background-color: #ff9000;
        width: 5rem;
        height: 5rem;
        border-radius: 50%;
        border-style: none;
        transition: 0.2s;

        svg {
            color: #312e38;
            font-size: 2rem;
        }

        &:hover {
            background-color: #cc7300;
        }

        input {
            display: none;
        }
    }
`;
