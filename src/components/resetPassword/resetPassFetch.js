// src/api/resetPassword.js
import { API_HOST } from '../../constants';
import { notify } from './../../utils/notify';


export const resetPassword = (validationCode, password, confirmPassword, navigate, setValidationCode, setPassword, setConfirmPassword) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    recoveryPasswordCode: Number(validationCode),
    password1: password,
    password2: confirmPassword,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(`${API_HOST}}/reset`, requestOptions)
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error("Codigo invalido");
      }
    })
    .then((result) => {
      notify(result.message);
      setValidationCode("");
      setPassword("");
      setConfirmPassword("");
      navigate("/login");
    })
    .catch((error) => notify(error.message));
};