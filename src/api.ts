export const makeRequest = async (data: any) => {
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