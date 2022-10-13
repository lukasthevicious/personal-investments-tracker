import { CLEAR_AUTH_ERROR } from "../../constants/actionTypes";
import { AUTH, AUTH_ERROR, LOGOUT } from "../../constants/actionTypes";
import { AuthActions } from "../../common/modelTypes";

const authState = {
  authData: null,
  error: false,
  errorMessage: "",
};

export default (state = authState, action: AuthActions) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action?.data };
    case LOGOUT:
      localStorage.clear();
      return { ...state, authData: null };
    case AUTH_ERROR:
      return { ...state, error: true, errorMessage: action?.data };
    case CLEAR_AUTH_ERROR:
      return { ...state, error: false, errorMessage: "" };
    default:
      return state;
  }
};