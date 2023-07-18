const listPurchase = async (credentials) => {
  try {
    let response = await fetch(`${import.meta.env.VITE_API_URL}/api/purchase`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials
      },
    })
    return await response.json()
  } catch (err) {
    console.log(err)
  }
}

const create = async (data, credentials, supplierId, productId) => {
  try {
    let response = await fetch(`${import.meta.env.VITE_API_URL}/api/purchase/${supplierId}/${productId}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials
      },
      body: JSON.stringify(data)
    })
    return await response.json()
  } catch (err) {
    console.log(err)
  }
}

const destroy = async (id, credentials) => {
  try {
    let response = await fetch(`${import.meta.env.VITE_API_URL}/api/purchase/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials
      },
    })
    return await response.json()
  } catch (err) {
    console.log(err)
  }
}

const find = async (id, credentials) => {
  try {
    let response = await fetch(`${import.meta.env.VITE_API_URL}/api/purchase/${id}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials
      },
    })
    return await response.json()
  } catch (err) {
    console.log(err)
  }
}

const update = async (id, credentials, data) => {
  try {
    console.log(id)
    let response = await fetch(`${import.meta.env.VITE_API_URL}/api/purchase/${id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials
      },
      body: JSON.stringify(data)
    })
    return await response.json()
  } catch (err) {
    console.log(err)
  }
}

export default {
  listPurchase,
  create,
  destroy,
  find,
  update,
}