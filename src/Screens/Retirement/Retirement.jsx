import { Link } from 'react-router-dom';
import styles from './../Savings/Savings.module.css';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Navbar from '../../Components/Navbar/Navbar';
const Retirement = () => {
    return (
        <><Sidebar/><Navbar/>
        <div className={styles.screenContainer}>
            <div className={styles.container}>
                <div className={styles.card}>
                    <h4>NPS Calculator</h4>
                    <p>The National Pension System is a defined-contribution pension system in India regulated by Pension Fund Regulatory and Development Authority which is under the jurisdiction of Ministry of Finance.</p>
                    <Link to='/retirement/NPS'>Use calculator</Link>
                    {/* <Link to='/retirement' style={{cursor:'not-allowed'}}>Use Calculator</Link> */}
                </div>
                <div className={styles.card}>
                    <h4>EPF Calculator</h4>
                    <p>The Employees Provident Fund is a retirement savings scheme available to all salaried employees in India and is administered by the Employees' Provident Fund Organisation (EPFO).</p>
                    <Link to='/retirement/EPF'>Use calculator</Link>
                    {/* <Link to='/retirement' style={{cursor:'not-allowed'}}>Use Calculator</Link> */}
                </div>
                <div className={styles.card}>
                    <h4>PPF Calculator</h4>
                    <p>The PPF account or Public Provident Fund scheme is one of the most popular long-term saving-cum-investment products,introduced by the National Savings Institute of the Ministry of Finance.</p>
                    <Link to='/retirement/PPF'>Use calculator</Link>
                </div>
                <div className={styles.card}>
                    <h4>OPS Calculator</h4>
                    <p>Old Pension Scheme in India was abolished as a part of pension reforms by Union Government. Repealed from 1 January 2004, it had a defined-benefit pension of half the Last Pay Drawn at the time of retirement along with components like DA</p>
                    <Link to='/OPS'>Use calculator</Link>
                </div>
            </div>
        </div>
        </>
            )
}

export default Retirement;