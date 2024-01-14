import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.css';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import SavingsRoundedIcon from '@mui/icons-material/SavingsRounded';
import CreditScoreRoundedIcon from '@mui/icons-material/CreditScoreRounded';
import LibraryBooksRoundedIcon from '@mui/icons-material/LibraryBooksRounded';
import EditCalendarRoundedIcon from '@mui/icons-material/EditCalendarRounded';
import CurrencyRupeeRoundedIcon from '@mui/icons-material/CurrencyRupeeRounded';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

const tabs = {'Dashboard':{to:'/dashboard',icon:<GridViewRoundedIcon/>},'Savings':{to:'/savings',icon:<SavingsRoundedIcon/>},'Loan Repayment':{to:'/loan/EMI',icon:<CreditScoreRoundedIcon/>,},'Income Tax':{to:'/tax',icon:<CurrencyRupeeRoundedIcon/>,},'Retirement Planner':{to:'/retirement', icon:<EditCalendarRoundedIcon/>},'Resource Library':{to:'/resources',icon:<LibraryBooksRoundedIcon/>}};
const Sidebar = () => {
    const navigate = useNavigate();
    const handleLogout=()=>{
        localStorage.clear();
        navigate('/')
    }
    if(['/','/signup'].includes(window.location.pathname)) return null;
 
    return (
    <div className={styles.container}>
        <ul className={styles.list}>
        {Object.keys(tabs).map((tab)=>{
            return <li><NavLink className={({isActive})=>isActive?styles.activeTab:''} to={tabs[tab].to}>{tabs[tab].icon}{tab}</NavLink></li>
        })}
        </ul>
        <div className={styles.logout}>
            <LogoutIcon onClick={handleLogout}/>
            Logout
        </div>
    </div>
    )
}

export default Sidebar;