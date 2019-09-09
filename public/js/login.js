import axios from 'axios'
import { showAlert } from './alerts'

export const login = async (email, password) => {
  console.log(email)
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:3000/api/v1/users/login',
      data: {
        email,
        password
      }
    })

    if (res.data.status === 'success') {
      showAlert('success', 'logged in successfully')
      // reload front page
      window.setTimeout(() => {
        location.assign('/', 1500)
      })
    }
  } catch (err) {
    showAlert('error', err.response.data.message)
  }
}
