import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        list-style: none;
    }
    
    body {
        font-family: 'Inter', sans-serif;
        background: linear-gradient(to bottom right, lightgreen, lightblue);
        margin: 0; 
        padding: 0;
    }
`;
