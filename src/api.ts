export const makePostRequest = async (data: any) => {
  try {
    return await fetch(`/api`, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  } catch (error) {
    console.log(error);
  }
};

export const makeGetRequest = async (count: number) => {
  try {
    return await fetch(`/api?count=${count}`, {
      method: 'GET',
    });
  } catch (error) {
    console.log(error);
  }
};