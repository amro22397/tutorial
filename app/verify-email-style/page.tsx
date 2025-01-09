import React from 'react'
import './page.css'

const page = () => {
    const email = "amroalmutasim22@gmail.com";
  return (
    <div>
  <div>
    <style>
      
    </style>
  </div>
  <div>
    <div class="container">
      <h1>Verify Your Email Address</h1>
      <p class="">
        Thank you for signing up! To complete your registration, please click
        the button below to verify your email address.
      </p>
      <a href={''/*verificationLink*/} className="button">Verify Email</a>
      <p class="expire-time">This link will expire in 30 minutes.</p>
    </div>
  </div>
</div>
  )
}

export default page
