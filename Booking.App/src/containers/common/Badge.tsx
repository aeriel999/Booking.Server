import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';

// Example usage
export const DotBadge: React.FC<{ isActive: boolean }> = ({ isActive }) => {
    return (
        <Box sx={{ color: 'action.active' }}>
            {isActive ? (
                <Badge color="secondary" variant="dot">
                    <MailIcon />
                </Badge>
            ) : (
                <MailIcon />
            )}
        </Box>
    );
};



