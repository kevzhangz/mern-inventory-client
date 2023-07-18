const listSell = async (credentials) => {
  try {
    let response = await fetch(`${import.meta.env.VITE_API_URL}/api/sell`, {
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

const create = async (data, credentials, productId) => {
  try {
    let response = await fetch(`${import.meta.env.VITE_API_URL}/api/sell/${productId}`, {
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
    let response = await fetch(`${import.meta.env.VITE_API_URL}/api/sell/${id}`, {
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
    let response = await fetch(`${import.meta.env.VITE_API_URL}/api/sell/${id}`, {
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
    let response = await fetch(`${import.meta.env.VITE_API_URL}/api/sell/${id}`, {
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
  listSell,
  create,
  destroy,
  find,
  update,
}