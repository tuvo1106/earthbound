import '@babel/polyfill'
import { login, logout } from './login'
import { signUp } from './signUp'
import { displayMap } from './mapbox'

// dom elements
const mapBox = document.getElementById('map')
const loginForm = document.querySelector('.form')
const logoutBtn = document.querySelector('.nav__el--logout')
const signUpBtn = document.querySelector('.form__signUp')

// delegation
if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations)
  displayMap(locations)
}

if (loginForm) {
  loginForm.addEventListener('submit', e => {
    e.preventDefault()
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    login(email, password)
  })
}

if (logoutBtn) {
  logoutBtn.addEventListener('click', logout)
}

if (signUpBtn) {
  signUpBtn.addEventListener('submit', e => {
    e.preventDefault()
    const name = document.getElementById('name').value
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const passwordConfirm = document.getElementById('passwordConfirm').value
    signUp(name, email, password, passwordConfirm)
  })
}
