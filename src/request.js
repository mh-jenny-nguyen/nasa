const axios = require("axios");  
const API_URL = "https://images-api.nasa.gov";

export const getAllImg = (page = 1) => {
    return axios.get(`${API_URL}/search?q=""&page=${page}&media_type=image`);
}

export const searchImgs = (keyword, page = 1) => {
    return axios.get(`${API_URL}/search?q=${keyword}&page=${page}&media_type=image`);
}

export const getPostDetail = (nasa_id) => {
  return axios.get(`${API_URL}/search?nasa_id=${nasa_id}`);
}