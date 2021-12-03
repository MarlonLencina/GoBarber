import styled from "styled-components";

export const Container = styled.div`
position: relative;

span {
    width: 160px;
    left: 50%;
    transform: translateX(-50%);
    color: #312e38;
    bottom: calc(100% + 12px);
    background-color: #ff9000;
    padding: 1rem;
    border-radius: .5rem;
    position: absolute;
    opacity: 0;
     font-weight: 500;
     transition: opacity .4s;
     visibility: hidden;

    &:before {
      content: '';
       border-style: solid;
       border-color: #ff9000 transparent;
       border-width: 6px 6px 0 6px;
       top: 100%;
       position: absolute;
       left: 50%;

    }

}

&:hover span {
       opacity: 1;
       visibility: visible;

    }

`
