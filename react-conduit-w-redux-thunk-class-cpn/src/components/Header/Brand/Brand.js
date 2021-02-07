import React from 'react';
import { Link } from 'react-router-dom';

const brand = _ => {
  return (
    <Link
      className="navbar-brand"
      to="/"
    >
      conduit
    </Link>
  )
}

export default brand;
