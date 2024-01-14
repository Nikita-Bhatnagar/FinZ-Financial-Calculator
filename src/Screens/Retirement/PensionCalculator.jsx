import { useEffect,useState } from 'react';
import { TextField, Slider } from '@mui/material';
import Navbar from '../../Components/Navbar/Navbar';
import Sidebar from '../../Components/Sidebar/Sidebar';
import styles from './PensionCalculator.module.css';
const PensionCalculator = () =>{
    const [principal,setPrincipal]=useState(50000);
    const [earnings, setEarnings]=useState(500000);
    const [output, setOutput]=useState('');
    const calcOPS=()=>{
        const salary=principal>earnings/10?principal:earnings/10;
        setOutput(salary/2);
    }
    useEffect(()=>{
        calcOPS()
    },[principal,earnings]);
    return (
        <>
        <Sidebar/>
        <Navbar/>
        <div className={styles.screenContainer}>
            <div className={styles.container}>
                <h2>OPS Calculator</h2>
                <div className={styles.formContainer}>
                <form className={styles.form}>
                    <div>
                        <div>
                        <label>Last drawn salary (basic + DA) (₹)</label>
                        <TextField sx={{width:130}} size='small' value={principal} onChange={(e)=>e.target.value===''?setPrincipal(0):setPrincipal(Number(e.target.value))}/>
                        </div>
                        <Slider
                            value={typeof principal === 'number' ? principal : 0}
                            onChange={(e, newVal)=>setPrincipal(newVal)}
                            aria-labelledby="input-slider-principal"
                            min={10000}
                            max={500000}
                            sx={{
                                color:'#00affe'
                            }}
                        />
                    </div>
                    <div>
                        <div>
                        <label>Total earnings (last 10 months) (₹)</label>
                        <TextField sx={{width:130}} size='small' value={earnings} onChange={(e)=>e.target.value===''?setEarnings(0):setEarnings(Number(e.target.value))}/>
                        </div>
                        <Slider
                            value={typeof earnings === 'number' ? earnings : 0}
                            onChange={(e, newVal)=>setEarnings(newVal)}
                            aria-labelledby="input-slider-interest-rate"
                            min={100000}
                            max={5000000}
                            sx={{
                                color:'#00affe'
                            }}
                        />
                    </div>
                    
            </form>
            <div className={styles.outputContainer}>
                    
                        <p>Monthly pension after retirement:</p>
                        <p className={styles.totalValue}>{'₹'+Math.round(output).toLocaleString('en-IN')}</p>
                        <p><i>*increments as per revision of DA twice a year</i></p>
                </div>

        
            </div>
            </div>
            </div>
        </>
    )
}
export default PensionCalculator