export const API_BASE_URL = "https://localhost:7231";

const EndPoints = {
  GET_ALL_NOTES: "api/Notes",
  POST_NOTE: "api/Notes",
  PUT_NOTE: "api/Notes",
  GET_NOTE_BY_ID: `api/Notes`,
  DELETE_NOTE: `api/Notes`,

  LOG_IN: "api/AuthService/login",
  REGISTER: "api/AuthService/register",
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
