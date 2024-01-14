import { json, useNavigate } from 'react-router-dom';
import logo from './../../assets/logo.PNG';
import styles from './Navbar.module.css';
import LogoutIcon from '@mui/icons-material/Logout';
import { useEffect, useState } from 'react';
const Navbar = () => {
    const [username, setUsername] =useState();
    useEffect(()=>{
        if(localStorage.getItem('finz-username')){
            setUsername(JSON.parse(localStorage.getItem('finz-username')));
        }
    },[])
    if(['/','/signup'].includes(window.location.pathname)) return null;
    return (
    <div className={styles.navbar}>
        <img src={logo} alt='FinZ'/>
        <div className={styles.avatar}>{username?.slice(0,1)}</div>
    </div>
    )
}

export default Navbar;