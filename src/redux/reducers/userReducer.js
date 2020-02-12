export function login(state = { isRequestLogin: false,
                                isSuccess: false,
                                isError: null }, action) {
    switch(action.type){
        case REQUEST_LOGIN :
            return Object.assign({}, state, {
                isRequestLogin : action.isRequestLogin
            });

        case LOGIN_SUCCES :
            return Object.assign({}, state, {
                isSuccess : action.isSuccess
            });
            
        case LOGIN_ERROR :
        return Object.assign({}, state, {
            isError : action.isError
        });
    }
}