import axios from "axios";

axios.defaults.baseURL = "https://api.unsplash.com";
const accessKey = "lwiqZWRNJ4RdyRcHXenPAn-hoQk7YnfOHPxDzjQQfxU";

export const fetchImages = async (query, page) => {
  const response = await axios.get("/search/photos", {
    params: {
      query,
      client_id: accessKey,
      page,
      per_page: 12,
    },
  });

  return response.data.results;
};
