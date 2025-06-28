// import axios from "axios";
// import { userRequest, userSuccess, userFail, userLogout } from "./user.reducer";

// export const login = (user) => async (dispatch) => {
//   try {
//     dispatch(userRequest());
//     const config = { headers: { "Content-Type": "application/json" } };
//     const userData = await axios({
//       method: "POST",
//       url: `http://localhost:4000/user/login`,
//       data: user,
//       config,
//     });
//     axios.defaults.headers.common[
//       "Authorization"
//     ] = `Bearer ${userData.data.userToken}`;
//     localStorage.setItem(
//       "userToken",
//       JSON.stringify({ userToken: userData.data.userToken })
//     );
//     return dispatch(userSuccess(userData.data));
//   } catch (error) {
//     return dispatch(userFail(error.response.data.message));
//   }
// };
// export const signUp = (user) => async (dispatch) => {
//   try {
//     dispatch(userRequest());
//     const config = { headers: { "Content-Type": "application/json" } };
//     const userData = await axios({
//       method: "POST",
//       url: `http://localhost:4000/user/signup`,
//       data: user,
//       config,
//     });
//     axios.defaults.headers.common[
//       "Authorization"
//     ] = `Bearer ${userData.data.userToken}`;
//     localStorage.setItem(
//       "userToken",
//       JSON.stringify({ userToken: userData.data.userToken })
//     );
//     return dispatch(userSuccess(userData.data));
//   } catch (error) {
//     return dispatch(userFail(error.response.data.message));
//   }
// };
// export const logout = () => async (dispatch) => {
//   try {
//     dispatch(userRequest());
//     localStorage.removeItem("userToken");
//     // window.location.reload()
//     return dispatch(userLogout());
//   } catch (error) {
//     return dispatch(userFail(error.response.data.message));
//   }
// };
// export const getUserDetails = () => async (dispatch) => {
//   try {
//     dispatch(userRequest());
//     const userData = await axios({
//       method: "GET",
//       url: `http://localhost:4000/user/me`,
//     });
//     return dispatch(userSuccess(userData.data.user));
//   } catch (error) {
//     return dispatch(userFail(error.response.data.message));
//   }
// };
import axios from "axios";
import { userRequest, userSuccess, userFail, userLogout } from "./user.reducer";

// ✅ Login User
// export const login = (user) => async (dispatch) => {
//   try {
//     dispatch(userRequest());
//     const config = { headers: { "Content-Type": "application/json" } };
//     const userData = await axios.post(
//       "http://localhost:4000/api/users/login",
//       user,
//       config
//     );
//     axios.defaults.headers.common["Authorization"] = `Bearer ${userData.data.userToken}`;
//     localStorage.setItem("userToken", JSON.stringify({ userToken: userData.data.userToken }));
//     dispatch(userSuccess(userData.data));
//   } catch (error) {
//     dispatch(userFail(error.response?.data?.message || "Login failed"));
//   }
// };
export const login = (user) => async (dispatch) => {
  try {
    dispatch(userRequest());

    const config = { headers: { "Content-Type": "application/json" } };
    const userData = await axios.post(
      "http://localhost:4000/api/users/login", // ensure URL matches your backend
      user,
      config
    );

    axios.defaults.headers.common["Authorization"] = `Bearer ${userData.data.userToken}`;
    localStorage.setItem("userToken", JSON.stringify({ userToken: userData.data.userToken }));
    
    dispatch(userSuccess(userData.data));
  } catch (error) {
    console.log("❌ Frontend error response:", error?.response?.data); // ❗ LOG IT
    dispatch(userFail(error.response?.data?.message || "Login failed"));
  }
};
// ✅ Signup User
export const signUp = (user) => async (dispatch) => {
  try {
    dispatch(userRequest());
    const config = { headers: { "Content-Type": "application/json" } };
    const userData = await axios.post(
      "http://localhost:4000/api/users/signup",
      user,
      config
    );
    axios.defaults.headers.common["Authorization"] = `Bearer ${userData.data.userToken}`;
    localStorage.setItem("userToken", JSON.stringify({ userToken: userData.data.userToken }));
    dispatch(userSuccess(userData.data));
  } catch (error) {
    dispatch(userFail(error.response?.data?.message || "Signup failed"));
  }
};

// ✅ Logout User
export const logout = () => async (dispatch) => {
  try {
    dispatch(userRequest());
    localStorage.removeItem("userToken");
    dispatch(userLogout());
  } catch (error) {
    dispatch(userFail(error.response?.data?.message || "Logout failed"));
  }
};

// ✅ Get User Info
export const getUserDetails = () => async (dispatch) => {
  try {
    dispatch(userRequest());
    const userData = await axios.get("http://localhost:4000/api/users/me");
    dispatch(userSuccess(userData.data.user));
  } catch (error) {
    dispatch(userFail(error.response?.data?.message || "User info failed"));
  }
};
