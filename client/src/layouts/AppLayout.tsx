import { AppBar, Toolbar, Typography, Stack, Button } from '@mui/material';
import { Link, Outlet, useLocation } from 'react-router';

export default function AppLayout() {
    const location = useLocation();
    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Work Assignment Manager
                    </Typography>
                        <Stack direction="row" spacing={2}> 
                        <Button component={Link} to="/assignments" color="inherit" sx={{ fontWeight: location.pathname === '/assignments' ? 700 : 400 }}>
                            Assignments
                        </Button>
                        <Button component={Link} to="/about" color="inherit" sx={{ fontWeight: location.pathname === '/about' ? 700 : 400 }}>
                            About
                        </Button>
                    </Stack>
                </Toolbar>
            </AppBar>
            <Outlet />
        </>
    );
}   