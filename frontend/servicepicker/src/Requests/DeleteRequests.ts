import axios from 'axios';

async function deleteRequest<T>(url: string) {
  return (await axios.delete(url)).data;
}

async function deleteCategory(id: string) {
  return await deleteRequest(`/api/Category/${id}`);
}

async function deleteService(id: string) {
  return await deleteRequest(`/api/Service/${id}`);
}

export {
  deleteCategory,
  deleteService,
};
