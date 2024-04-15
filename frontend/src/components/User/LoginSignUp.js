import React, { Fragment, useRef,useState ,useEffect } from 'react'
import "./LoginSignUp.css"
import Loader from '../layout/Loader/Loader';
import { Link } from 'react-router-dom';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FaceIcon from '@material-ui/icons/Face';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import {useDispatch,useSelector} from 'react-redux';
import { clearErrors,login , register} from '../../actions/userAction';
import {useAlert} from 'react-alert';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';




const LoginSignUp = () => {
    const location = useLocation();
    const redirect=  location.search ? location.search.split("=")[1] : "/account";
    const navigate = useNavigate();
    const alert = useAlert();
    const dispatch = useDispatch();
    const loginTab = useRef(null);
    const registerTab = useRef(null);
    const switcherTab = useRef(null);
    const {loading,error,isAuthenticated} = useSelector(state => state.user);

    const [loginEmail,setLoginEmail] = useState('');
    const [loginPassword,setLoginPassword] = useState('');
    const [user,setUser] = useState({
        name:'',
        email:'',
        password:'',
    
    });

    const {name,email,password} = user;
    const [avatar,setAvatar] = useState('');
    const [avatarPreview,setAvatarPreview] = useState('/profile.png');

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (isAuthenticated) {
            navigate(redirect);
        }
    }, [dispatch, error, alert, navigate, isAuthenticated, redirect]);

    const switchTabs =(e,tab)=>{
        if(tab === "login"){
            switcherTab.current.classList.add("shiftToNeutral");
            switcherTab.current.classList.remove("shiftToRight");

            registerTab.current.classList.remove("shiftToNeutralForm");
            loginTab.current.classList.remove("shiftToLeft");
        }else if(tab === "register"){
            switcherTab.current.classList.add("shiftToRight");
            switcherTab.current.classList.remove("shiftToNeutral");

            registerTab.current.classList.add("shiftToNeutralForm");
            loginTab.current.classList.add("shiftToLeft");
        }
    }
    const loginSubmit =(e) =>{
        e.preventDefault();
        
        dispatch(login(loginEmail,loginPassword));
    }

    const registerSubmit =(e) =>{
        e.preventDefault();
        const myForm = new FormData();
        myForm.set('name',name);
        myForm.set('email',email);
        myForm.set('password',password);
        myForm.set('avatar',avatar);
        dispatch(register(myForm));
    }

    const registerDataChange =(e) =>{
        if(e.target.name === 'avatar'){
            const reader = new FileReader();
            reader.onload = () =>{
                if(reader.readyState === 2){
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            }
            reader.readAsDataURL(e.target.files[0]);
        }else{
            setUser({...user,[e.target.name]:e.target.value});
        }
    }

  return (
  

<Fragment>
  {loading ? <Loader/> : 
  <Fragment>
    {/* Warning message */}
    <div style={{ color: 'red', marginBottom: '10px' }}>
      Use images with size less than 1MB only to avoid internal server error.
    </div>

    <div className="LoginSignUpContainer">
      <div className='LoginSignUpBox'>
        <div>
          <div className='login_signUp_toggle'>
            <p onClick={(e)=> switchTabs(e,"login")}>Login</p>
            <p onClick={(e)=> switchTabs(e,"register")}>Register</p>
          </div>
          <button ref ={switcherTab}></button>
        </div>
        <form className='loginForm' ref={loginTab} onSubmit={loginSubmit}>
          {/* Login form inputs */}
        </form>

        <form className='signUpForm' ref={registerTab} encType='multipart/form-data' onSubmit={registerSubmit}>
          {/* Registration form inputs */}
        </form>
      </div>
    </div>
  </Fragment>}
</Fragment>
   
  )
}

export default LoginSignUp