import React, { useEffect, useState } from 'react';
import { Card, Avatar, Col, Typography, Row } from 'antd';
import axios from 'axios';
import moment from 'moment';

const { Title } = Typography;
const { Meta } = Card;

function LandingPage() {
    const [Diary, setDiarys] = useState([]);
    const [movies, setMovies] = useState([]);  // 초기값을 빈 배열로 명확히 설정
    const [dramas, setDramas] = useState([]);  // 초기값을 빈 배열로 명확히 설정
    const apiKey = process.env.REACT_APP_MOVIE_API_KEY;

    useEffect(() => {
        axios.get('/api/diary/getDiarys')
            .then(response => {
                if (response.data.success) {
                    setDiarys(response.data.diarys);
                } else {
                    alert('Failed to get Diarys');
                }
            });

            const fetchMovies = async () => {
                console.log("API Key:", process.env.REACT_APP_MOVIE_API_KEY);  // Debugging line
                try {
                    const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=ko-KO&page=1`);
                    const data = await response.json();
                    if (response.ok) {  // Check if response is ok
                        setMovies(data.results);
                    } else {
                        console.error('Failed to fetch movies:', data);
                        alert('Failed to fetch movies: ' + data.status_message);
                    }
                } catch (error) {
                    console.error('Error fetching movies:', error);
                    alert('Error fetching movies: ' + error.message);
                }
            };
            
            const fetchDramas = async () => {
                try {
                    const url = `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=ko-KO&page=1`;
                    const response = await fetch(url);
                    const data = await response.json();
                    if (data.results) {
                        setDramas(data.results);
                    } else {
                        console.error('Failed to fetch dramas:', data);
                    }
                } catch (error) {
                    console.error('Error fetching dramas:', error);
                }
            };
        fetchMovies();
        fetchDramas();
    }, []);

    const renderDiaryCards = Diary.map((diary, index) => (
        <Col lg={6} md={8} xs={24} key={diary._id}>
            <Card
                hoverable
                style={{ width: 240, marginBottom: 16 }}
                cover={<img alt="example" src={diary.image} />}
            >
                <Meta
                    avatar={<Avatar src={diary.writer.image} />}
                    title={<a href={`/diary/${diary._id}`}>{diary.title}</a>}
                    description={`${diary.writer.name} - ${moment(diary.createdAt).format("MMM Do YY")}`}
                />
            </Card>
        </Col>
    ));
    const renderMovieCards = movies.map((movie, index) => (
        <Col lg={4} md={6} xs={12} key={movie.id}>
            <Card
                hoverable
                style={{ width: 240 }}
                cover={<img alt={movie.title} src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />}
            >
                <Meta title={movie.title} />
            </Card>
        </Col>
    ));

    const renderDramaCards = dramas.map((drama, index) => (
        <Col lg={4} md={6} xs={12} key={drama.id}>
            <Card
                hoverable
                style={{ width: 240 }}
                cover={<img alt={drama.title} src={`https://image.tmdb.org/t/p/w500${drama.poster_path}`} />}
            >
                <Meta title={drama.title} />
            </Card>
        </Col>
    ));

    // 영화 및 드라마 카드 렌더링 로직은 변경 없음

    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <Title level={2}>Recommended Diaries</Title>
            <Row gutter={16}>
                {renderDiaryCards}
            </Row>
            <Title level={2} style={{ marginTop: '2rem' }}>Featured Movies</Title>
            <Row gutter={16}>
                {renderMovieCards}
            </Row>
            <Title level={2} style={{ marginTop: '2rem' }}>Featured Dramas</Title>
            <Row gutter={16}>
                {renderDramaCards}
            </Row>
        </div>
    );
}

export default LandingPage;