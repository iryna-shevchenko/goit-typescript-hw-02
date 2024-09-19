

import axios from "axios";

axios.defaults.baseURL = "https://api.unsplash.com";
const accessKey = "lwiqZWRNJ4RdyRcHXenPAn-hoQk7YnfOHPxDzjQQfxU";


interface Image {
  id: string; 
  urls: {
    small: string;
    regular: string;
  };
  alt_description: string;
  user: {
    name: string;
  };
  likes: number; 
}

export const fetchImages = async (
  query: string,
  page: number
): Promise<Image[]> => {
  const response = await axios.get("/search/photos", {
    params: {
      query,
      client_id: accessKey,
      page,
      per_page: 12,
    },
  });

  return response.data.results as Image[]; 
};
