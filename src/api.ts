import axios from 'axios';

export const makeRequest = async (data: any) => {
  try {
    await axios.post(`/api`, data, {
      timeout: 1000,
      headers: {
        Accept: '*/*',
      },
    });
  } catch (error) {
    console.log(error);
    alert("Failed to end data to the server!");
  }
};