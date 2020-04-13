import React, { useState, useEffect } from 'react';
import { formatDate}                  from '../utils/date';
import Container                      from 'react-bootstrap/Container';
import CardDeck                       from 'react-bootstrap/CardDeck';
import Card                           from 'react-bootstrap/Card';

const ViewComment = ({ article_id }) => { 
const [ comments, setComments ] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/api/comments?id=' + article_id)
        .then((result) => {
            return result.json();
        })
        .then(({ status, comments}) => {
            if (status === "OK") {
                setComments(comments);
            } else {
                console.log("error : ", status);
            }
        })

        .catch((error) => {
            console.log("error : ", error);
        });
    }, [ article_id ]);

    const renderedComments = comments.map((comment) => {
        console.log(comment)
        const {article_id, content, created_at, authorFirstname, authorLastname} = comment;
        return ( 
            <Card key={article_id}>
                <Card.Header>
                    
                </Card.Header>
                <Card.Body>
                    <Card.Text>
                        {content}
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    <small className="text-muted">
                        Created on&nbsp;
                        {formatDate(created_at)}&nbsp;
                        by&nbsp;{authorFirstname} {authorLastname.substring(0, 1)}.
                    </small>
                </Card.Footer>    
            </Card>
        );
    });

    return (
        <Container>          
            <h2>Last Comments</h2>
            <CardDeck>
                {renderedComments}
            </CardDeck>
         </Container>
    );
};

export default ViewComment;
