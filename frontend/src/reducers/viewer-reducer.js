import * as themes from '../constants/themes';

const initialState = {
  selectedTheme: themes.DEFAULT_THEME,
};

const viewerReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return { ...state };
  }
};

export default viewerReducer;
