import GetUserReducer from "./features/GetUserSlice";
import LoginUserSlice from "./features/LoginUserSlice";
const rootReducer = {
       getUserData : GetUserReducer,
       loginUserData : LoginUserSlice
    
    }
    export default rootReducer;