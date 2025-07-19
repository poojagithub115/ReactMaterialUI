import logo from './logo.svg';
import './App.css';
import Editor from './Components/Editor';
import PlateEditor from './Components/GhostEditor';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import TeamDropdownMenu from './Components/TeamDropdownMenu';
import SidebarMenu from './Components/SidebarMenu';
import Product from 'Components/Jobs/Product';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useState } from 'react';

function App() {
  const [mode, setMode] = useState('light');
  const theme = createTheme({
    palette: {
      mode,
      primary: {
        main: '#1e85c1',
        menuBG: '#a3d7e6',
        // dark:'#e6e6e6'
      },
      secondary: {
        main: '#6bbfd1'
      },
      background: {
        default: '#fff',
      },
      common: {
        menuBG: "#3999d0",
        menuText: '#333',
        hoverText: '#143346',
        iconSizes: {
          small: 16,
          medium: 24,
          large: 32
        }
      },
      text: {
        primary: '#666',
        secondary: '#333',
        dividerLine: '#e4e4e4'
      }
    },
    shape: {
      borderRadius: [8, 16, 24, 32, 40, 48]
    },
    shadows: [
      'none',
      '3px 3px 20px rgba(0,0,0,0.18)',
      '0px 1px 3px rgba(0,0,0,0.12), 0px 1px 2px rgba(0,0,0,0.24)',
      '0px 2px 4px rgba(0,0,0,0.14), 0px 2px 3px rgba(0,0,0,0.20)',
      '0px 3px 6px rgba(0,0,0,0.16), 0px 3px 4px rgba(0,0,0,0.22)',
      '0px 4px 8px rgba(0,0,0,0.18), 0px 4px 5px rgba(0,0,0,0.24)',
      '0px 5px 10px rgba(0,0,0,0.20), 0px 5px 6px rgba(0,0,0,0.26)',
      '0px 6px 12px rgba(0,0,0,0.22), 0px 6px 7px rgba(0,0,0,0.28)',
      '0px 7px 14px rgba(0,0,0,0.24), 0px 7px 8px rgba(0,0,0,0.30)',
      '0px 8px 16px rgba(0,0,0,0.26), 0px 8px 9px rgba(0,0,0,0.32)',
      '0px 9px 18px rgba(0,0,0,0.28), 0px 9px 10px rgba(0,0,0,0.34)',
      '0px 10px 20px rgba(0,0,0,0.30), 0px 10px 11px rgba(0,0,0,0.36)',
      '0px 11px 22px rgba(0,0,0,0.32), 0px 11px 12px rgba(0,0,0,0.38)',
      '0px 12px 24px rgba(0,0,0,0.34), 0px 12px 13px rgba(0,0,0,0.40)',
      '0px 13px 26px rgba(0,0,0,0.36), 0px 13px 14px rgba(0,0,0,0.42)',
      '0px 14px 28px rgba(0,0,0,0.38), 0px 14px 15px rgba(0,0,0,0.44)',
      '0px 15px 30px rgba(0,0,0,0.40), 0px 15px 16px rgba(0,0,0,0.46)',
      '0px 16px 32px rgba(0,0,0,0.42), 0px 16px 17px rgba(0,0,0,0.48)',
      '0px 17px 34px rgba(0,0,0,0.44), 0px 17px 18px rgba(0,0,0,0.50)',
      '0px 18px 36px rgba(0,0,0,0.46), 0px 18px 19px rgba(0,0,0,0.52)',
      '0px 19px 38px rgba(0,0,0,0.48), 0px 19px 20px rgba(0,0,0,0.54)',
      '0px 20px 40px rgba(0,0,0,0.50), 0px 20px 21px rgba(0,0,0,0.56)',
      '0px 21px 42px rgba(0,0,0,0.52), 0px 21px 22px rgba(0,0,0,0.58)',
      '0px 22px 44px rgba(0,0,0,0.54), 0px 22px 23px rgba(0,0,0,0.60)',
      '0px 23px 46px rgba(0,0,0,0.56), 0px 23px 24px rgba(0,0,0,0.62)',
      '0px 24px 48px rgba(0,0,0,0.58), 0px 24px 25px rgba(0,0,0,0.64)',
    ],
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
        xxl: 1800 // custom
      }
    }
    ,
    typography: {
      fontSize: 14,
      fontFamily: 'Poppins, sans-serif',
      color: '#333',
      h1: {
        fontSize: '2.5rem',
      },
      h5: {
        fontSize: 22,
        fontWeight: 500,
        color: '#333',
      },
      h6: {
        fontSize: 16,
        fontWeight: 500,
        color: '#333',
      },
      h7: {
        fontSize: 14,
        fontWeight: 500,
        color: '#333',

      },
      caption: {
        fontSize: 13
      },
      subtitle1: {
        fontSize: 14,
      },
      smallerText: {
        fontSize: 12,
      },
      p: {
        fontSize: 14,
        color: '#333'
      }
    },
    spacing: 6, // base spacing unit (8px)
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            '&:hover': {
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)'
            }
          }
        }
      },
      MuiAvatar: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            '&.MuiAvatar-size8': {
              width: 80,
              height: 80
            }
          }
        }
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8
          }
        }
      },
      MuiListItemText: {
        styleOverrides: {
          primary: {
            fontSize: '14px'
          }
        }
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            marginBottom: 14,
            // '.MuiOutlinedInput-root': {
            //   borderRadius: 1, // change this value as needed
            // },
          }
        }
      },
      MuiSelect: {

      },
      MuiTextField: {
        styleOverrides: {
          root: {
            marginBottom: 14,
            fontSize: 14,
            '.MuiOutlinedInput-root': {
              // borderRadius: 10, // change this value as needed
            },
            '& .MuiOutlinedInput-root textarea': {
              resize: 'vertical', // This allows the user to resize the textarea
            },
            defaultProps: {
              // InputLabelProps: { shrink: true },
            },
          },

        },
        defaultProps: {
          // InputLabelProps: { shrink: true },
        },
      },
      MuiFormControl: {
        defaultProps: {
          // InputLabelProps: { shrink: true },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: '#333',
            background: '#fff',
            padding: '0 5px'
          },

        },
        defaultProps: {
          shrink: true
        },
      },
      MuiAccordion: {
        styleOverrides: {
          root: {
            borderRadius: 5,
            boxShadow: 'none',
            border: '1px solid #eee'
          }
        }
      }
    },

  });
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <SidebarMenu></SidebarMenu>

        {/* <TeamDropdownMenu/> */}

        <Routes>
          <Route path="/" element={<Editor />} />
          <Route path="/about" element={<PlateEditor />} />
          <Route path="/Products" element={<Product />} />
        </Routes>
      </Router>
    </ThemeProvider>




  );
}

export default App;
