import React from 'react'

const Checkout = props => {
  const orderInformation = JSON.parse(localStorage.getItem('completedCart'))
  const userInfo = JSON.parse(localStorage.getItem('userInfo')).data
  return (
    <div className="thank-you-page">
      <h1>Thank You For Your Order!</h1>
      <h2>Order Number: {orderInformation.id}</h2>
      <h2>Total: ${orderInformation.total / 100} USD</h2>
      <h3>Your potatoes will be sent to the address we have on file:</h3>
      <ul>Name: {userInfo.name}</ul>
      <ul>Email: {userInfo.email}</ul>
    </div>
  )
}

export default Checkout
