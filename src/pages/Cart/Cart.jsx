import React,{useEffect} from 'react'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import {removeFromCart,decresCart, addToCart, getTotals} from '../../Redux/cartRedux'
import './cart.css'

const Cart = () => {

    
    const cart = useSelector(state=>state.cart)
    const dispatch = useDispatch()
    const handleRemoveCart = (product) =>{
        dispatch(removeFromCart(product))
    }

    const handleDecres = (product) =>{
        dispatch(decresCart(product))
    }

    const handleIncret = (product) =>{
        dispatch(addToCart(product))
    }

    useEffect(()=>{
        dispatch(getTotals())
    },[cart,dispatch])

    return (
        <div className='cartcontainer'>
            <div className="btn">
                <Link to='/'><button>Alis-verise don</button></Link>
                <span>${cart.cartTotalAmount}</span>
            </div>
            {
                cart.carts.map(cart=>(
                    <div key={cart.url}> 
                    <div className="cart" >
                    <div className="image">
                        <img src={cart.image} alt="img" />
                    </div>
                    <div className="text">
                        <div className="title">
                            <p>Title : {cart.title}</p>
                        </div>
                        <div className="price">
                            <p>Price : {cart.price}</p>
                        </div>
                        <div className="remove">
                            <DeleteOutlineOutlinedIcon  
                            style={{cursor:'pointer'}} 
                            onClick={()=>handleRemoveCart(cart)}
                            />
                        </div>
                    </div>
                </div>
    
                <div className="quantity">
                        <RemoveIcon style={{cursor:'pointer'}} onClick={()=>handleDecres(cart)}/>
                        <span>{cart.cartQuantity}</span>
                        <AddIcon style={{cursor:'pointer'}} onClick={()=>handleIncret(cart)} />
                    </div>
                    <hr />
                </div>
                ))
            }
           
        </div>
    )
}

export default Cart
