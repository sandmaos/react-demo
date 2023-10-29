export function addFlashMessage(message){
    console.log(message);
    return {
        type:"addFlash",
        message
    }
}

export function delFlashMessage(message){
    return {
        type:"delFlash"
    }
}