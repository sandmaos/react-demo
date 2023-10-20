const initState = 0;
export const reducer= (preState = initState, action) => {
    const { type, data } = action;
    switch (type) {
        case 'add':
            return preState + data;
        default:
            return preState;
    }
}