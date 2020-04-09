import React, { useState, useEffect } from 'react';
import {formatDate}                   from '../utils/date';
import Container                      from 'react-bootstrap/Container';
import { toast } from 'react-toastify';


const ViewComment = ({ match }) => {
    const {id } = match.params;
    console.log(id);

    const [ comment, setComment ] = useState({});

    useEffect(() => {
        fetch('http://localhost:3001/api/Comment?id=' + id)
            .then((result) => {
                return result.json();
            })
            .then (({ status, comment }) => {
                if (status === "OK") {
                setComment(comment);
            } else {
                toast.error("Oups... error");
            }
        })
            .catch((error) => {
                toast.error("Oups... error");
                console.log(error);
            })
    }, [ id ])

    return (
        <Container>
            <h1>{comment.article_id}</h1>
            <p>
                {comment.content}
            </p>
            <p>
                posted at {formatDate(new Date())}<br />
                by {comment.authorFirstname} {comment.authorLastname}
            </p>
        </Container>
    );
};

export default ViewArticle;