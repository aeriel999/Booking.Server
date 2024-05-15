import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

interface OutlinedAlertsProps {
    message: string;
}

const OutlinedSuccessAlert: React.FC<OutlinedAlertsProps> = ({ message }) => {
    return (
        <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert variant="outlined" severity="success">
        {message}
        </Alert>
        </Stack>
);
};

export default OutlinedSuccessAlert;
