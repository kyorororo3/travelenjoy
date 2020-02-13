import fetch from 'isomorphic-fetch';

export const REQUEST_LOGIN = 'REQUEST_LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const GET_USER = 'GET_USER';

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

function getUser(login_user) {
    return {
        type : 'GET_USER',
        user : login_user
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
              if(data.email !== undefined){
                dispatch(loginSuccesss(true));
              }
             sessionStorage.setItem('loginUser', JSON.stringify(data));    
          })
          .catch(error => dispatch(loginError(error)))
    }
}

export function fetchGetUser() {
    return dispatch => {
        dispatch(getUser(null));
        dispatch(loginSuccesss(true));

        fetch('http://localhost:3002/users/getUser',{
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {
            if(data.email !== undefined){
                dispatch(getUser(data));
            }else{
                dispatch(getUser(null));
                dispatch(loginSuccesss(false));
            }
        });
    }
}

