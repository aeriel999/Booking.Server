import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

interface OutlinedAlertsProps {
    message: string;
}

const OutlinedErrorAlert: React.FC<OutlinedAlertsProps> = ({ message  }) => {
    return (
        <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert variant="outlined" severity="error">
                {message}
            </Alert>
        </Stack>
    );
};

export default OutlinedErrorAlert;
