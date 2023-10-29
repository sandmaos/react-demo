const userState = {
    user: {}
}

const auth = (state = userState, action) => {
    console.log(action);
    switch (action.type) {
        case "setUser":
            return {
                user: action.user
            }
        default:
            return state;
    }
}

export default auth;