import propTypes from 'prop-types';
import React, { createContext, useEffect, useState } from 'react';

const themes = {
  dark: {
    primary: '#1f1f1f',
    secondary: '#121212',
    accent: '#ffb2b2',
    text: '#ececec',
  },
};

const initialState = {
  dark: true,
  theme: themes.dark,
  toggle: () => {},
};

const ThemeContext = createContext(initialState);

const ThemeProvider = ({ children }) => {
  const [isDarkMode, setDarkMode] = useState(true);

  /*
  useEffect(() => {
    const isDark = localStorage.getItem('dark') === 'true';
    setDarkMode(isDark);
  })
  */

  const toggle = () => {
    const isDark = !isDarkMode;
    localStorage.setItem('isDarkMode', JSON.stringify(isDark));
    setDarkMode(isDark);
  };

  const theme = isDarkMode ? themes.dark : themes.dark;

  return (
    <ThemeContext.Provider value={{ theme, isDarkMode, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: propTypes.shape({}).isRequired,
};

export { ThemeProvider, ThemeContext };
