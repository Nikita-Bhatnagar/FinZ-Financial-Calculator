import { useParams } from 'react-router-dom';
import styles from './Calculator.module.css'
import { useEffect, useState, useMemo } from 'react';
import { Slider, TextField } from '@mui/material';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import {
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Filler // 1. Import Filler plugin
  } from "chart.js";
import { Doughnut } from 'react-chartjs-2';
import { Line } from "react-chartjs-2";
import Navbar from '../../Components/Navbar/Navbar';
import Sidebar from '../../Components/Sidebar/Sidebar';

// ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    Filler // 1. Register Filler plugin
  );
  const options = {
    responsive: true,
    tension: 0.5 // 2. Set the tension (curvature) of the line to your liking.  (You may want to lower this a smidge.)
  };
const Calculator = () => {
    const calcDataMapping ={
        'FD': {labels:['Total investment (₹)','Rate of interest (% p.a.)','Time period (years)'], min:[5000,1,1],max:[10000000,15,25],fn:calcFD,default:[10000,6.5,5]},
        'RD': {labels:['Monthly investment (₹)','Rate of interest (% p.a.)','Time period (years)'],min:[500,1,1],max:[1000000,15,10],fn:calcRD, default:[5000,6.5,3]},
        'SIP': {labels:['Monthly investment (₹)','Expected return rate (% p.a.)','Time period (years)'],min:[500,1,1],max:[1000000,30,40],fn:calcSIP,default:[25000,12,10]},
        'ELSS': {labels:['Total investment (₹)','Expected return rate (% p.a.)','Time period (years)'],min:[500,1,1],max:[10000000,30,40],fn:calcELSS,default:[25000,12,10]},
        'PPF':{labels:['Yearly investment (₹)','Rate of interest (% p.a.)','Time period'],min:[500,7.1,15],max:[150000,7.1,50],fn:calcPPF,default:[10000,7.1,15]},
        'EPF':{labels:['Monthly salary (Basic + DA) (₹)','Rate of interest (% p.a.)','Your age','Current PPF Balance (₹)'],min:[1000,8.1,15,0],max:[500000,8.1,58,200000],fn:calcEPF,default:[50000,8.1,30,100000]},
        'EMI':{labels:['Loan amount (₹)', 'Rate of interest (% p.a.)','Loan tenure (years)'],min:[100000,1,1],max:[10000000,30,30],fn:calcEMI,default:[500000,6.5,5]},
        'NPS':{labels:['Yearly investment (₹)','Expected return (% p.a.)','Your age'],min:[500,8,18],max:[150000,15,60],fn:calcNPS,default:[10000,9,20]},
    }

    const {calculator}=useParams();
    const [principal, setPrincipal]=useState(calcDataMapping[calculator]['default'][0]);
    const [interestRate, setInterestRate] = useState(calcDataMapping[calculator]['default'][1]);
    const [time, setTime] =useState(calcDataMapping[calculator]['default'][2]);
    const [returns, setReturns]= useState('');
    const [totalInvested, setTotalInvested] =useState('');
    const [totalValue, setTotalValue]=useState('');
    const [EMI, setEMI] = useState('');
    const [curPPfBalance, setCurPPFBalance] = useState(calcDataMapping?.[calculator]?.['default']?.[3] ?? 0)
    const [labels, setLabels] = useState([])

    function calcFD (timeArg){
        const _time=timeArg ?? time;
        setTotalInvested(principal);
        const amount = principal * Math.pow((1+interestRate/100),_time);
        setTotalValue(amount);
        setReturns(amount - principal);
        return [principal,amount];
    }
    function calcRD(timeArg){
        const _time=timeArg ?? time;
        let amount=0;
        let totalMonths=_time*12;
        for(let i=totalMonths;i>0;i--){
            amount += principal * Math.pow((1 + interestRate/(100 * 4)),((4*totalMonths)/12));
        }
        const totalPrincipal=principal * totalMonths;
        setTotalInvested(totalPrincipal);
        setTotalValue(amount);
        setReturns(amount - totalPrincipal);
        return [totalPrincipal,amount]
    }
    function calcSIP(timeArg){
        const _time=timeArg ?? time;
        const monthlyInterest = interestRate/1200;
        const amount = principal * ((Math.pow(1 + monthlyInterest,12*_time) - 1)/monthlyInterest) * (1 + monthlyInterest);
        const totalPrincipal = principal * 12 * _time;
        setTotalValue(amount);
        setTotalInvested(totalPrincipal);
        setReturns(amount - totalPrincipal);
        return [totalPrincipal,amount];
    }
    function calcELSS(timeArg){
        const _time=timeArg ?? time;
        const amount = principal * Math.pow((1 + interestRate/100), _time);
        setTotalInvested(principal);
        setTotalValue(amount);
        setReturns(amount - principal);
        return [principal,amount];
    }
    function calcPPF(){
        const amount = principal * ((Math.pow(1+(interestRate/100),time) - 1)/(interestRate/100)) * (1 + interestRate/100);
        const totalPrincipal = principal * time;
        setTotalValue(amount);
        setTotalInvested(totalPrincipal);
        setReturns(amount - totalPrincipal);
        
    }
    function calcEPF(){
        const years = 58 - time;
        let amount = curPPfBalance;
        let totalPrincipal=0;
        for(let i=0;i<years;i++){
            const annualContrib = (0.12*(principal)+0.0367*(principal))*12;
            totalPrincipal+=annualContrib;
            amount += annualContrib;
            amount+=amount*0.081
        }
        setTotalValue(amount);
        setTotalInvested(totalPrincipal);
        setReturns(amount - totalPrincipal)
    }
    function calcNPS(){
        const years = 60 - time;
        const totalPrincipal = principal*years;
        setTotalInvested(totalPrincipal);
        let amount=0;
        for(let i=0;i<years;i++){
            const annualContrib=principal;
            amount+=annualContrib;
            amount+=amount*interestRate/100;
        }
        setTotalValue(amount);
        setReturns(amount - totalPrincipal);
    }
    function calcEMI(){
        setTotalInvested(principal);
        const months = time*12;
        const mri=interestRate/1200;
        const emiAmount = principal*mri*((Math.pow(1+mri,months))/((Math.pow(1+mri,months))-1));
        console.log(emiAmount)
        setEMI(emiAmount);
        const totalAmountPayable = emiAmount * months;
        setTotalValue(totalAmountPayable);
        setReturns(totalAmountPayable - principal);
    }
    const doughnutData = useMemo(()=>({
        labels: calculator==='EMI'?['Principal loan amount','Total interest']:['Total invested', 'Estimated returns'],
        datasets: [
          {
            label: '',
            data: [totalInvested,returns],
            backgroundColor: [
              '#bce6fa',
              '#00affe',
            ],
            borderColor: [
              '#bce6fa',
              '#00affe',
            ],
            borderWidth: 1,
          },
        ],
      }),[totalInvested,returns,calculator])

      const calcLabels=(time)=>{
        let labels=[];
        const stepSize=time>10?5:2;
        for(let i=0;i<=time;i+=stepSize){
            labels.push(i+' Y');
        }
        setLabels(labels)
        return labels;
      }

      const chartData=useMemo(()=>{ 
        if(!['FD','RD','ELSS','SIP'].includes(calculator)) return {};
        return ({
        labels:calcLabels(time),
        datasets: [
            {
            label: "Total invested",
            data: labels.map((elem) => calcDataMapping[calculator]['fn'](elem.split(' ')?.[0])?.[0]),
            borderColor: "#fad444",
            backgroundColor: "#fad444",
            fill: {
                target: "origin", // Set the fill options
            }
            },
            {
            label: "Maturity amount",
            data: labels.map((elem) => calcDataMapping[calculator]['fn'](elem.split(' ')?.[0])?.[1]),
            borderColor: "#00affe",
            backgroundColor: "#00affe",
            fill: {
                target:"origin",
                above: "#00affe"
             } // Set the fill options
            }
  ]
      })},[calculator,time,principal,interestRate,totalValue,totalInvested]);
    
    useEffect(()=>{
        calcDataMapping[calculator]['fn']();
    },[principal,interestRate,time,calculator,curPPfBalance]);
    return (
        <><Sidebar/><Navbar/>
        <div className={styles.screenContainer}>
           <div className={styles.container}>
                <h2>{calculator==='ELSS'? 'ELSS (Lumpsum)':calculator} Calculator</h2>
                <div className={styles.formAndChartContainer}>
                <div className={styles.formContainer}>
                <form className={styles.form}>
                    <div>
                        <div>
                        <label>{calcDataMapping[calculator]['labels'][0]}</label>
                        <TextField sx={{width:130}} size='small' value={principal} onChange={(e)=>e.target.value===''?setPrincipal(0):setPrincipal(Number(e.target.value))}/>
                        </div>
                        <Slider
                            value={typeof principal === 'number' ? principal : 0}
                            onChange={(e, newVal)=>setPrincipal(newVal)}
                            aria-labelledby="input-slider-principal"
                            min={calcDataMapping[calculator]['min'][0]}
                            max={calcDataMapping[calculator]['max'][0]}
                            sx={{
                                color:'#00affe'
                            }}
                        />
                    </div>
                    <div>
                        <div>
                        <label>{calcDataMapping[calculator]['labels'][1]}</label>
                        <TextField sx={{width:130}} size='small' value={interestRate} onChange={(e)=>e.target.value===''?setInterestRate(0):setInterestRate(Number(e.target.value))}/>
                        </div>
                        <Slider
                            value={typeof interestRate === 'number' ? interestRate : 0}
                            onChange={(e, newVal)=>setInterestRate(newVal)}
                            aria-labelledby="input-slider-interest-rate"
                            min={calcDataMapping[calculator]['min'][1]}
                            max={calcDataMapping[calculator]['max'][1]}
                            sx={{
                                color:'#00affe'
                            }}
                        />
                    </div>
                    <div>
                        <div>
                        <label>{calcDataMapping[calculator]['labels'][2]}</label>
                        <TextField sx={{width:130}} size='small' value={time} onChange={(e)=>e.target.value===''?setTime(0):setTime(Number(e.target.value))}/>
                        </div>
                        <Slider
                            value={typeof time === 'number' ? time : 0}
                            onChange={(e,newVal)=>setTime(newVal)}
                            aria-labelledby="input-slider-time-period"
                            min={calcDataMapping[calculator]['min'][2]}
                            max={calcDataMapping[calculator]['max'][2]}
                            sx={{
                                color:'#00affe'
                            }}
                        />
                    </div>
                    {calculator==='EPF' && <div>
                        <div>
                        <label>{calcDataMapping[calculator]['labels'][3]}</label>
                        <TextField sx={{width:130}} size='small' value={curPPfBalance} onChange={(e)=>e.target.value===''?setCurPPFBalance(0):setCurPPFBalance(Number(e.target.value))}/>
                        </div>
                        <Slider
                            value={typeof curPPfBalance === 'number' ? curPPfBalance : 0}
                            onChange={(e,newVal)=>setCurPPFBalance(newVal)}
                            aria-labelledby="input-slider-time-period"
                            min={calcDataMapping[calculator]['min'][3]}
                            max={calcDataMapping[calculator]['max'][3]}
                            sx={{
                                color:'#00affe'
                            }}
                        />
                    </div>}
                </form>
                {!['EPF'].includes(calculator) && <div className={styles.outputContainer}>
                    <ul>
                        {calculator==='EMI' && 
                        <li><span>Loan EMI</span><span>{'₹'+Math.round(EMI).toLocaleString('en-IN')}</span></li>
                        }
                        {calculator!=='EMI' && <li><span>Total invested amount</span><span>{'₹'+Math.round(totalInvested).toLocaleString('en-IN')}</span></li>}
                        <li><span>{calculator==='EMI'?'Total interest payable':'Estimated Returns'}</span><span>{'₹'+Math.round(returns).toLocaleString('en-IN')}</span></li>
                        <li><span>{calculator==='EMI'?'Total payment (Principal + Interest)':'Total value'}</span><span>{'₹'+Math.round(totalValue).toLocaleString('en-IN')}</span></li>
                        {calculator==='NPS' && <li><span>Minimum annuity investment</span><span>{'₹'+Math.round(totalValue*0.4).toLocaleString('en-IN')}</span></li>}
                    </ul>
                </div>}
                {['EPF'].includes(calculator) && <div className={styles.outputContainer}>
                    
                        <p>Accumulated savings on retirement:</p>
                        <p className={styles.totalValue}>{'₹'+Math.round(totalValue).toLocaleString('en-IN')}</p>
                </div>

                }
                </div>
                <div>
                    <Doughnut data={doughnutData} />
                </div>
                </div>
                {['FD','RD','ELSS','SIP'].includes(calculator) && <Line options={options} data={chartData} />}
           </div>
           
        </div>
        </>
    )
}

export default Calculator;