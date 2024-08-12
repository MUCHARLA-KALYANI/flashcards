import React, { useState, useEffect } from 'react';
import { TextField, Button, Card, CardContent, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';

const Dashboard = ({ refreshFlashcards }) => {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [flashcards, setFlashcards] = useState([]); // Initialize flashcards as an empty array

    useEffect(() => {
        fetchFlashcards();
    }, []);

    const fetchFlashcards = async () => {
        try {
            const response = await axios.get('http://localhost:5000/flashcards');
            setFlashcards(response.data);
        } catch (error) {
            console.error('Error fetching flashcards:', error);
        }
    };

    const handleAddFlashcard = async () => {
        try {
            await axios.post('http://localhost:5000/flashcards', { question, answer });
            refreshFlashcards();
            setQuestion('');
            setAnswer('');
            fetchFlashcards(); // Refresh the flashcards list after adding
        } catch (error) {
            console.error('Error adding flashcard:', error);
        }
    };

    return (
        <Card sx={{ maxWidth: 400, margin: '20px auto', padding: '20px' }}>
            <CardContent>
                <TextField
                    label="Question"
                    variant="outlined"
                    fullWidth
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    sx={{ marginBottom: 2 }}
                />
                <TextField
                    label="Answer"
                    variant="outlined"
                    fullWidth
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    sx={{ marginBottom: 2 }}
                />
                <Button variant="contained" color="primary" fullWidth onClick={handleAddFlashcard}>
                    Add Flashcard
                </Button>
                
                <List sx={{ marginTop: 2 }}>
                    {flashcards.map((flashcard) => (
                        <ListItem key={flashcard.id}>
                            <ListItemText 
                                primary={flashcard.question} 
                                secondary={flashcard.answer} 
                            />
                        </ListItem>
                    ))}
                </List>
            </CardContent>
        </Card>
    );
};

export default Dashboard;
