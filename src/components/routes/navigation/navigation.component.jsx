
import { Fragment, useContext } from "react";
import { Outlet } from "react-router-dom"
import {
    NavigationContainer,
    LogoContainer,
    NavLinks,
    NavLink
} from './navigation.styles'
import { ReactComponent as CrwnLogo } from '../../../assets/crown.svg'
import CartIcon from "../../cart-icon/cart-icon.component";
import { UserContext } from "../../../context/user.context";
import { signOutUser } from "../../../utils/firebase/firebase.utils";
import CartDropdown from "../../cart-dropdown/cart-dropdown.component";
import { CartContext } from "../../../context/cart.context";

const Navigation = () => {
    const { currentUser } = useContext(UserContext);
    const { isCartOpen } = useContext(CartContext)
    return (<Fragment>
        <NavigationContainer>
            <LogoContainer to='/'>
                <CrwnLogo className="logo" />
            </LogoContainer>
            <NavLinks>
                <NavLink to='/shop'>
                    SHOP
                </NavLink>
                {
                    currentUser ? (<NavLink as='span' onClick={signOutUser}>
                        SIGN OUT</NavLink>) : (
                        <NavLink to='/auth'>
                            SIGN IN
                        </NavLink>
                    )
                }
                <CartIcon />
            </NavLinks>
            {
                isCartOpen && <CartDropdown />
            }
        </NavigationContainer>
        <Outlet />
    </Fragment>)
}
export default Navigation;