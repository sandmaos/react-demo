const initState = {
    username: ''
};

const userReducer = (preState = initState, action) => {
    const { type, data } = action;
    switch (type) {
        case 'signin':
            return ({
                ...preState,
                username: data
            });
        case 'logout':
            return (data);
        default:
            return preState;
    }
}
export { userReducer }