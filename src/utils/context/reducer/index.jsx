const LoginActions = {
    FETCH_START: "FETCH_START",
    FETCH_REGISTER_SUCCESS: "FETCH_REGISTER_SUCCESS",
    FETCH_POST_SUCCESS: "FETCH_POST_SUCCESS",
    FETCH_LOGIN_SUCCESS: "FETCH_LOGIN_SUCCESS",
    FETCH_FAILED: "FETCH_FAILED",
    FETCH_POST_FAILED: "FETCH_POST_FAILED",
}

export const InitialLoginState = {
    isLoading: false,
    isLoggedIn: false,
    isSuccess:false,
    isError:false,
    user: {}
    
}

export const LoginReducer = (state, action) => {
    switch(action.type) {
        case LoginActions.FETCH_START:
            return {...state,
                isLoading: true
            }
        case LoginActions.FETCH_REGISTER_SUCCESS:
            return {...state,
                isLoading:false,
                isSuccess: true,
                user: action.payload
            }
        case LoginActions.FETCH_POST_SUCCESS:
            return {...state,
                isLoading:false,
                isSuccess: true
            }
            
        case LoginActions.FETCH_LOGIN_SUCCESS:
            return {...state,
                isLoading:false,
                isSuccess:true,
                isLoggedIn: true,
                user: action.payload
            }
        case LoginActions.FETCH_FAILED:
            return {...state,
                isLoading:false,
                isLoggedIn:false,
                isSuccess:false,
                isError: true,
            }
        case LoginActions.FETCH_POST_FAILED:
            return {...state,
                isLoading:false,
                isError:true,
                isSuccess:false
            }
        default:
            return {
                ...state,
            }
    }
}