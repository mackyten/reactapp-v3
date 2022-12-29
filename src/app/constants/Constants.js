export const API_BASE_URL = "https://localhost:7288";

const EndPoints = {
  GET_ALL_NOTES: "api/Note/GetAllNotes",
  POST_NOTE: "api/Note/CreateNewNote",
  PUT_NOTE: "api/Note",
  DELETE_NOTE: `api/Note`,

  LOG_IN: "api/User/SigIn",
  REGISTER: "api/User/SignUp",
};

const development = {
  API_URL_GET_ALL_NOTES: `${API_BASE_URL}/${EndPoints.GET_ALL_NOTES}`,
  API_URL_POST_NOTE: `${API_BASE_URL}/${EndPoints.POST_NOTE}`,
  API_URL_PUT_NOTE: `${API_BASE_URL}/${EndPoints.PUT_NOTE}`,
  API_URL_DELETE_NOTE: `${API_BASE_URL}/${EndPoints.DELETE_NOTE}`,

  API_URL_LOGIN: `${API_BASE_URL}/${EndPoints.LOG_IN}`,
  API_URL_REGISTER: `${API_BASE_URL}/${EndPoints.REGISTER}`,
};

const Constants = development;
export default Constants;
