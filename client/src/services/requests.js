import axios from "axios";

const instance = axios.create({
  baseURL: 'http://localhost:4000/api/links',
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});
const baseURL = instance.defaults.baseURL;

export const getAllLinks = async () => {
  const response = await instance.get(baseURL);
  return response.data
}

export const getOneLink = async (id) => {
  const response = await instance.get(`${baseURL}/${id}`);
  return response.data
}

export const createLink = async (formData) => {
  const response = await instance.post(baseURL, formData)
  return response.data;
}

export const updateLink = async (id, formData) => {
  const response = await instance.put(`${baseURL}/${id}`, formData)
  return response.data;
};

export const deleteLink = async (id) => {
  const response = await instance.delete(`${baseURL}/${id}`)
  return response.data;
};

//    // lidar com a resposta
//    if (response.ok) {
//     alert('Formulário enviado com sucesso');
//   } else {
//     alert('Falha ao enviar o formulário');
//   }
// } catch (error) {
//   alert('Falha ao enviar o formulário');
// } finally {
//   // esconder o spinner de carregamento
//   setIsSubmitting(false);
// }