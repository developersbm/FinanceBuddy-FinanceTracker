import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        list-style: none;
    }
    
    body {
        font-family: 'Nunito', system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;
        margin: 0; 
        padding: 0;
        min-height: 100vh;
    }

    html, body, #root {
        height: 100%;
    }

    a {
        color: inherit;
    }
`;
