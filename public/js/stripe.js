import axios from 'axios'
import { showAlert } from './alerts'

const stripe = Stripe('pk_test_kxLc36OyS7Y3bQ2F2QWPfIJg00Ogu4lqMB')

export const bookTour = async tourId => {
  try {
    // get checkout session from API
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`
    )
    // create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    })
    // 4242-4242-4242 cc number
  } catch (err) {
    console.log(err)
    showAlert('error', err)
  }
}
