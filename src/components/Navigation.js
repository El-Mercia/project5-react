import React from 'react';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';

const Navigation = () => {
    return (
        <Nav>
            <Nav.Item>
                <Nav.Link as={Link}  to="/">
                    Home
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to="/articles/create">
                    Create article
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to="/articles/delete">
                    Delete article
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to="/comments/create">
                    Create Comment
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to="/comments/delete">
                    Delete Comment
                </Nav.Link>
            </Nav.Item>
        </Nav>
    );
}

export default Navigation;