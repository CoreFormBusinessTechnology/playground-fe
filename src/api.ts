export const makePostRequest = async (data: any) => {
  try {
    await fetch(`/api`, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  } catch (error) {
    console.log(error);
    alert("Failed to end data to the server!");
  }
};

export const makeGetRequest = async (count: number) => {
  try {
    await fetch(`/api?count=${count}`, {
      method: 'GET',
    });
  } catch (error) {
    console.log(error);
    alert("Orders will be synced in the background!");
  }
};