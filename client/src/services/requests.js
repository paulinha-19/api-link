export const getAllLinks = async () => {
  try {
    const response = await fetch("http://localhost:4000/api/links");
    const data = await response.json();
    console.log("FETCHITEM", data);
    return data;
  }
  catch (error) {
    console.error(`Erro: ${error}`);
    return error
  }
}