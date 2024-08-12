import React, { useState } from 'react';
import { Modal, Box, TextField, Button } from '@mui/material';
import axios from 'axios';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const DashboardModal = ({ open, onClose, refreshFlashcards }) => {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');

    const handleAddFlashcard = async () => {
        try {
            await axios.post('http://localhost:5000/flashcards', { question, answer });
            refreshFlashcards();
            setQuestion('');
            setAnswer('');
            onClose(); // Close the modal after adding the flashcard
        } catch (error) {
            console.error('Error adding flashcard:', error);
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={style}>
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
            </Box>
        </Modal>
    );
};

export default DashboardModal;
