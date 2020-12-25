import axios from 'axios'
import { BASE_URL } from './baseUrl'

const signUp = async (name, email, password, passwordConfirm) => {
    try {
        const res = await axios({
            method: 'POST',
            url: `${BASE_URL}/api/v1/marketers/signup`,
            data: {name, email, password, passwordConfirm}
        })
        if(res.data.status === 'success') {
            return {
                status: res.data.status,
                user: res.data.user
            }
        }
    } catch (err) {
        return {
            status: 'fail',
            error: err.message
        }
    }
}

const login = async (email, password) => {
  try {
    const res = await axios({
      method: "POST",
      url: `${BASE_URL}/api/v1/marketers/login`,
      data: { email, password },
    });
    if (res.data.status === "success") {
      return {
        status: res.data.status,
        user: res.data.user,
      };
    }
  } catch (err) {
    return {
      status: "fail",
      error: err.message,
    };
  }
};

const getSellers = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: `${BASE_URL}/api/v1/sellers`
    })
    if (res.data.status === "success") {
      return {
        status: res.data.status,
        resellers: res.data.resellers,
      };
    }
  } catch (err) {
    
  }
}

const addSeller = async (firstName, lastName, phone, location, bmsProducts, rating) => {
  try {
    const res = await axios({
      method: "POST",
      url: `${BASE_URL}/api/v1/marketers/addSeller`,
      data: {firstName, lastName, phone, location, bmsProducts, rating}
    });
    if (res.data.status === "success") {
      return {
        status: res.data.status,
        reseller: res.data.reseller,
      };
    }
  } catch (err) {
    return {
      status: "fail",
      error: err.message,
    };
  }
};

export default {
    signUp,
    login,
    getSellers,
    addSeller
}