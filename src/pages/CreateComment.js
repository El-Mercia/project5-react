import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


const CreateComment = () => {
    const [ content, setContent ]     = useState("");
    const [ authorId, setAuthorId ]   = useState("");
    const [ articleId, setArticleId ] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        fetch('http://localhost:3001/api/comments/create', {
            method : "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify ({
                content,
                authorId,
                articleId,
            }),
        })
        .then((result) => {
            return result.json();
        })
        .then(({ status, extra }) => {
           if (status === "OK") {
                setContent("");
                setAuthorId("");
                setArticleId("");
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
            case "content":
                setContent(event.target.value);
                break;
            case "author_id":
                setAuthorId(event.target.value);
                break;
            case "articleId":
                setArticleId(event.target.value);
                break;    
            // no default

        }
    }

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
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
                <Form.Group controlId="comment.authorId">
                    <Form.Label>AUTHOR ID</Form.Label>
                    <Form.Control
                        type="number"
                        name="authorId"
                        onChange={handleChange}
                        value={authorId}
                        placeholder="Author id"
                    />
                </Form.Group>
                <Form.Group controlId="comment.articleId">
                    <Form.Label>ARTICLE ID</Form.Label>
                    <Form.Control
                        type="number"
                        name="articleId"
                        onChange={handleChange}
                        value={articleId}
                        placeholder="Id of your article"
                />
                </Form.Group>
                <Button variant="primary" type="submit">Create Comments</Button>
            
            </Form>
       </Container>
    )
};

export default CreateComment;