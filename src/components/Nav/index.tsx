import React, { CSSProperties } from 'react'
import { RouteComponentProps, Link } from '@reach/router';

const Nav = (props: RouteComponentProps)  => {

  const navStyle: CSSProperties = {
    display: "flex", 
    justifyContent: "space-around"
  }

  return (
    <nav style={navStyle}>
      <Link to="/main">EXPLORE</Link>
      <Link to="/saved">SAVED</Link>
      <Link to="/search">SEARCH</Link>
      <Link to="/inbox">INBOX</Link>
      <Link to="/login">LOG IN</Link>
    </nav>
  )
}

export default Nav;