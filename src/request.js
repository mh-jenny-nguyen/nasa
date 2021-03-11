const axios = require("axios");  
const APIURL = "https://pixabay.com/api";
const APIURL2 = "https://images-api.nasa.gov";

export const getImages = (page = 1) => {
  return axios.get(`${APIURL}/?page=${page}&key=20632548-b28bbb60b0f8fc89cd1c16574`);
}

export const searchImages = (keyword, page = 1) =>  {
  return axios.get(  
    `${APIURL}/?page=${page}&q=${keyword}&key=20632548-b28bbb60b0f8fc89cd1c16574`  
  );
}

export const getAllImg = (page = 1) => {
    return axios.get(`${APIURL2}/search?q=""&page=${page}&media_type=image`);
}

export const searchImgs = (keyword, page = 1) => {
    return axios.get(`${APIURL2}/search?q=${keyword}&page=${page}&media_type=image`);
}