import { useEffect, useState } from 'react';
import styles from './Transactions.module.css'
import { ApiService } from '../../ApiService';
import Sidebar from "../../Components/Sidebar/Sidebar";
import Navbar from "../../Components/Navbar/Navbar";
const Transactions = () => {
    const [incomeData, setIncomeData]=useState([
        // {id:1,title: "Vidya's Payment", amount:'2000', added_at:'2023-12-03 16:15:20', source:['Payment'],type:'income', desc:'Some random descriptive text about this income'},
        // {id:2,title: "Salary", amount:'20000', added_at:'2023-12-05 16:15:20', source:['Salary'],type:'income',desc:'Some random descriptive text about this income'},
        // {id:6,title: "Festival Bonus", amount:'5000', added_at:'2023-12-25 16:15:20', source:['Salary'],type:'income',desc:'Some random descriptive text about this income'},
        // {id:8,title: "Performance Incentive", amount:'6000', added_at:'2023-12-20 16:15:20', source:['Salary'],type:'income',desc:'Some random descriptive text about this income'},
    ]);
    const [expenseData, setExpenseData] = useState([
        // {id:3,title: "Mc Donald's", amount:'650', added_at:'2023-12-07 16:15:20', categories:['Food & Drinks'],type:'expense',desc:'Some random descriptive text about this expense'},
        // {id:4,title: "Pen sets", amount:'45', added_at:'2023-12-08 16:15:20', categories:['Stationary'],type:'expense',desc:'Some random descriptive text about this expense'},
        // {id:5,title: "Chocolate", amount:'70', added_at:'2023-12-08 16:15:20', categories:['Food & Drinks'],type:'expense',desc:'Some random descriptive text about this expense'},
        // {id:7,title: "Jacket", amount:'1150', added_at:'2023-12-15 16:15:20', categories:['Clothes'],type:'expense',desc:'Some random descriptive text about this expense'},
        // {id:9,title: "Wheat flour", amount:'280', added_at:'2023-12-23 16:15:20', categories:['Grocery'],type:'expense',desc:'Some random descriptive text about this expense'},
    ]);
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
        (async()=>{
            try{
                setLoading(true);
                const incomeEntriesRes = await ApiService(`/api/income`,'GET')
                    if(incomeEntriesRes.success){
                        setIncomeData(incomeEntriesRes.response);
                    }
                    const expenseEntriesRes = await ApiService(`/api/expenses`,'GET')
                    if(expenseEntriesRes.success){
                        setExpenseData(expenseEntriesRes.response);
                    }
                    }
                    catch(err){
                        console.log('error in fetching transactions',err);
                    }
                    finally{
                        setLoading(false);
                    }
            }
            
        )()
    },[])
    return (
    <><Navbar/><Sidebar/>
    <div className={styles.screenContainer}>
        <div className={styles.container}>
            <h2>Expenses</h2>
            <ul>
                <li>
                    <span>S.No.</span>
                    <span>Title</span>
                    <span>Description</span>
                    <span>Categories</span>
                    <span>Amount</span>
                </li>
                {
                    expenseData?.map((elem,index)=>{
                        return (
                            <li key={elem.id}>
                                <span>{index+1}</span>
                                <span>{elem.title}</span>
                                <span>{elem.desc}</span>
                                <span>{elem.categories}</span>
                                <span>{'₹'+Number(elem.amount).toLocaleString('en-IN')}</span>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
        <div className={styles.container}>
            <h2>Income</h2>
            <ul>
                <li>
                    <span>S.No.</span>
                    <span>Title</span>
                    <span>Description</span>
                    <span>Categories</span>
                    <span>Amount</span>
                </li>
                {
                    incomeData?.map((elem,index)=>{
                        return (
                            <li key={elem.id}>
                                <span>{index+1}</span>
                                <span>{elem.title}</span>
                                <span>{elem.desc}</span>
                                <span>{elem.source}</span>
                                <span>{'₹'+Number(elem.amount).toLocaleString('en-IN')}</span>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    </div>
    </>
    )
}

export default Transactions;