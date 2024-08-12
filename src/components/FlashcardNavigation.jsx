import React from 'react';
import { Button } from '@mui/material';

const FlashcardNavigation = ({ prevCard, nextCard }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: 500, margin: '20px auto' }}>
        <Button variant="contained" onClick={prevCard}>Previous</Button>
        <Button variant="contained" onClick={nextCard}>Next</Button>
    </div>
);

export default FlashcardNavigation;
