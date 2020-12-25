import axios from 'axios'
import { BASE_URL } from './baseUrl'

const signUp = async (
  firstName,
  lastName,
  phone,
  email,
  passwordConfirm,
  password,
  location
) => {
  try {
    const res = await axios({
      method: "POST",
      url: `${BASE_URL}/api/v1/sellers/signup`,
      data: {
        firstName,
        lastName,
        phone,
        email,
        passwordConfirm,
        password,
        location,
        active: true
      },
    });
    if (res.data.status === "success") {
      return {
        status: res.data.status,
        user: res.data.user,
      };
    }
  } catch (err) {
    console.log(err);
    return {
      status: "fail",
      error: err,
    };
  }
};

const login = async (email, password) => {
    try {
        const res = await axios({
            method: 'POST',
            url: `${BASE_URL}/api/v1/sellers/login`,
            data: {email, password}
        }) 
        if(res.data.status === 'success') {
            return {
                status: res.data.status,
                user: res.data.user
            }
        }
    } catch (err) {
        console.log(err);
        return {
            status: 'fail',
            error: err
        }
    }
}

export default {
    signUp,
    login
}