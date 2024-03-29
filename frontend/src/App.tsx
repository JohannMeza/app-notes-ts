import { Box, ThemeProvider } from '@mui/material';
import { configTheme } from './shared/theme/theme';
import { IndexRouter } from './shared/router';
import '@src/shared/styles/main.css';
import { NoteContextProvider } from './shared/contexts/NoteContext';
import { CategorieContextProvider } from './shared/contexts/CategorieContext';
import { AuthContextProvider } from './shared/contexts/AuthContext';

const App = (): React.ReactNode => (
  <ThemeProvider theme={configTheme(configTheme())}>
    <AuthContextProvider>
      <CategorieContextProvider>
        <NoteContextProvider>
          <Box component="main">
            <IndexRouter />
          </Box>
        </NoteContextProvider>
      </CategorieContextProvider>
    </AuthContextProvider>
  </ThemeProvider>
);

export default App;
