'use client';

import React from 'react';
import { useState } from 'react';
import { Container, Typography, TextField, Button, Card, CardContent, Box, Stack } from '@mui/material';
import ChatMessage from '@/app/components/ChatMessage';
import Navbar from '@/app/components/Navbar';
import TextToSpeech from '../components/TextToSpeech';
import ExportButton from '../components/Utils/ExportButton';
  
export default function Article() {
  const [message, setMessage] = useState('');
  const [url, setUrl] = useState('');

  const summary = "This is a placeholder for the article summary. The actual summary will be generated based on the provided URL using AI analysis.";
  const aiPerspective = "This is where the AI's perspective and analysis of the article will be displayed, offering unique insights and key takeaways.";
  const chatHistory = [
    { isAI: true, message: "Hello! I've analyzed the article. What would you like to know about it?" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      setMessage('');
    }
  };

  const cardStyle = {
    bgcolor: 'white',
    boxShadow: 3,
    borderRadius: '20px',
    '& .MuiCardContent-root': {
      borderRadius: '20px',
    }
  };

  const handleExport = (format: string) => {
    console.log(`Exporting in ${format} format`);
  };

  return (
    <>
      <Navbar />
      <Box sx={{
        bgcolor: '#111827',
        background: 'linear-gradient(90deg, rgba(7, 0, 40, 1) 0%, rgba(23, 6, 66, 1) 50%, rgba(19, 0, 47, 1) 100%)',
        color: 'white',
        minHeight: '100vh',
        py: 8
      }}>
        <Container maxWidth="lg">
          <Stack spacing={6}>
            <Card sx={cardStyle}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" fontWeight="bold" gutterBottom color="primary.main">
                  Article Summary
                </Typography>
                <Typography variant="body1" paragraph>

{/* Text-to-speech */}
                <div className="p-4">
                  <TextToSpeech text={summary} />
                </div>
                  {summary}
                </Typography>
                <Typography variant="subtitle2" color="textSecondary" fontWeight="bold">
                  Source Article:
                </Typography>
                <Typography variant="body2" color="primary" component="a" href={url || '#'} target="_blank" rel="noopener noreferrer" sx={{ wordBreak: 'break-word' }}>
                  {url}
                </Typography>
              </CardContent>
            </Card>

            <Card sx={cardStyle}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" fontWeight="bold" gutterBottom color="primary.main">
                  AI Perspective
                </Typography>
                <Typography variant="body1" paragraph>
                  {/* Text-to-speech */}
                <div className="p-4">
                  <TextToSpeech text={aiPerspective} />
                </div>
                  {aiPerspective}
                </Typography>
              </CardContent>
            </Card>

            <Card sx={cardStyle}>
              <CardContent sx={{
                p: 4,
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                position: "relative",
              }}>
                <Box sx={{
                  position: "absolute",
                  top: 16,
                  right: 16,
                  zIndex: 10,
                }}>
                  <ExportButton />
                </Box>

                <Typography variant="h5" fontWeight="bold" gutterBottom color="primary.main">
                  Discussion
                </Typography>

                <Box sx={{
                  flexGrow: 1,
                  overflowY: "auto",
                  maxHeight: 400,
                  mb: 3,
                  borderRadius: "16px",
                }}>
                  {chatHistory.map((chat, index) => (
                    <ChatMessage key={index} isAI={chat.isAI} message={chat.message} />
                  ))}
                </Box>

                <Box component="form" onSubmit={handleSubmit} display="flex" gap={2}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Ask a question about the article..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                      },
                    }}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ borderRadius: "12px", px: 4 }}
                  >
                    Send
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Stack>
        </Container>
      </Box>
    </>
  );
}
