const addState = {
    addVal: 0,
};

const multiState = {
    multiVal: 1,
};

export const addReducer = (preState = addState, action) => {
    const { type, data } = action;
    switch (type) {
        case 'add':
            return { ...preState, addVal: preState.addVal + data };
        default:
            return preState;
    }
}

export const multiReducer = (preState = multiState, action) => {
    const { type, data } = action;
    switch (type) {
        case 'multi':
            return { ...preState, multiVal: preState.multiVal * data };
        default:
            return preState;
    }
}