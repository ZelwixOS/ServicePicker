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

export {
  createReview,
  banUser,
  unbanUser,
  publishService,
  unpublishService,
  banReview,
};
