import axios from 'axios'

async function put<T>(url: string, data: T) {
  return (await axios.put(url, data)).data
}

async function updateCategory(id: string, name: string, description: string) {
  const data = { id, name, description }
  return await put(`/api/Category/`, data)
}

async function updateService(
  id: string,
  name: string,
  description: string,
  categoryId: string,
  url: string,
  picFile: File | null,
  positive: string[],
  neutral: string[],
  negative: string[]
) {
  const formData = new FormData()
  formData.append('id', id)
  formData.append('name', name)
  formData.append('url', url);
  formData.append('description', description)
  formData.append('categoryId', categoryId)
  if (picFile) {
    formData.append('picFile', picFile)
  }

  const positiveS = JSON.stringify(positive);
  formData.append(`positive`, positiveS);
  const neutralS = JSON.stringify(neutral);
  formData.append(`neutral`, neutralS);
  const negativeS = JSON.stringify(negative);
  formData.append(`negative`, negativeS);

  return await put(`/api/Service`, formData)
}

export { updateCategory, updateService }
