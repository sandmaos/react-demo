const initState = {
    cardData: [],
    currPage: 1
};

const cardReducer = (preState = initState, action) => {
    const { type, data } = action;
    switch (type) {
        case 'setCard':
            return ({ ...preState, cardData: data });
        case 'clearCard':
            return ({ ...preState, cardData: [] });
        case 'setPage':
            return ({ ...preState, currPage: data });
        default:
            return preState;
    }
}
export { cardReducer }