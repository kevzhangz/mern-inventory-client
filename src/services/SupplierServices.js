const listSupplier = async (credentials) => {
  try {
    let response = await fetch(`${import.meta.env.VITE_API_URL}/api/supplier`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer + ' + credentials
      },
    })
    return await response.json()
  } catch (err) {
    console.log(err)
  }
}

const create = async (data, credentials) => {
  try {
    let response = await fetch(`${import.meta.env.VITE_API_URL}/api/supplier`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer + ' + credentials
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
    let response = await fetch(`${import.meta.env.VITE_API_URL}/api/supplier/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer + ' + credentials
      },
    })
    return await response.json()
  } catch (err) {
    console.log(err)
  }
}

const find = async (id, credentials) => {
  try {
    let response = await fetch(`${import.meta.env.VITE_API_URL}/api/supplier/${id}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer + ' + credentials
      },
    })
    return await response.json()
  } catch (err) {
    console.log(err)
  }
}

const update = async (id, credentials, supplier) => {
  try {
    console.log(id)
    let response = await fetch(`${import.meta.env.VITE_API_URL}/api/supplier/${id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer + ' + credentials
      },
      body: JSON.stringify(supplier)
    })
    return await response.json()
  } catch (err) {
    console.log(err)
  }
}

export default {
  listSupplier,
  create,
  destroy,
  find,
  update,
}