import { Typography, Toolbar, Container, AppBar } from '@mui/material';

export const Footer = () => (
  <AppBar position="fixed" style={{background: "#DAA520", top: '94vh', height : 60}}>
    <Container maxWidth="md">
      <Toolbar>
        <Typography variant="body2" color="black">
          Watch shop 2021
        </Typography>
      </Toolbar>
    </Container>
  </AppBar>
);