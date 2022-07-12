import { Outlet, Link } from "react-router-dom";
import { Fragment } from "react";

import CartIcon from "../../components/cart-icon/cart-icon.component";

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'

import { UserContext } from "../../contexts/user.contexts";
import { signOutUser } from "../../utils/firebase/firebase.utils";

import "./navigation.styles.scss";
import { useContext } from "react";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { CartContext } from "../../contexts/cart.context";

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);

  

    return (
      <Fragment>
        <div className="navigation">
            <Link className="logo-container" to="/">
                <CrwnLogo className="logo" />
            </Link>
            <div className="nav-links-container">
                <Link className="nav-link" to="/shop" >SHOP</Link>
                {
                  currentUser ? 
                  <span className="nav-link"  onClick={signOutUser}>SIGN OUT</span>
                  : (<Link className="nav-link" to="/auth" >SIGN IN</Link>)
                }
                <CartIcon />
            </div>
        </div>
        {isCartOpen && <CartDropdown />}
        <Outlet />
      </Fragment>
    )
  }

  export default Navigation;