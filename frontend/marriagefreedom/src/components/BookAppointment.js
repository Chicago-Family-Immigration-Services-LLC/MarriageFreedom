import React from 'react'
import { Helmet } from 'react-helmet'

function BookAppointment () {
  return (
    <div>
      <Helmet>
        <title>
          Book an Appointment - Illinois Family Law & Divorce Attorneys
        </title>
        <meta
          name='description'
          content='Schedule a $199 consultation with experienced Illinois family law and divorce attorneys for adoptions, child custody, child support, guardianship, order of protection, prenuptial agreements, postnuptial agreements, enforcement of judgments, alimony, spousal support, and legal separation cases.'
        />
        <meta
          name='keywords'
          content='Illinois, adoptions, family lawyers, divorces, divorce attorneys, child custody, child support, guardianship, order of protection, prenuptial agreements, postnuptial agreements, enforcement of judgments, alimony, spousal support, legal separation'
        />
      </Helmet>
      <h1>Book an Appointment</h1>
      <p>
        Schedule a 45-minute consultation with an attorney for $199. Our
        experienced attorneys can assist you with adoptions, child custody,
        child support, guardianship, order of protection, prenuptial agreements,
        postnuptial agreements, enforcement of judgments, alimony, spousal
        support, and legal separation cases.
      </p>
      <div style={{ width: '100%', height: '800px' }}>
        <iframe
          src='https://calendly.com/chiattorney/attorney-consultation'
          width='100%'
          height='100%'
          frameBorder='0'
          title='Book Appointment'
        />
      </div>
    </div>
  )
}

export default BookAppointment
