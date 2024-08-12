import React, { useState, useEffect } from 'react';
import Flashcard from './components/Flashcard';
import FlashcardNavigation from './components/FlashcardNavigation';
import DashboardModal from './components/DashboardModal';
import axios from 'axios';
import { Button, MenuItem, Select, FormControl, Typography, Card, CardContent } from '@mui/material';

function App() {
    const [flashcards, setFlashcards] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [role, setRole] = useState('User'); 
    const [openModal, setOpenModal] = useState(false); 

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

    const nextCard = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
    };

    const prevCard = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
    };

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleRoleChange = (event) => {
        setRole(event.target.value);
    };

    return (
        <div style={{ maxWidth: 600, margin: 'auto', padding: '20px' }}>
            <Typography variant="h4" component="h1" gutterBottom align="center">
                Flashcard Learning Tool
            </Typography>

            <Card sx={{ marginBottom: 2 }}>
                <CardContent>
                    {/* Role Label */}
                    <Typography variant="h6" component="div" sx={{ marginBottom: 1 }}>
                        Role
                    </Typography>

                    {/* Role Dropdown */}
                    <FormControl fullWidth>
                        <Select value={role} onChange={handleRoleChange}>
                            <MenuItem value="User">User</MenuItem>
                            <MenuItem value="Admin">Admin</MenuItem>
                        </Select>
                    </FormControl>
                </CardContent>
            </Card>

            {role === 'Admin' && (
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={handleOpenModal} 
                    sx={{ marginBottom: 2, width: '100%' }}
                >
                    Add Question
                </Button>
            )}

            {flashcards.length > 0 && (
                <Flashcard 
                    question={flashcards[currentIndex].question} 
                    answer={flashcards[currentIndex].answer} 
                />
            )}

            <FlashcardNavigation nextCard={nextCard} prevCard={prevCard} />

            <DashboardModal 
                open={openModal} 
                onClose={handleCloseModal} 
                refreshFlashcards={fetchFlashcards} 
            />
        </div>
    );
}

export default App;
