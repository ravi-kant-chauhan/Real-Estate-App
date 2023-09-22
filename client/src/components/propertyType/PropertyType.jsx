import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'
import img from '../../assets/estate3.jpg'
import { request } from '../../util/fetchAPI'
import person from '../../assets/person.jpg'
import { Link } from 'react-router-dom'
import { FaBed, FaSquareFull } from 'react-icons/fa'
import classes from './propertyType.module.css'
import { continentToIdx } from '../../util/idxToContinent'

const PropertyType = () => {
    const [allProperties, setAllProperties] = useState([])
    const [featuredProperties, setFeaturedProperties] = useState([])
    const [state, setState] = useState(null)
  const query = (useLocation().search).slice(1) // slice(1) to remove "?"
  const arrQuery = query.split("&")
  const navigate = useNavigate()

    useEffect(() => {
    const fetchAllProperties = async() => {
      const data = await request(`/property/getAll`, 'GET')
      setAllProperties(data)
    }
    fetchAllProperties()
  }, [])

  useEffect(() => {
    if (arrQuery && allProperties?.length > 0 && state === null) {
      let formattedQuery = {}
      arrQuery.forEach((option, idx) => {
        const key = option.split("=")[0]
        const value = option.split("=")[1]

        formattedQuery = { ...formattedQuery, [key]: value }

        // if we are on the last index, assign the formattedQuery obj to state
        if (idx === arrQuery.length - 1) {
          setState(prev => formattedQuery)
          handleSearch(formattedQuery)
        }
      })
    }
  }, [allProperties, arrQuery])

//   const handleState = (e) => {
//     setState(prev => {
//       return { ...prev, [e.target.name]: e.target.value }
//     })
//   }


  const handleSearch = (param = state) => {
    let options
    // we either pass the formattedObj or event, that's why we do the IF/ELSE
    if (param?.nativeEvent) {
      options = state
    } else {
      options = param
    }
    const featuredProperties = allProperties.filter((property) => {


      if (
        property.type === options.type
      ) {
        return property
      }
    })

    const queryStr = `type=${options.type}`

    navigate(`/propertyType?${queryStr}`, { replace: true })
    setFeaturedProperties(prev => featuredProperties)
  }
  
    return (
      <div className={classes.container}>
        <div className={classes.wrapper}>
            {
                featuredProperties?.length > 0 ?
                <>
          <div className={classes.titles}>
            <h5>Properties you may like</h5>
            <h2>Our Featured Properties</h2>
          </div>
          <div className={classes.featuredProperties}>
            {featuredProperties?.map((property) => (
                <div key={property._id} className={classes.featuredProperty}>
                <Link to={`/propertyDetail/${property._id}`} className={classes.imgContainer}>
                  <img src={`http://localhost:5000/images/${property?.img}`} alt="" />
                </Link>
                <div className={classes.details}>
                  <div className={classes.priceAndOwner}>
                    <span className={classes.price}>${property?.price}</span>
                    <img src={`http://localhost:5000/images/${property?.currentOwner?.profileImg}`} className={classes.owner} />
                  </div>
                  <div className={classes.moreDetails}>
                      <span>{property.beds} <FaBed className={classes.icon} /></span>
                      <span>{property.sqmeters} square meters<FaSquareFull className={classes.icon} /></span>
                  </div>
                  <div className={classes.desc}>
                    {property.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
            </> : <h2 className={classes.noProperty}>We have no properties with the specified options.</h2>
        }
        </div>
      </div>
    )
}

export default PropertyType