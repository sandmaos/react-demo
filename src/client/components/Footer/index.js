import React from 'react'
import { Container, Typography } from '@mui/material';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';

export default function Footer() {
  function Copyright() {
    return (
      <Typography variant="body2" color="text.secondary">
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          Jay
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  return (
    <>
      <Container sx={{ maxHeight: 200 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box
            component="footer"
            sx={{
              py: 2,
              px: 1,
              mt: 'auto',
              backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                  ? theme.palette.grey[200]
                  : theme.palette.grey[900],
            }}
          >
            <Container maxWidth="sm">
              <Typography variant="body1">
                My animal display platform.
              </Typography>
              <Copyright />
            </Container>
          </Box>
        </Box>
      </Container>
    </>
  )
}
