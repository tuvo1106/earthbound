/* eslint-disable */
import axios from 'axios'
import { showAlert } from './alerts'

const stripe = Stripe('pk_test_kxLc36OyS7Y3bQ2F2QWPfIJg00Ogu4lqMB')

export const bookTour = async tourId => {
  try {
    // get checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`)
    // create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    })
    // 4242-4242-4242 cc number
  } catch (err) {
    showAlert('error', err)
  }
}
