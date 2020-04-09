import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


const CreateComment = () => {
    const [ article_id, setArticle_id ] = useState("");
    const [ author, setAuthor ]   = useState(""); 
    const [ content, setContent ]     = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        fetch('http://localhost:3001/api/comments/create', {
            method : "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify ({
                article_id,
                author,
                content,
            }),
        })
        .then((result) => {
            return result.json();
        })
        .then(({ status, extra }) => {
           if (status === "OK") {
                setArticle_id("");
                setAuthor("");
                setContent("");
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

    const handleChange = (event) => {

        /*if (event.target.name === "article_id") {
            setArticle_id(event.target.value);
        } else if (event.target.value === "content") { 
            setContent(event.target.value);
        } else {
            setAuthor_id(event.target.value);
        }
        */ 

        switch(event.target.name) {    
            case "article_id":
                setArticle_id(event.target.value);
                break;  
            case "author":
                setAuthor(event.target.value);
                break;  
            case "content":
                setContent(event.target.value);
                break;
            // no default

        }
    }

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
            <Form.Group controlId="comment.article_id">
                    <Form.Label>ARTICLE ID</Form.Label>
                    <Form.Control
                        type="number"
                        name="article_id"
                        onChange={handleChange}
                        value={article_id}
                        placeholder="Id of your article"
                />
                </Form.Group> 
                <Form.Group controlId="comment.author">
                    <Form.Label>AUTHOR ID</Form.Label>
                    <Form.Control
                        type="number"
                        name="author"
                        onChange={handleChange}
                        value={author}
                        placeholder="Author id"
                    />
                </Form.Group>
                <Form.Group controlId="comment.content">
                    <Form.Label>CONTENT</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="content"
                        onChange={handleChange}
                        value={content}
                        placeholder="Contents of your comments"
                    />
                </Form.Group>
                <Button variant="primary" type="submit">Create Comments</Button>
            
            </Form>
       </Container>
    )
};

export default CreateComment;