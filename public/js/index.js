import '@babel/polyfill'
import { login, logout } from './login'
import { signUp } from './signUp'
import { displayMap } from './mapbox'
import { bookTour } from './stripe'

// dom elements
const mapBox = document.getElementById('map')
const loginForm = document.querySelector('.form__login')
const logoutBtn = document.querySelector('.nav__el--logout')
const signUpBtn = document.querySelector('.form__signUp')
const bookBtn = document.getElementById('book-tour')

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

if (bookBtn) {
  bookBtn.addEventListener('click', e => {
    e.target.textContent = 'Processing...'
    const { tourId } = e.target.dataset
    bookTour(tourId)
  })
}
