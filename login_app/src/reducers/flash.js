const flashState = [
    // {
    //     msg:"register success",
    //     id:"success"
    // },
    // {
    //     msg:"register failed",
    //     id:"failed"
    // }
];

const flash = (state = flashState, action) => {
    switch (action.type) {
        case "addFlash":
            return [
                ...state,
                action.message
            ];
        case "delFlash":
            return state;
        default:
            return state;
    }
}
export default flash;