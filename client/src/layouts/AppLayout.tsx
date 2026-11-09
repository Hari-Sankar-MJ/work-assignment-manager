import { AppBar, Toolbar, Typography, Stack, Button } from '@mui/material';
import { Link, Outlet } from 'react-router';

export default function AppLayout() {
    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Work Assignment Manager
                    </Typography>
                        <Stack direction="row" spacing={2}> 
                        <Button component={Link} to="/assignments" color="inherit">
                            Assignments
                        </Button>
                        <Button component={Link} to="/about" color="inherit">
                            About
                        </Button>
                    </Stack>
                </Toolbar>
            </AppBar>
            <Outlet />
        </>
    );
}   