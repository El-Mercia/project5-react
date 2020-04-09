
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { formatDate} from '../utils/date';

import Container from 'react-bootstrap/Container';
import CardDeck from 'react-bootstrap/CardDeck';
import Card      from 'react-bootstrap/Card';

const Home = () => {
    const [ articles, setArticles ] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/api/articles')
        .then((result) => {
            return result.json();
        })
        .then(({ status, articles}) => {
            if (status === "OK") {
                setArticles(articles);
            } else {
                console.log("error : ", status);
            }
        })

        .catch((error) => {
            console.log("error : ", error);
        });
    }, []);

    const renderedArticles = articles.map((article) => {
        console.log(article)
        const {id, title, content, created_at, authorFirstname, authorLastname} = article;
        return ( 
            <Card key={id}>
                <Card.Header>
                    <Card.Title as= "h5">
                        <Link to={"/article/" + id}>{title}</Link>
                    </Card.Title>
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

const [ comments, setComments ] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/api/comments')
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
    }, []);

    const renderedComments = comments.map((comment) => {
        console.log(comment)
        const {id, article_id, content, created_at, authorFirstname, authorLastname} = comment;
        return ( 
            <Card key={id}>
                <Card.Header>
                    <Card.Title as= "h5">
                        <Link to={"/comment/" + id}>{article_id}</Link>
                    </Card.Title>
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
            <h1>Home Page</h1>
            <h2>Last articles</h2>
            <CardDeck>
                {renderedArticles}
            </CardDeck>
        <br />         
            <h2>Last comments</h2>
            <CardDeck>
                {renderedComments}
            </CardDeck>
         </Container>
    );
};

export default Home;