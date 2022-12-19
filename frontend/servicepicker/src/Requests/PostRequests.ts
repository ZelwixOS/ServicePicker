import axios from 'axios';

async function post<T>(url: string, data: T) {
  return (await axios.post(url, data)).data;
}

async function createReview(serviceId: string, mark: number, description: string) {
  return await post(`/api/Review/`, { serviceId: serviceId, mark: mark, description: description });
}

async function banUser(id: string) {
  return await post(`/api/Account/Ban/${id}`, null);
}

async function unbanUser(id: string) {
  return await post(`/api/Account/Unban/${id}`, null);
}

async function publishService(serviceId: string) {
  return await post(`/api/Service/publish/${serviceId}`, null);
}

async function unpublishService(serviceId: string) {
  return await post(`/api/Service/unpublish/${serviceId}`, null);
}

async function banReview(id: string) {
  return await post(`/api/Review/Ban/${id}`, null);
}

async function createCategory(name: string, description: string) {
  const data = { name: name, description: description };
  return await post(`/api/Category`, data);
}

async function createService(
  name: string,
  description: string,
  categoryId: string,
  url: string,
  picFile: File | null,
  positive: string[],
  neutral: string[],
  negative: string[]
) {
  const formData = new FormData();
  formData.append('name', name);
  formData.append('url', url);
  formData.append('categoryId', categoryId);
  formData.append('description', description);
  if (picFile) {
    formData.append('picFile', picFile);
  }

  const positiveS = JSON.stringify(positive);
  formData.append(`positive`, positiveS);
  const neutralS = JSON.stringify(neutral);
  formData.append(`neutral`, neutralS);
  const negativeS = JSON.stringify(negative);
  formData.append(`negative`, negativeS);

  return await post(`/api/Service`, formData);
}

export {
  createReview,
  createCategory,
  createService,
  banUser,
  unbanUser,
  publishService,
  unpublishService,
  banReview,
};
