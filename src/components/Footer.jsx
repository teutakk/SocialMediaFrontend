import React from 'react'
import { Link } from 'react-router-dom'
import classes from "./Footer.module.css"

const Footer = () => {
  return (
    <div className={classes.footerList}>
         <Link to="">About</Link>
         <Link to="">Accessibly</Link>
         <Link to="">Help Center</Link>
         <Link to="">Privacy & Terms</Link>
         <Link to="">Name Corporation © 2023</Link>
    </div>
  )
}

export default Footer