import { Container } from 'react-bootstrap';
export default function Error() {
    return (
        <Container style={{display: "flex", flexDirection: "column", marginTop: "4rem"}}>
            <h1 style={{textAlign: "center"}}>Uhhhhh... Try looking somewhere else?</h1>
            <h5 style={{textAlign: "center"}}>This page doesn't exist!</h5>
        </Container>
    )
}
