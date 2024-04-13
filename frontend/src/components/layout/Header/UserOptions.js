import React, { Fragment ,useState} from 'react'
import "./Header.css"
import { Backdrop } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ListAltIcon from '@material-ui/icons/ListAlt';
import PersonIcon from '@material-ui/icons/Person';
import {useNavigate} from 'react-router-dom'
import {useAlert} from 'react-alert'
import { logout } from '../../../actions/userAction';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';


import { SpeedDial, SpeedDialAction } from '@material-ui/lab'
import { useDispatch ,useSelector } from 'react-redux';

const UserOptions = ({user}) => {
    const {cartItems} = useSelector(state => state.cart)
    
    const dispatch = useDispatch()
    const alert = useAlert()

    const navigate = useNavigate()
    
 const [open, setOpen] = React.useState(false);
 



 

const cart = () => {
    navigate('/cart')
}

const dashboard = () => {
    navigate('/admin/dashboard')
}
const orders = () => {
    navigate('/orders')
}
const account = () => {
    navigate('/account')

}

const logoutUser = () => {
    dispatch(logout())
    alert.success('Logged out successfully')
}
const options =[
    
    {icon:<ListAltIcon />,name:"Orders" ,func:orders},
    {icon:<PersonIcon />,name:"Profile", func:account},
    {
        icon: (
          <ShoppingCartIcon
            style={{ color: cartItems.length > 0 ? "tomato" : "unset" }}
          />
        ),
        name: `Cart(${cartItems.length})`,
        func: cart,
      },
    {icon:<ExitToAppIcon />,name:"Logout",func:logoutUser },
 ] 
 if (user.role === 'admin'){
    options.unshift({icon:<DashboardIcon />,name:"Dashboard",func:dashboard})
    }

  return (
    <Fragment>
        <Backdrop open={open}  style={{zIndex:10}}/>
        <SpeedDial


            ariaLabel="SpeedDial tooltip example"
            className="speedDial"
            onClose={()=> setOpen(false)}
            onOpen={()=> setOpen(true)}
            direction="down"
            open={open}
            style={{zIndex:11}}

             icon={<img className='speedDialIcon' src={user.avatar.url ? user.avatar.url : "./profile.png" } alt={user.name} />}
        >
            
            {options.map((option) => (
            <SpeedDialAction
                key={option.name}
                icon={option.icon}
                tooltipTitle={option.name}
                onClick={option.func}
                tooltipOpen={window.innerWidth <= 600 ? true : false}
            />
            ))}

        </SpeedDial>
    </Fragment>
  )
}

export default UserOptions