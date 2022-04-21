import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn, User}) => (
    <div id="navbar" className="navbar">
      <h1 id="title">
        <Link to="/home">TeaTokens</Link>
      </h1>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <h3>Welcome, {User.name.split(' ')[0]}!</h3>
          <Link to="/aboutus">About Us</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
          <Link to={`/users/${user.id}/profile`}>Profile</Link>
          <Link to="/cart">Cart</Link>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/aboutus">About Us</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
          <Link to="/cart">Cart</Link>
        </div>
      )}
    </nav>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.auth.id,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)
