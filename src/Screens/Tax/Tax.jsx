import { TextField } from '@mui/material';
import styles from './Tax.module.css';
import { useState } from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import Sidebar from '../../Components/Sidebar/Sidebar';
const CESS=4;
const surchargeMapping={5000000:10,10000000:15,20000000:25};
const Tax = () => {
    const [income, setIncome] = useState({
        basicSalary:0,
        HRA:0,
        specialAllowance:0,
        LTA:0,
        houseProperty:0,
        capitalGains:0,
        others:0
    });
    const [deductions, setDeductions] = useState({
        std:50000,
        conveyance:0,
        transport:0,
        daily:0,
        NPSContribution:0,
        officialPerquisites:0
    })
    const [totalTaxableIncome, setTotalTaxableIncome]=useState(0);
    const [output, setOutput] = useState(0);
    const [surcharge, setSurcharge] = useState(0);
    const [cess, setCess] = useState(0);
    const handleIncomeChange = (e, field)=>{
        setIncome(prev=>({...prev, [field]:e.target.value}));
    }
    const handleDeductionChange = (e,field)=>{
        setDeductions(prev=>({...prev, [field]:e.target.value}))
    }
    const handleCalcuateTax=()=>{
        const totalIncome = Object.values(income).reduce((acc,cur)=> acc+=Number(cur),0);
        console.log(totalIncome);
        const totalDeductions = Object.values(deductions).reduce((acc,cur)=>acc+=Number(cur),0);
        console.log(totalDeductions);
        const taxableIncome = totalIncome - totalDeductions;
        console.log(taxableIncome)
        setTotalTaxableIncome(taxableIncome)
        let tax=0;
        const slabs = {
            300000:0,
            600000:5,
            900000:10,
            1200000:15,
            1500000:20,
            'above':30
        }
        const keys=Object.keys(slabs);
        for(let i=0;i<5;i++){
            let val=0;
            if(taxableIncome>keys[i]){
                val=i==0?keys[i]:keys[i]-keys[i-1];
                tax+=slabs[keys[i]]*val/100;
                console.log(tax);
            }
            else{
                val=i==0?taxableIncome:taxableIncome-keys[i-1];
                tax+=slabs[keys[i]]*val/100;
                console.log(tax)
                break;
            }
        }
        if(taxableIncome>slabs[keys[4]]){
            tax+= slabs[keys[5]]*(taxableIncome - keys[4])/100;
        }
        console.log(tax);
        const _cess=CESS * tax/100;
        setCess(_cess);
        tax += _cess;
        console.log(tax)
        const surchargeKeys=Object.keys(surchargeMapping);
        let _surcharge=0;
        for( let i=2;i>=0;i--){
            if(taxableIncome>surchargeKeys[i]){
                _surcharge= surchargeMapping[surchargeKeys[i]]*tax/100;
                break;
            }
        }
        setSurcharge(_surcharge)
        tax+=_surcharge;
        setOutput(tax);
    }
    return (
    <><Navbar/><Sidebar/>
    <div className={styles.screenContainer}>
    <div className={styles.container}>
         <h2>Income Tax Calculator - New tax regime FY 2023-24 (AY 2024-25)</h2>
         <div className={styles.formsContainer}>
            <div className={styles.formContainer}>
                <h3>Income</h3>
                <form>
                    <div>
                        <label>Basic Salary</label>
                        <TextField sx={localStyles.textField}  size='small' value={income.basicSalary} onChange={(e)=>handleIncomeChange(e,'basicSalary')}/>
                    </div>
                    <div>
                        <label>HRA</label>
                        <TextField sx={localStyles.textField}  size='small' value={income.HRA} onChange={(e)=>handleIncomeChange(e,'HRA')}/>
                    </div>
                    <div>
                        <label>Special Allowance</label>
                        <TextField  sx={localStyles.textField} size='small' value={income.specialAllowance} onChange={(e)=>handleIncomeChange(e,'specialAllowance')}/>
                    </div>
                    <div>
                        <label>LTA</label>
                        <TextField  sx={localStyles.textField} size='small' value={income.LTA} onChange={(e)=>handleIncomeChange(e,'LTA')}/>
                    </div>
                    <div>
                        <label>Income from house property (any rental income, or interest paid on home loan)</label>
                        <TextField size='small' sx={localStyles.textField} value={income.houseProperty} onChange={(e)=>handleIncomeChange(e,'houseProperty')}/>
                    </div>
                    <div>
                        <label>Capital gains (income from sale purchase of shares or house)</label>
                        <TextField  sx={localStyles.textField} size='small' value={income.capitalGains} onChange={(e)=>handleIncomeChange(e,'capitalGains')}/>
                    </div>
                    <div>
                        <label>Other sources (interest income from FD, bonds or savings account)</label>
                        <TextField  sx={localStyles.textField} size='small' value={income.others} onChange={(e)=>handleIncomeChange(e,'others')}/>
                    </div>
                </form>
            </div>
            <div className={styles.formContainer}>
                <h3>Deductions</h3>
                <form>
                    <div>
                        <label>Standard deduction</label>
                        <TextField disabled sx={localStyles.textField}  size='small' value={deductions.std} onChange={(e)=>null}/>
                    </div>
                    <div>
                        <label>Conveyance Allowance</label>
                        <TextField sx={localStyles.textField}  size='small' value={deductions.conveyance} onChange={(e)=>handleDeductionChange(e,'conveyance')}/>
                    </div>
                    <div>
                        <label>Transport Allowance for a specially-abled person</label>
                        <TextField sx={localStyles.textField}  size='small' value={deductions.transport} onChange={(e)=>handleDeductionChange(e,'transport')}/>
                    </div>
                    <div>
                        <label>Daily Allowance</label>
                        <TextField sx={localStyles.textField}  size='small' value={deductions.daily} onChange={(e)=>handleDeductionChange(e,'daily')}/>
                    </div>
                    <div>
                        <label>Employer’s contribution to NPS</label>
                        <TextField sx={localStyles.textField}  size='small' value={deductions.NPSContribution} onChange={(e)=>handleDeductionChange(e,'NPSContribution')}/>
                    </div>
                    <div>
                        <label>Perquisites for official purposes</label>
                        <TextField sx={localStyles.textField}  size='small' value={deductions.officialPerquisites} onChange={(e)=>handleDeductionChange(e,'officialPerquisites')}/>
                    </div>
                </form>
            </div>
           
         </div>
         <div className={styles.outputContainer}>
            <div><button type="button" disabled={income.basicSalary<=0} onClick={handleCalcuateTax} className={styles.btn}>Calculate</button></div>
            <div>
                <p><span>Total taxable income:</span><span>{'₹'+Math.round(totalTaxableIncome).toLocaleString('en-IN')}</span></p>
                <p><span>Cess: </span><span>{'₹'+Math.round(cess).toLocaleString('en-IN')}</span></p>
                <p><span>Surcharge: </span><span>{'₹'+Math.round(surcharge).toLocaleString('en-IN')}</span></p>
                <p><span><b>Total tax: </b></span><span><b>{'₹'+Math.round(output).toLocaleString('en-IN')}</b></span></p>
            </div>
         </div>
    </div>
 </div>
 </>
 )
}

const localStyles={
    textField:{
        width:100
    }
}

export default Tax;