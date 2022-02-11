import styled from "styled-components"

export function HeaderForm() {
    return(
        <Container>
            <a href="https://safetyprojetos.com.br/">
                <img src="https://safetyprojetos.com.br/wp-content/uploads/2020/10/LOGO.png" alt="Logo" />
            </a>
        </Container>
    )
}

const Container = styled.div`
    text-align: center;

    img {
        margin-top: 1rem;
        margin-bottom: 2rem;
    }
`