const initState = {
    cardData: []
};

const cardReducer = (preState = initState, action) => {
    const { type, data } = action;
    switch (type) {
        case 'setCard':
            return ({ ...preState, cardData: data });
        case 'clearCard':
            return ({ ...preState, cardData: data });
        default:
            return preState;
    }
}
export { cardReducer }