import React, { useState} from 'react';
import { toast } from 'react-toastify';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


const DeleteComment = () => {
    const  [ id, setId] = useState("");

    const handleSubmit = (event ) => {
        event.preventDefault();

        fetch('http://localhost:3001/api/comments/delete', {
            method : "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify ({
                id,
            }),
        })
        .then((result) => {
            return result.json();
        })
        .then(({ status, extra }) => {
           if (status === "OK") {
                setId("");
                toast.success("Comments has been successfully added");   
           } else {
               toast.error(
                <div>
                    Oups... error <br />
                    {extra}
                </div>
               );
           }
        
        })
        .catch((error) => {
            toast.error("Oups... error");
        });
        };

    const  handleChange = (event) => {
        switch (event.target.name) {
            case "id":
                setId(event.target.value);
                break;
            // no default
        }
    }

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="comment.id">
                    <Form.Label>DELETE YOUR COMMENTS</Form.Label>
                    <Form.Control
                        type="number"
                        name="id"
                        onChange={handleChange}
                        value={id}
                        placeholder="id Comment to delete"
                    />
                </Form.Group>
                <Button type="submit">Delete Comment</Button>
            </Form>
        </Container>
    );
}

export default DeleteComment;