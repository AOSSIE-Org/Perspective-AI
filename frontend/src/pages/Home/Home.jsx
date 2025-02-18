import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Container,
  Paper,
  Button,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Home = () => {
  const [url, setUrl] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url) {
      navigate('/analysis', { state: { url } });
    }
  };

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          mt: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography
          variant="h1"
          sx={{
            mb: 4,
            textAlign: 'center',
            background: 'linear-gradient(45deg, #1a73e8 30%, #7c4dff 90%)',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          Discover Different Perspectives
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ mb: 6, textAlign: 'center' }}
        >
          Enter any article URL to get AI-powered analysis and opposing viewpoints
        </Typography>

        <Paper
          component="form"
          onSubmit={handleSubmit}
          sx={{
            p: 1,
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            maxWidth: 600,
            borderRadius: '30px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
          }}
        >
          <SearchIcon sx={{ ml: 2, color: 'text.secondary' }} />
          <TextField
            fullWidth
            placeholder="Paste article URL here..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                border: 'none',
                '& fieldset': { border: 'none' },
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              borderRadius: '20px',
              px: 3,
              textTransform: 'none',
            }}
          >
            Analyze
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default Home; 