export const signInAction = (data) =>
    ({ type: 'signin', data })

export const logOutAction = (data) =>
    ({ type: 'logout', data })



export const setCardAction = (data) =>
    ({ type: 'setCard', data })

export const clearCardAction = (data) =>
    ({ type: 'clearCard', data })

export const setCurrPageAction = (data) =>
    ({ type: 'setCurrPage', data })

export const setTotalPageAction = (data) =>
    ({ type: 'setTotalPage', data })