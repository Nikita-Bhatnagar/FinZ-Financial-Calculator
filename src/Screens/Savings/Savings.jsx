import { Link } from 'react-router-dom';
import styles from './Savings.module.css';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Navbar from '../../Components/Navbar/Navbar';
const Savings = () => {
    return (
        <><Sidebar/><Navbar/>
        <div className={styles.screenContainer}>
            <div className={styles.container}>
                <div className={styles.card}>
                    <h4>FD Calculator</h4>
                    <p>A fixed deposit is a tenured deposit account provided by banks or non-bank financial institutions which provides investors a higher rate of interest than a regular savings account, until the given maturity date.</p>
                    <Link to='/savings/FD'>Use calculator</Link>
                </div>
                <div className={styles.card}>
                    <h4>RD Calculator</h4>
                    <p>A recurring deposit is a kind of term deposit offered by Indian banks and Post Office which helps people to deposit a fixed amount every month into their RD account & earn interest at the rate applicable to FDs.</p>
                    <Link to='/savings/RD'>Use calculator</Link>
                </div>
                <div className={styles.card}>
                    <h4>ELSS Calculator</h4>
                    <p>An Equity Linked Savings Scheme, popularly known as ELSS, is a type of diversified equity scheme which comes, with a lock-in period of three years, offered by mutual funds in India.</p>
                    <Link to='/savings/ELSS'>Use calculator</Link>
                </div>
                <div className={styles.card}>
                    <h4>SIP Calculator</h4>
                    <p>A systematic investment plan is an investment vehicle offered by many mutual funds to investors, allowing them to invest small amounts periodically instead of lump sums.</p>
                    <Link to='/savings/SIP'>Use calculator</Link>
                </div>
            </div>
        </div>
        </>
            )
}

export default Savings;