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
        secondary: '#ffd500',
        dividerLine: '#e4e4e4'
      }
    },
    shape: {
      borderRadius: [8, 16, 24, 32, 40, 48]
    },
    shadows: [
      'none',
      '0px 1px 3px rgba(0,0,0,0.2), 0px 1px 1px rgba(0,0,0,0.14), 0px 2px 1px rgba(0,0,0,0.12)',
      '...',
      // up to shadows[24]
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
    spacing: 8, // base spacing unit (8px)
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
            borderRadius: 8
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
            borderRadius: 8
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
