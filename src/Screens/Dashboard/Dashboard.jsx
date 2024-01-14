import { useEffect, useState } from "react";
import { ApiService } from "../../ApiService";
import styles from './Dashboard.module.css';
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    defaults,
  } from "chart.js";
  import { Line } from "react-chartjs-2";
import AddTransactionModal from "./AddTransactionModal";
import { Link } from "react-router-dom";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Navbar from "../../Components/Navbar/Navbar";

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  
//   const options = {
//       responsive: true,
  
//       scales: {
//         x: {
//           grid: {
//             display: false,
//           },
//         },
//       },
//       layout: {
//         padding: {
//           left: 0,
//           right: 60,
//           top: 0,
//           bottom: 30,
//         },
//       },
//       plugins: {
//         legend: {
//           position: "bottom",
  
//           labels: {
//             padding: 40,
//             boxWidth: 15,
//             useBorderRadius: true,
//             borderRadius: 2,
//             boxHeight: 15,
//             color: "#4a4a4a",
//             font: {
//               size: 14,
//               lineHeight: 18,
//               //family: "Source Sans Pro",
//             },
//           },
//         },
//         title: {
//           display: true,
//           text: "TRANSACTIONS",
//           font: {
//             size: 22,
//             weight: 500,
//           },
//           padding: 60,
//           align: "start",
//         },
//       },
//     };
export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
            padding: 20,
            boxWidth: 15,
            useBorderRadius: true,
            borderRadius: 2,
            boxHeight: 15,
            color: "#4a4a4a",
            font: {
              size: 14,
              lineHeight: 18,
              //family: "Source Sans Pro",
            },
           },
      },
      title: {
        display: true,
        text: 'TRANSACTIONS',
        font: {
                size: 18,
                weight: 700,
                padding:20
               },
      },
    },
  };

