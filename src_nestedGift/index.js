import ReactDOM from 'react-dom/client'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ThemeProvider theme={createTheme({ palette: { mode: 'dark' } })}>
        <CssBaseline />
            <App />
    </ThemeProvider>
)