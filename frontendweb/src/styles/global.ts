import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    font-size: 62.5%;
}

body {
    background-color: #312e38;
    color: #fff;
    }

h1, h2, h3, h4, p, strong,input {
    cursor: pointer;
}

body,input,button {
    font-family: 'Roboto Slab', serif;}
    color: #fff;

`;
