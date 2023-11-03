const initState = {
    cardData: [],
    currPage: 1,
    totalPage:1,
};

const cardReducer = (preState = initState, action) => {
    const { type, data } = action;
    switch (type) {
        case 'setCard':
            return ({ ...preState, cardData: data });
        case 'clearCard':
            return ({ ...preState, cardData: [] });
        case 'setCurrPage':
            return ({ ...preState, currPage: data });
        case 'setTotalPage':
            return ({ ...preState, totalPage: data });
        default:
            return preState;
    }
}
export { cardReducer }