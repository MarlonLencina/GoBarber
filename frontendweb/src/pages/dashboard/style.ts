import { shade } from "polished";
import styled from "styled-components";

export const Container = styled.div``;
export const Header = styled.header`
    background-color: #28262e;
`;

export const HeaderContent = styled.header`
    max-width: 1100px;
    margin: 0 auto;
    padding: 2rem 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    button {
        background-color: transparent;
        border-style: none;
        cursor: pointer;
    }
`;
export const Profile = styled.div`
    display: flex;
    align-items: center;
    > img {
        width: 10rem;
    }

    > div {
        margin-left: 6rem;
        display: flex;
        align-items: center;

        img {
            width: 5rem;
            border-radius: 50%;
        }

        div {
            margin-left: 1rem;
            display: flex;
            align-items: flex-start;
            flex-direction: column;

            strong {
                font-weight: 400;
                color: #999591;
                font-size: 1.4rem;
            }

            a {
                text-decoration: none;
            }

            p {
                color: #ff9000;
                font-size: 1.4rem;
                font-weight: 500;
            }
        }
    }
`;

export const Content = styled.main`
    max-width: 110rem;
    margin: 6rem auto;
    display: flex;
`;
export const Appointments = styled.section`
    flex: 1;

    h1 {
        font-weight: 400;
        font-size: 3rem;
    }
`;
export const DateComponent = styled.div`
    display: flex;

    p {
        color: #fc9000;
        font-size: 1.3rem;
        display: flex;
        align-items: center;

        span {
            display: flex;
            align-items: center;
            margin-right: 1rem;
        }

        span + span::before {
            margin-right: 1rem;
            display: flex;
            content: "";
            height: 15px;
            width: 1.5px;
            background-color: #fc9000;
        }
    }
`;
export const Calendar = styled.div`
    width: 38rem;
    margin-left: 5rem;
    .DayPicker {
        background: #28262e;
        border-radius: 10px;
    }
    .DayPicker-wrapper {
        padding-bottom: 0;
    }
    .DayPicker,
    .DayPicker-Month {
        width: 100%;
    }
    .DayPicker-Month {
        border-collapse: separate;
        border-spacing: 8px;
        margin: 16px;
    }
    .DayPicker-Day {
        width: 40px;
        height: 40px;
    }
    .DayPicker-Day--available:not(.DayPicker-Day--outside) {
        background: #3e3b47;
        border-radius: 10px;
        color: #fff;
    }

    .DayPicker-Day--today {
        font-weight: normal;
    }
    .DayPicker-Day--disabled {
        color: #666360 !important;
        background: transparent !important;
    }
    .DayPicker-Day--selected {
        background: #ff9000 !important;
        border-radius: 10px;
        color: #232129 !important;
    }

    .DayPicker:not(.DayPicker--interactionDisabled)
        .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
        background: ${shade(0.2, "#3e3b47")};
    }
`;

export const NextAppointment = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 4rem;

    h2 {
        font-weight: 400;
        color: #999591;
        font-size: 1.8rem;
    }

    > div {
        display: flex;
        align-items: center;
        margin: 2rem 0;
        background-color: #3e3b47;
        padding: 2rem;
        border-radius: 1rem;
        position: relative;
        img {
            width: 7rem;
            border-radius: 50%;
        }

        p {
            font-weight: 400;
            color: #fff;
            font-size: 2rem;
            margin-left: 2rem;
        }

        &::before {
            content: "";
            width: 0.2rem;
            height: 80%;
            position: absolute;
            left: 0;
            top: 10%;
            background-color: #fc9000;
        }

        div {
            display: flex;
            margin-left: auto;
            align-items: center;

            svg {
                color: #fc9000;
                font-size: 2rem;
            }

            p {
                color: #999591;
            }
        }
    }
`;

export const Section = styled.div`
    p {
        margin: 2rem 0;
        font-size: 2rem;
        color: #999591;
    }

    > span {
        font-size: 1.3rem;
    }

    div + div {
        margin-top: 1.5rem;
    }
`;

export const Appointment = styled.div`
    display: flex;
    align-items: center;

    svg {
        color: #fc9000;
        font-size: 2rem;
        margin-right: 0.5rem;
    }

    p {
        margin-right: 2rem;
        font-size: 1.5rem;
        color: #fff;
    }

    img {
        width: 5.6rem;
        border-radius: 50%;
    }

    div {
        flex: 1;
        display: flex;
        align-items: center;
        background-color: #3e3b47;
        padding: 2rem;
        border-radius: 1rem;

        p {
            font-size: 1.8rem;
            margin-left: 2rem;
        }
    }
`;
