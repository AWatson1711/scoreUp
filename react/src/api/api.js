import { API_URL } from "../constants/api-url.constant";
import axios from "axios";

const getRequest = async (url, token = null) => {
  const config = {
    method: "GET",
    headers: { "Content-type": "application/json; charset=UTF-8" },
  };

  if (token) config.headers.Authorization = token;

  return await request(url, config);
};

const postRequest = async (url, body = {}, token = null) => {
  const config = {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  };

  if (token) config.headers.Authorization = token;

  return await request(url, config);
};

const putRequest = async (url, body = {}, token = null) => {
  const config = {
    method: "PUT",
    body: JSON.stringify(body),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  };

  if (token) config.headers.Authorization = token;

  return await request(url, config);
};

const deleteRequest = async (url, body = {}, token = null) => {
  const config = {
    method: "DELETE",
    body: JSON.stringify(body),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  };

  if (token) config.headers.Authorization = token;

  return await request(url, config);
};

const request = async (url, config) => {
  let status = -1;
  let error = null;
  let result = null;

  try {
    const response = await fetch(`${API_URL}${url}`, config);
    status = response.status;
    result = await response.json();
    console.log(result);
  } catch (e) {
    error = e.message;
  } finally {
    return handleResponse(result, status, error);
  }
};

const handleResponse = (result, status, error) => {
  const hasError = !result || status >= 400;
  return {
    status,
    result: hasError ? null : result,
    error: hasError ? `Result is null ${error || ""}` : null,
  };
};

export { getRequest, postRequest, putRequest, deleteRequest };
