import React from 'react'
import classes from './footer.module.css'

const Footer = () => {
  return (
    <footer>
      <div className={classes.wrapper}>
        <div className={classes.col}>
          <h2>About the App</h2>
          <p>
          Welcome to Dwellings! Your trusted partner in finding the perfect property.
          Explore our diverse range of listings, each thoughtfully curated to cater to 
          your unique preferences and requirements. Whether you're buying or selling,
          Dwelling is here to transform your real estate aspirations into reality. 
           Discover your next chapter with us today
          </p>
        </div>
        <div className={classes.col}>
          <h2>Contacts</h2>
          <span>Phone: +91 9140381636</span>
          <span>LinkedIn: RaviKantChauhan</span>
          <span>GitHub: RaviKantChauhan</span>
        </div>
        <div className={classes.col}>
          <h2>Location</h2>
          <span>Continent: Asia</span>
          <span>Country: India</span>
          <span>Current Location: India</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer