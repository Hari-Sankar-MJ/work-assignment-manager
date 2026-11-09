import { Container, Stack, Typography } from '@mui/material';

export default function AboutPage() {
    return (
        <Container component="main">
            <Stack spacing={2} sx={{ py: 4 }}>
                <Typography component="h1" variant="h3">
                    About
                </Typography>
                <Typography>
                    This is the About page of the Work Assignment Manager application. It is a React learning project.
                </Typography>
            </Stack>
        </Container>
    );
}