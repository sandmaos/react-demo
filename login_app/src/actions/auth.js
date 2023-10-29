import api from "../api"

function setUserObj(user){
    // console.log(user,9988);
    return {
        type:"setUser",
        user
    }
}

export function asyncSetUserObj(data){
    return dispatch=>{
        return api.login(data).then((res)=>{
            dispatch(setUserObj(res.data.user))
        })
    }
}