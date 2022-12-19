import axios from 'axios'
import Category from '../Types/Category'

import Service from '../Types/Service'

async function getRequest(url: string) {
  return (await axios.get(url)).data
}

async function getServices(currentPage: number, itemsOnPage: number) {
  const params = new URLSearchParams(window.location.search)
  const search = params.get('search')
  let url = `/api/Service?Page=${currentPage}&ItemsOnPage=${itemsOnPage}`
  if (search) {
    url += `&search=${search}`
  } else {
    url += `&search=""`
  }

  return await getRequest(url)
}

async function getReviews(serviceId: string) {
  return await getRequest(`/api/Review/${serviceId}`)
}

async function getService(url: string) {
  return await getRequest(`/api/Service/url/${url}`)
}

async function getServiceById(serviceId: string) {
  return await getRequest(`/api/Service/id/${serviceId}`)
}

async function getSearchedServices(
  currentPage: number,
  itemsOnPage: number,
  search: string,
) {
  const url = `/api/Service/all?Page=${currentPage}&ItemsOnPage=${itemsOnPage}&search=${search}`

  return await getRequest(url)
}

async function getAllCategories(useSearch: boolean) {

  const params = new URLSearchParams(window.location.search)
  const search = params.get('search')
  let url = '/api/Category?'
  if (useSearch && search) {
    url += `search=${search}`
  } else {
    url += `search=""`
  }

  return (await getRequest(url)) as Category[]
}

async function getCategoryServices(
  categoryId: string,
  currentPage: number,
  itemsOnPage: number,
) {
  let url = `/api/Category/${categoryId}?PageNumber=${currentPage}&ItemsOnPage=${itemsOnPage}`
  return await getRequest(url)
}

async function getCategory(
  categoryId: string,
) {
  let url = `/api/Category/id/${categoryId}`
  return await getRequest(url)
}

async function getClients() {
  return await getRequest(`/api/Account/GetClients`);
}

export default getRequest

export {
  getRequest,
  getCategoryServices,
  getCategory,
  getServiceById,
  getAllCategories,
  getReviews,
  getServices,
  getService,
  getSearchedServices,
  getClients,
}
