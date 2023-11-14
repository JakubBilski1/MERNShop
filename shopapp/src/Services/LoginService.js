import axios from "axios";

const login = async (credentials) => {
    try {
      const response = await axios.post('http://localhost:5000/auth/login', credentials, {withCredentials: true});
      if(response){
        const redirectTo = response.data.redirectTo;
        window.location.href = redirectTo;
        return response
      }
    } catch (error) {
      console.error('Błąd logowania:', error);
      return error.response.status
    }
  };

export {
    login
}