import React, { useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const Flashcard = ({ question, answer }) => {
    const [flipped, setFlipped] = useState(false);

    return (
        <Card onClick={() => setFlipped(!flipped)} style={{ maxWidth: 500, margin: '20px auto', cursor: 'pointer' }}>
            <CardContent>
                <Typography variant="h5">
                    {flipped ? answer : question}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default Flashcard;
