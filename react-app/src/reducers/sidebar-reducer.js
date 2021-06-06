const initialState = {
  loading: false,
  nav: [],
};

const sidebarReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'set-loading':
      return { ...state, loading: action.payload };
    case 'set-nav':
      return { ...state, nav: action.payload };
    default:
      return { ...state };
  }
};

export default sidebarReducer;
