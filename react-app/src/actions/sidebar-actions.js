const setLoading = payload => {
  return {
    type: 'set-loading',
    payload,
  };
};

const setSidebar = payload => {
  return {
    type: 'set-nav',
    payload,
  };
};

export { setLoading, setSidebar };