const Dashboard = () => {
    const [overviewData, setOverviewData] = useState({
        'total_income': 120000,
        'monthly_income': 10000,
        'total_expense': 100000,
        'monthly_expense': 9000
    })
    const [entries, setEntries] = useState([
        {id:1,title: "Vidya's Payment", amount:'2000', added_at:'2023-12-03 16:15:20', source:['Payment'],type:'income'},
        {id:2,title: "Salary", amount:'20000', added_at:'2023-12-05 16:15:20', source:['Salary'],type:'income'},
        {id:3,title: "Mc Donald's", amount:'650', added_at:'2023-12-07 16:15:20', categories:['Food & Drinks'],type:'expense'},
        {id:4,title: "Pen sets", amount:'45', added_at:'2023-12-08 16:15:20', categories:['Stationary'],type:'expense'},
        {id:5,title: "Chocolate", amount:'70', added_at:'2023-12-08 16:15:20', categories:['Food & Drinks'],type:'expense'},
        {id:6,title: "Festival Bonus", amount:'5000', added_at:'2023-12-25 16:15:20', source:['Salary'],type:'income'},
        {id:7,title: "Jacket", amount:'1150', added_at:'2023-12-15 16:15:20', categories:['Clothes'],type:'expense'},
        {id:8,title: "Performance Incentive", amount:'6000', added_at:'2023-12-20 16:15:20', source:['Salary'],type:'income'},
        {id:9,title: "Wheat flour", amount:'280', added_at:'2023-12-23 16:15:20', categories:['Grocery'],type:'expense'},
    ])
    const [incomeEntries, setIncomeEntries]=useState([
        // {id:1,title: "Vidya's Payment", amount:'2000', added_at:'2023-12-03 16:15:20', source:['Payment'],type:'income'},
        // {id:2,title: "Salary", amount:'20000', added_at:'2023-12-05 16:15:20', source:['Salary'],type:'income'},
        // {id:6,title: "Festival Bonus", amount:'5000', added_at:'2023-12-25 16:15:20', source:['Salary'],type:'income'},
        // {id:8,title: "Performance Incentive", amount:'6000', added_at:'2023-12-20 16:15:20', source:['Salary'],type:'income'},
    ])
    const [expenseEntries, setExpenseEntries]=useState([
        // {id:3,title: "Mc Donald's", amount:'650', added_at:'2023-12-07 16:15:20', categories:['Food & Drinks'],type:'expense'},
        // {id:4,title: "Pen sets", amount:'45', added_at:'2023-12-08 16:15:20', categories:['Stationary'],type:'expense'},
        // {id:5,title: "Chocolate", amount:'70', added_at:'2023-12-08 16:15:20', categories:['Food & Drinks'],type:'expense'},
        // {id:7,title: "Jacket", amount:'1150', added_at:'2023-12-15 16:15:20', categories:['Clothes'],type:'expense'},
        // {id:9,title: "Wheat flour", amount:'280', added_at:'2023-12-23 16:15:20', categories:['Grocery'],type:'expense'},
    ])
    const [formattedChartData, setFormattedChartData]=useState({})
    const [chartData, setChartData]=useState({datasets:[]})
    const [loading, setLoading] = useState(false)
    const [addModalVisible,setAddModalVisible]=useState(false);

    const handleAddTransaction=()=>{}
    const formatChartData=(expenses,incomes)=>{
        let temp={};

        expenses.forEach((elem)=>{
            const date=new Date(elem.added_at);
            const formattedDate= String(date.toLocaleDateString('en-US',{month:'short',day:'2-digit'}))
            if(!(formattedDate in temp)){
                temp[formattedDate]={
                    income:0,
                    expense:0,
                }
            }
            temp[formattedDate]['expense']+=Number(elem.amount)
        })
        incomes.forEach((elem)=>{
            const date=new Date(elem.added_at);
            const formattedDate= date.toLocaleDateString('en-US',{month:'short',day:'2-digit'})
            if(!(formattedDate in temp)){
                temp[formattedDate]={
                    income:0,
                    expense:0,
                }
            }
            temp[formattedDate]['income']+=Number(elem.amount)
        })
        const labels=Object.keys(temp);
        const sortedLabels=labels.sort();
        let newTemp={};
        sortedLabels.forEach((label)=>{
            newTemp[label]={...temp[label]}
        })
        setFormattedChartData(newTemp);
    }
    const fetchData = async() => {
        try{
                    setLoading(true)
                    const overviewRes = await ApiService('/api/info','GET');
                    if(overviewRes.success){
                        setOverviewData(overviewRes.response)
                    }
                    const entriesRes = await ApiService('/api/entries',"GET");
                    if(entriesRes.success){
                        setEntries(entriesRes.response.results);
                    }
                    // const today = new Date()
                    // const startDate= `01-${today.getMonth()}-${today.getFullYear()}`;
                    // const endDate= `${today.getDate()}-${today.getMonth()}-${today.getFullYear()}`
                    const startDate='2024-01-01 00:00';
                    const endDate='2024-01-31 23:59';
                    const incomeEntriesRes = await ApiService(`/api/income?start_date=${startDate}&end_date=${endDate}`,'GET')
                    if(incomeEntriesRes.success){
                        setIncomeEntries(incomeEntriesRes.response);
                    }
                    const expenseEntriesRes = await ApiService(`/api/expenses?start_date=${startDate}&end_date=${endDate}`,'GET')
                    if(expenseEntriesRes.success){
                        setExpenseEntries(expenseEntriesRes.response);
                    }
                    }
                    catch(err){
                        console.log(err);
                    }
                    finally{
                        setLoading(false)
                    }
    }
    useEffect(()=>{
       fetchData()
    },[])
    useEffect(()=>{
        if(Array.isArray(expenseEntries) && Array.isArray(incomeEntries))
        formatChartData(expenseEntries,incomeEntries);
    },[incomeEntries,expenseEntries])
    useEffect(()=>{
        console.log(formattedChartData)
        console.log(Object.keys(formattedChartData).map((elem) => formattedChartData[elem]['expense']))
       // if(formattedChartData && Object.keys(formattedChartData).length>0 && formattedChartData.datasets.length>0)
        setChartData({
            labels: Object.keys(formattedChartData),
            datasets: [
              {
                label: "Expense",
                data: Object.keys(formattedChartData).map((elem) => formattedChartData[elem]['expense']),
                borderColor: "#00affe",
                backgroundColor: "#00affe",
              },
              {
                label: "Income",
                data: Object.keys(formattedChartData).map((elem) => formattedChartData[elem]['income']),
                borderColor: "#fad444",
                backgroundColor: "#fad444",
              }
            ],
          });
    },[formattedChartData])
    return (
        <>
        <Sidebar/>
        <Navbar/>
        
        <div className={styles.screenContainer}>
            <div className={styles.container}>
                <div className={styles.statsContainer}>
                    <div className={styles.overviewContainer}>
                        <h2>Overview</h2>
                        <div>
                            {Object.keys(overviewData)?.map(elem=>{
                                return (
                                    <div className={styles.overviewValues}>
                                    <span>{'₹'+overviewData[elem]?.toLocaleString('en-IN')}</span>
                                    <span>{elem?.replace('_',' ')?.toLowerCase()}</span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className={styles.chartContainer}>
                        <div className={styles.chart}>
                            <Line options={options} data={chartData}/>
                        </div>
                    </div>
                </div>
                <div className={styles.transactionsContainer}>
                    <h2><ReceiptLongRoundedIcon/>Transaction History</h2>
                    <ul>
                    {
                        entries?.slice(0,8)?.map((elem)=>{
                            return (
                                <li key={elem.id}>
                                    <div>
                                        <span>{elem.title}</span>
                                        <span>{new Date(elem.added_at)?.toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'})}</span>
                                    </div>
                                    <div>
                                        <span className={styles[`${elem.type}_entry`]}>{'₹'+Number(elem.amount).toLocaleString('en-IN')}</span>
                                    </div>
                                </li>
                            )
                        })
                    }
                    <li className={styles.addBtnContainer}>
                        <button type="button" onClick={()=>setAddModalVisible(true)} className={styles.addTransactionBtn}>Add New</button>
                        <span><Link to='/transactions'>Show all &gt;</Link></span>
                    </li>
                    </ul>
                </div>
            </div>
            <AddTransactionModal refetchData={fetchData} visible={addModalVisible} onClose={()=>setAddModalVisible(false)}/>
        </div>
        </>
    )
}

export default Dashboard;