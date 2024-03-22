import { Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
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
    );
};

export default NotFoundPage;
