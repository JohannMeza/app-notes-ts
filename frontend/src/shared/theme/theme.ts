import { Theme, alpha, createTheme } from '@mui/material/styles';

declare module '@mui/material/InputBase' {
  interface InputBasePropsSizeOverrides {
    small: true
    medium: true
    large: true
  }
  interface InputBaseProps {
    variant: 'primary' | 'transparent'
  }
}

declare module '@mui/material/styles' {  
  interface Palette {
    yellow: Palette['primary'];
    green_light: Palette['primary'];
    green_pastel: Palette['primary'];
    text_light: Palette['primary'];
    text_dark: Palette['primary'];
    white: Palette['primary'];
  }

  interface PaletteOptions {
    yellow: {
      main: string,
      contrastText: string
    }
    green_light: {
      main: string,
      contrastText: string
    }
    green_pastel: {
      main: string,
      contrastText: string
    }
    text_light: {
      main: string,
    }
    text_dark: {
      main: string,
    }
    white: {
      main: string,
    }
  }
}

export const configTheme = <T extends Theme>(themeDefault?: Theme | T): Theme => createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#242423',
      contrastText: '#E8EDDF'
    },
    secondary: {
      main: '#333533',
      contrastText: '#E8EDDF'
    },
    yellow: {
      main: '#F5CB5C',
      contrastText: '#242423'
    },
    green_light: {
      main: '#E8EDDF',
      contrastText: '#E8EDDF'
    },
    green_pastel: {
      main: '#CFDBD5',
      contrastText: '#242423'
    },
    text_light: {
      main: '#E8EDDF',
    },
    text_dark: {
      main: '#242423',
    },
    white: {
      main: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: 'Roboto',
    h1: {
      fontSize: '30px',
      fontWeight: '700'
    },
    h2: {
      fontSize: '25px',
      fontWeight: '700'
    },
    h3: {
      fontSize: '20px',
      fontWeight: '700'
    },
    subtitle1: {
      fontSize: '25px',
      fontWeight: '500'
    },
    subtitle2: {
      fontSize: '20px',
      fontWeight: '500'
    },
    body1: {
      fontSize: '16px'
    },
    body2: {
      fontSize: '14px'
    },
  },
  components: {
    MuiInputLabel: {
      defaultProps: {
        focused: false,
        style: {
          position: 'relative',
          transformOrigin: 'center left'
        }
      },
      variants: [
        {
          props: { size: 'normal' },
          style: {
            fontWeight: '700',
            fontSize: '18px',
            '%.Mui-focused': {
              color: 'blue'
            }
          }
        },
        {
          props: { color: 'error' },
          style: {
            color: 'red'
          }
        },
      ],
    },
    MuiInputBase: {
      defaultProps: {
        size: 'medium'
      },
      variants: [
        {
          props: { variant: 'primary' },
          style: {
            borderRadius: 4,
            position: 'relative',
            backgroundColor: themeDefault && themeDefault.palette.green_light.main,
            border: '1px solid',
            borderColor: '#E0E3E7',
            fontSize: 16,
            color: 'black',
            width: 'auto',
            padding: '4px 12px',
            transition: themeDefault && themeDefault.transitions.create([
              'border-color',
              'background-color',
              'box-shadow',
            ]),
            '&.Mui-focused': {
              boxShadow: themeDefault && `${alpha(themeDefault.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
              borderColor: themeDefault && themeDefault.palette.primary.main,
            }
          }
        },
        {
          props: { variant: 'transparent' },
          style: {
            backgroundColor: 'transparent',
            fontSize: 16,
            width: 'auto',
            padding: '4px 12px',
            transition: themeDefault && themeDefault.transitions.create([
              'border-color',
              'background-color',
              'box-shadow',
            ]),
          }
        },
        {
          props: { size: 'small' },
          style: {
            height: '38px',
          }
        },
        {
          props: { size: 'medium' },
          style: {
            height: '40px'
          }
        },
        {
          props: { size: 'large' },
          style: {
            height: '50px'
          }
        }
      ]
    },
    MuiButton: {
      defaultProps: {
        style: {
          textTransform: 'none',
        }
      },
      variants: [
        {
          props: { variant: 'contained' },
          style: {
            backgroundColor: themeDefault?.palette.yellow.main,
            color: themeDefault?.palette.primary.main,
            borderRadius: '5px',
            fontWeight: 700,
            '&:hover': {
              backgroundColor: themeDefault?.palette.yellow.main,
              color: themeDefault?.palette.primary.main,
            },
          }
        },
        {
          props: { variant: 'outlined' },
          style: {
            border: '1px solid',
            borderColor: themeDefault?.palette.grey[600],
            backgroundColor: themeDefault?.palette.yellow.main,
            color: themeDefault?.palette.grey[700],
            borderRadius: '100px',
            '&:hover': {
              borderColor: themeDefault?.palette.grey[600],
              backgroundColor: themeDefault?.palette.yellow.main,
              color: themeDefault?.palette.grey[700],
            },
            '&:active': {
              borderColor: themeDefault?.palette.grey[600],
              backgroundColor: themeDefault?.palette.yellow.main,
              color: themeDefault?.palette.grey[700],
            },
            '&.Mui-focusVisible': {
              borderColor: themeDefault?.palette.grey[600],
              backgroundColor: themeDefault?.palette.yellow.main,
              color: themeDefault?.palette.grey[700],
            },
            '&:disabled': {
              borderColor: themeDefault?.palette.grey[600],
              backgroundColor: themeDefault?.palette.yellow.main,
              color: themeDefault?.palette.grey[700],
            }
          }
        },
      ]
    },
    MuiIconButton: {
      variants: [
        {
          props: { color: 'primary' },
          style: {
            background: themeDefault?.palette.yellow.main,
            '&:hover': {
              backgroundColor: themeDefault?.palette.yellow.main,
              color: themeDefault?.palette.primary.main,
            },
          }
        },
      ]
    },
    MuiSvgIcon: {
      variants: [
        {
          props: { color: 'secondary' },
          style: {
            color: themeDefault?.palette.white.main
          }
        }
      ]
    }
  }
});