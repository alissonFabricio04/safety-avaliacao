import styled from "styled-components";

export const Container = styled.div`
    padding: 2rem;
    padding-left: 4rem;
    padding-right: 4rem;

    position: relative;
    max-width: 600px;
    width: 95%;
    height: 65rem;

    background: #fff;
    
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.26);
    border-radius: 25px;
    border: 0;

    margin: auto;
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;

    div {
        margin-bottom: 0!important;
    }

    @media (max-width: 800px) {
        padding: 2rem;
        padding-left: 3rem;
        padding-right: 3rem;
    }

    input {
        border-radius: 20px;

        padding: 0.5rem;
        padding-left: 1rem;

        font-size: 1rem;
    }

    button {
        margin-top: 10px;
    }

    .error, .danger {
        color: red;
        margin-bottom: -1rem;
    }

    .success {
        color: green;
    }
`