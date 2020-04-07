import React, { useState, useEffect } from 'react';

import Container from 'react-bootstrap/Container';
import CardGroup from 'react-bootstrap/CardGroup';
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
        const date = new Date(article.created_at)
        return ( // {id: 1, authorFirstname: "", authorLastname: "", created_at: ""}
            <Card>
                <Card.Body>
                    <Card.Title as= "h5">
                        {article.title}
                    </Card.Title>
                    <Card.Text>
                        {article.content}
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    <small className="text-muted">
                        crée le&nbsp;
                        {date.getDate()}/{date.getMonth() +1}/{date.getFullYear()}&nbsp;
                        par {article.authorFirstname} {article.authorLastname.substring(0, 1)}.
                        </small>
                </Card.Footer>

                
            </Card>
        );
    });

    return (
        <Container>          
            <h1>Home Page</h1>
            <h2>Last articles</h2>
            <CardGroup>
                {renderedArticles}
            </CardGroup>
        </Container>
    );
};

export default Home;