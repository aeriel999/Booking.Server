import { Typography, Button, createTheme, ThemeProvider } from '@mui/material';
import { Link } from 'react-router-dom';

const theme = createTheme(); // Create a default theme

const NotFoundPage = () => {
    return (
        <ThemeProvider theme={theme}>
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <Typography variant="h4" gutterBottom>
                    404 - Not Found
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    Sorry, the page you visited does not exist.
                </Typography>
                <Button variant="contained" color="primary" component={Link} to="/">
                    Back Home
                </Button>
            </div>
        </ThemeProvider>
    );
};

export default NotFoundPage;
