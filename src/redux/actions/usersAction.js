import fetch from 'isomorphic-fetch';

export const REQUEST_LOGIN = 'REQUEST_LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';

function requestLogin(isRequestLogin) {
    return {
        type : 'REQUEST_LOGIN',
        isRequestLogin
    }
}

function loginSuccesss(isSuccess) {
    return {
        type : 'LOGIN_SUCCESS',
        isSuccess
    }
}

function loginError(isError) {
    return {
        type : 'LOGIN_ERROR',
        isError
    }
}

export function login(login_info) {
    return dispatch => {
        dispatch(requestLogin(true));
        dispatch(loginSuccesss(false));
        dispatch(loginError(null));

        fetch('http://localhost:3002/users/login', {
            method: 'post',
            headers: {
              'Content-Type': 'application/json; charset=utf-8'
            },
            credentials: 'include',
            body: JSON.stringify(login_info)
          })
          .then(res => res.json())
          .then(data => {
            dispatch(requestLogin(false));
            //   if(error){dispatch(loginError(error));}
              if(data.email !== undefined){
                dispatch(loginSuccesss(true));
              }
          })
    }
}