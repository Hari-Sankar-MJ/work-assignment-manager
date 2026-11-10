import { Container, Stack, Typography, Button } from '@mui/material';
import { Link } from 'react-router';

export default function NotFoundPage() {
    return (
        <Container component="main">
            <Stack spacing={2} sx={{ py: 4 }}>
                <Typography component="h1" variant="h3">
                    Page Not Found
                </Typography>
                <Typography>
                    The page you are looking for does not exist.
                </Typography>
                <Button component={Link} to="/assignments" variant="contained">
                    View Assignments
                </Button>
            </Stack>
        </Container>
    );
}