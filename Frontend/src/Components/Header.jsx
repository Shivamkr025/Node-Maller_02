import { Navbar, Container } from "react-bootstrap";

export default function Header() {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container fluid className="mx-2">
                <Navbar.Brand>📧 MailSender</Navbar.Brand>
                <a
                    href="https://www.youtube.com/watch?v=hXiPshHn9Pw&t=4s"
                    target="_blank"
                    className="text-white">
                    App Password
                </a>
            </Container>
        </Navbar>
    );
};
