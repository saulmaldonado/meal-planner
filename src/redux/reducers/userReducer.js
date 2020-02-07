import axios from 'axios';

const initialState = {
   message: null,
   username: null,
   // is_Admin: false,
   email: null,
   user_id: null
}

//action types
const GET_USER = 'GET_USER';
const LOGIN_USER = 'LOGIN_USER';
const REGISTER_USER = 'REGISTER_USER';
const LOGOUT_USER = 'LOGOUT_USER';

export function getUser() {
   return {
      type: GET_USER,
      payload: axios.get('user/getuser')
   }
}

export function loginUser(username, password) {
   // send an object into the body of the axios request
   let user = {username, password};
   return {
      type: LOGIN_USER,
      payload: axios.post('user/login', user)
   }
}

export function registerUser(firstname, lastname, username, email, password, noPpl) {
   let familyNumber = parseInt(noPpl);
   let user = {firstname, lastname, username, email, password, familyNumber};
   return {
      type: REGISTER_USER,
      payload: axios.post('user/registeruser', user)
   }
} 

export function logoutUser() {
   return {
      type: LOGOUT_USER,
      payload: axios.post('user/logout')
   }
}

export default function reducer(state = initialState, action) {
   //action.payload refers to what is being received due to the store function 
   //(check return {payload: axios.something})
   const {type, payload} = action;
   switch(type) {
      case `${GET_USER}_FULFILLED`:
         return {
            ...state,
            username: payload.data.username,
            user_id: payload.data.user_id,
            email: payload.data.email
         }
      case `${LOGIN_USER}_FULFILLED`:
         return {
            ...state,
            username: payload.data.username,
            user_id: payload.data.user_id,
            email: payload.data.email
         }
      case `${REGISTER_USER}_FULFILLED`:
         return {
            ...state,
            // Use this message to display a notification to the user when an account
            // has been made
            message: "Account created successfully.",
            username: payload.data.username,
            user_id: payload.data.user_id,
            email: payload.data.email
         }
      case `${LOGOUT_USER}_FULFILLED`:
         return {
            ...state,
            username: null,
            user_id: null,
            email: null
         }
      default: return state;
   }
}