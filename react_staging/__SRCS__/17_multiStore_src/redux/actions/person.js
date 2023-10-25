import { ADD_PERSON } from '../constant';
// import store from "./store";

export const createPersonAction = personObj =>
    ({ type: ADD_PERSON, data: personObj })

