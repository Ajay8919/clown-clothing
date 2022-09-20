import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component"
import './product-card.styles.scss'
import { CartContext } from "../../context/cart.context";
import { useContext } from "react";
const ProductCard = ({product})=>{
    const  {addItemToCart} =useContext(CartContext)
    const {name,price,imageUrl} = product;
   const addProductToCart=()=>{
    addItemToCart(product)
    console.log('adding product');
}
    return <div className="product-card-container">
    <img src={imageUrl} alt={`${name}`}/>
    <div className="footer">
    <span className="name">{name}</span>
    <span className="price">{price}</span>
    </div>
    <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProductToCart}>Add to card</Button>
    </div>
}

export default ProductCard;