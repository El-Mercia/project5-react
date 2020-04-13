import React, { useState, useEffect } from 'react';
import { Link }                       from 'react-router-dom';
import { formatDate }                 from '../utils/date';
import Container                      from 'react-bootstrap/Container';
import CardDeck                       from 'react-bootstrap/CardDeck';
import Card                           from 'react-bootstrap/Card';
import ViewComment                    from '../components/ViewComment';

const Home = () => {
    const [ articles, setArticles ] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/api/articles')
        .then((result) => {
            return result.json();
        })
        .then(({ status, articles }) => {
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
        const { id, title, content, created_at, authorFirstname, authorLastname } = article;
        return (
            <Card key={id}>
                <Card.Header>
                    <Card.Title as="h5">
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
                        created at&nbsp;
                        {formatDate(created_at)}&nbsp;
                        by&nbsp;{authorFirstname}&nbsp;{authorLastname.substring(0, 1)}.
                    </small>
                </Card.Footer>
            </Card>
        );
    });

    return (
        <Container>
            <h1>Home</h1>
            <h2>Last Articles</h2>
            <CardDeck>
                {renderedArticles}
                <ViewComment content /> 
            </CardDeck>
        </Container>
    );
};

export default Home;