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

async function getService(serviceId: string) {
  return await getRequest(`/api/Service/${serviceId}`)
}

async function getSearchedServices(
  currentPage: number,
  itemsOnPage: number,
  search: string,
) {
  const url = `/api/Product?PageNumber=${currentPage}&ItemsOnPage=${itemsOnPage}&search=${search}`
  return await getRequest(url)
}

async function getAllCategories() {
  return (await getRequest(`/api/Category/`)) as Category[]
}

async function getCategoryServices(
  categoryId: string,
  currentPage: number,
  itemsOnPage: number,
) {
  let url = `/api/Category/${categoryId}?PageNumber=${currentPage}&ItemsOnPage=${itemsOnPage}`
  return await getRequest(url)
}

export default getRequest

export {
  getRequest,
  getCategoryServices,
  getAllCategories,
  getReviews,
  getServices,
  getService,
  getSearchedServices,
}
