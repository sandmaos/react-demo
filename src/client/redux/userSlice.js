const initState = {
    username: ''
};

const userReducer = (preState = initState, action) => {
    const { type, data } = action;
    switch (type) {
        case 'signin':
            return ({ ...preState, username: data.username });
        case 'logout':
            return ({ ...preState, username: data.username  });
        default:
            return preState;
    }
}
export { userReducer }