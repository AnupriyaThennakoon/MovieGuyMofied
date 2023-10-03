import axios from 'axios'
import {
  USER_SIGIN_FAIL,
  USER_SIGIN_REQUEST,
  USER_SIGIN_SUCCESS,
  USER_SIGNOUT,
  USER_CREATE_REQUEST,
  USER_CREATE_SUCCESS,
  USER_CREATE_FAIL,
  USER_INFO_SUCCESS,
  USER_INFO_REQUEST,
  USER_INFO_FAIL,
  USER_UPDATE_ACC_REQUEST,
  USER_UPDATE_ACC_SUCCESS,
  USER_UPDATE_ACC_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_CLEAN,


  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL

} from '../constants/userConstants'

import {
  CLEAR_CART_ITEMS,
  CLEAR_THEATER_DETAILS ,
  CLEAR_PAYMENT_DETAILS, 
} from '../constants/cartConstants'

import jwtDecode from 'jwt-decode'

export const Sign_In = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_SIGIN_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      '/api/users/login',
      { email, password },
      config
    )

    dispatch({
      type: USER_SIGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem('userDetails', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_SIGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const signout = () => (dispatch) => {
  localStorage.removeItem('userDetails')
  // localStorage.removeItem('cartItems')
  // localStorage.removeItem('theaterDetails')
  // localStorage.removeItem('paymentDetails')
  dispatch({ type: USER_SIGNOUT })
  dispatch({ type: USER_LIST_CLEAN })
  dispatch(clearCartItems()); 
  dispatch(clearTheaterDetails()); 
  dispatch(clearPaymentDetails());

}

export const AddUser = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_CREATE_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      '/api/users',
      { name, email, password },
      config
    )

    dispatch({
      type: USER_CREATE_SUCCESS,
      payload: data,
    })

    dispatch({
      type: USER_SIGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem('userDetails', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const ViewuserInfo = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_INFO_REQUEST,
    })

    const {
      userSignin: { userDetails },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userDetails.token}`,
      },
    }

    const { data } = await axios.get(`/api/users/${id}`, config)

    dispatch({
      type: USER_INFO_SUCCESS,
      payload: data,
    })

    console.log(data)

  } catch (error) {
    dispatch({
      type: USER_INFO_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateUserAccount = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_ACC_REQUEST,
    })

    const {
      userSignin: { userDetails },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userDetails.token}`,
      },
    }

    const { data } = await axios.put(`/api/users/account`, user, config)

    dispatch({
      type: USER_UPDATE_ACC_SUCCESS,
      payload: data,
    })

    dispatch({
      type: USER_SIGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem('userDetails', JSON.stringify(data))

  } catch (error) {
    dispatch({
      type: USER_UPDATE_ACC_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const ListUsers = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_LIST_REQUEST,
    })

    const {
      userSignin: { userDetails },
    } = getState()

    const config = {
      headers: {
        
        Authorization: `Bearer ${userDetails.token}`,
      },
    }

    const { data } = await axios.get(`/api/users`, config)
    console.log(data)
    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data,
    })


  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteUser = (userId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DELETE_REQUEST,
    });

    const {
      userSignin: { userDetails },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userDetails.token}`,
      },
    };

    // Send a DELETE request to the server to delete the user by ID
    await axios.delete(`/api/users/${userId}`, config);

    dispatch({
      type: USER_DELETE_SUCCESS,
    });

  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const clearCartItems = () => (dispatch) => {
  dispatch({ type: CLEAR_CART_ITEMS });
};

export const clearTheaterDetails = () => (dispatch) => {
  dispatch({ type: CLEAR_THEATER_DETAILS });
};

export const clearPaymentDetails = () => (dispatch) => {
  dispatch({ type: CLEAR_PAYMENT_DETAILS });
};


// export const clearSigninError = async (dispatch) => {
//   dispatch({
//     type: CLEAR_SIGNIN_ERROR,
//   });
// };

export const google_Sign_In = (response) => async (dispatch) => {
  try {
    dispatch({
      type: USER_SIGIN_REQUEST,
    })

    var decoded = jwtDecode(response.credential)

    const data = {
      name : decoded.given_name,
      email : decoded.email,
      isAdmin : false
    }

    dispatch({
      type: USER_SIGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem('userDetails', data)
  }
  catch (error) {
    dispatch({
      type: USER_SIGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}