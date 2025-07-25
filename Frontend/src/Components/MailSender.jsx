import { useState, useEffect, useRef } from "react";
import { Form, Button, Card, Container, Row, Col, InputGroup, Spinner } from "react-bootstrap";
import { Envelope, Lock, FileEarmarkText } from "react-bootstrap-icons";
import { socket } from "../utils/Socket";

export default function MailSender() {
    const [formData, setFormData] = useState({
        email: "",
        appPassword: "",
        hrEmails: "",
        subject: "",
        body: "",
        file: null
    });
    const [mailLogs, setMailLogs] = useState([]);
    const [loading, setLoading] = useState(false); // Loader state
    const logContainerRef = useRef(null); // Ref for auto-scrolling

    useEffect(() => {
        socket.on("emailLog", (log) => {
            setMailLogs((prevLogs) => [
                ...prevLogs, `${log.status} to: ${log.recipient} at ${new Date(log.time).toLocaleString()}`
            ]);
        });

        return () => socket.off("emailLog");
    }, []);

    useEffect(() => {
        if (logContainerRef.current) {
            logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
        }
    }, [mailLogs]); // Auto-scrolls when logs update

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFormData((prev) => ({ ...prev, file: e.target.files[0] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const logList = document.querySelector('.list-group');
        if (logList) logList.innerHTML = '';

        setLoading(true); // Start loading

        const formDataToSend = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (value) formDataToSend.append(key, value);
        });

        await fetch("https://mailsender-backend-44fo.onrender.com/api/emails/send", {
            method: "POST",
            body: formDataToSend,
        });

        setLoading(false); // Stop loading after sending emails
    };

    return (
        <Container fluid className="min-vh-100 my-4">
            <Row className="justify-content-center px-2">
                {/* form section */}
                <Col lg={6} className="mb-lg-0 mb-4">
                    <Card className="form-container">
                        <Card.Header
                            className="text-center text-white"
                            style={{ background: "linear-gradient(45deg, #007bff, #6610f2)" }}
                        >
                            <h4 className="mb-0">📧 Send Emails to HR</h4>
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Email <span><i class="bi bi-asterisk text-danger"></i></span></Form.Label>
                                    <InputGroup>
                                        <InputGroup.Text><Envelope /></InputGroup.Text>
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            placeholder="Your Email"
                                            onChange={handleChange}
                                            required
                                            className="custom-input"
                                        />
                                    </InputGroup>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>App Password <span><i class="bi bi-asterisk text-danger"></i></span></Form.Label>
                                    <InputGroup>
                                        <InputGroup.Text><Lock /></InputGroup.Text>
                                        <Form.Control
                                            type="password"
                                            name="appPassword"
                                            placeholder="App Password"
                                            onChange={handleChange}
                                            required
                                            className="custom-input"
                                        />
                                    </InputGroup>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>HR Emails <span><i class="bi bi-asterisk text-danger"></i></span></Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        name="hrEmails"
                                        rows={4}
                                        placeholder="HR Emails (comma-separated)"
                                        onChange={handleChange}
                                        required
                                        className="custom-input"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Subject <span><i class="bi bi-asterisk text-danger"></i></span></Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="subject"
                                        placeholder="Subject"
                                        onChange={handleChange}
                                        required
                                        className="custom-input"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Body <span><i class="bi bi-asterisk text-danger"></i></span></Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        name="body"
                                        placeholder="Message Body"
                                        rows={4}
                                        onChange={handleChange}
                                        required
                                        className="custom-input"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Attach File <span><i class="bi bi-asterisk text-danger"></i></span></Form.Label>
                                    <InputGroup>
                                        <InputGroup.Text><FileEarmarkText /></InputGroup.Text>
                                        <Form.Control
                                            type="file"
                                            name="file"
                                            onChange={handleFileChange}
                                            className="custom-input"
                                        />
                                    </InputGroup>
                                </Form.Group>

                                {/* Submit Button with Loader */}
                                <Button type="submit" className="w-100 send-btn" disabled={loading}>
                                    {loading ? (
                                        <>
                                            <Spinner animation="border" size="sm" className="me-2" />
                                            Sending...
                                        </>
                                    ) : (
                                        "📩 Send Email"
                                    )}
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Log Mail Responses Section */}
                <Col lg={6}>
                    <Card className="log-container">
                        <Card.Header className="text-center text-white bg-secondary">
                            <h4 className="mb-0">📜 Log Mail Responses</h4>
                        </Card.Header>
                        <Card.Body ref={logContainerRef} style={{ maxHeight: "877px", overflowY: "auto" }}>
                            {mailLogs.length > 0 ? (
                                <ul className="list-group">
                                    {mailLogs.map((log, index) => (
                                        <li key={index} className="list-group-item">{log}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-muted text-center">No emails sent yet.</p>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};
