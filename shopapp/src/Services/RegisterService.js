import axios from "axios";

const registerValidation = (data) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!emailPattern.test(data.email)) {
        return 'Enter a valid email address.';
    }

    if (data.password !== data.passwordConfirm) {
        return 'Password and password confirmation do not match.';
    }

    for (const key in data) {
        if (data[key] === '') {
            return 'All fields are required.';
        }
    }

    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    if (!passwordPattern.test(data.password)) {
        return 'Password must be at least 8 characters long and include a digit, a lowercase letter, and an uppercase letter.';
    }

    return '';
}

const register = async (credentials) => {
    try {
      const response = await axios.post('http://localhost:5000/auth/register', credentials);
      if(response){
        const redirectTo = response.data.redirectTo;
        window.location.href = redirectTo;
        return response
      }
    } catch (error) {
      console.error('Błąd rejestracji:', error);
      return error.response.status
    }
  }

export {
    registerValidation,
    register
}