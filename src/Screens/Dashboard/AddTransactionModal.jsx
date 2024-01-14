import { FormControl, InputLabel, MenuItem, Modal, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import styles from './AddTransactionModal.module.css';
import { ApiService } from "../../ApiService";
import Spinner from "../../Components/Spinner/Spinner";


const AddTransactionModal = ({visible, onClose, refetchData}) => {
    const [type, setType] = useState('Expense');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);
    const [categoriesList, setCategoriesList] = useState([]);

    const handleCancel=()=>{
        setType('');
        setTitle('');
        setAmount('');
        setCategory('');
        setDescription('');
        onClose();
    }

    const handleSave = async () => {
        try{
           
            setLoading(true);
            const url = type==='Expense'?'/api/expenses':'/api/income';
            const payload = {
                title,
                amount:Number.parseInt(amount,10),
                desc:description,
                [type==='Expense'?'categories':'source']:category
            }
            const extraHeaders=type==='Expense'?{}:{'Content-type':'application/json'}
            const data=new FormData();
            Object.keys(payload)?.map((key)=>data.append(key,payload[key]));
            const response = await ApiService(url,'POST',type==='Expense'?data:JSON.stringify(payload),extraHeaders);
            if(response.success){
                refetchData();
            }
        }
        catch(err){
            console.log('error in add transaction:',err);
        }
        finally{
            setLoading(false);
            handleCancel();
        }
    }
    useEffect(()=>{
        if(type==='Expense') setCategoriesList(['Grocery','Stationery','Clothes','Other']);
        else if (type==='Income') setCategoriesList(['Salary',"Property",'Capital gains','Business','Other'])
    },[type])
    return (
        <Modal open={visible} onClose={onClose}>
            <div className={styles.container}>
                {loading && <Spinner/>}
                {!loading && <>
                <h2>Add Transactions</h2>
                <form>
                <div className={styles.formFlex}>
                <FormControl sx={{ m: 1, width: 200 }} size="small">
                    <InputLabel id="transaction-select">Transaction type:</InputLabel>
                    <Select
                        labelId="transaction-select"
                        id="transaction-select"
                        value={type}
                        label="Transaction type:"
                        onChange={(e)=>setType(e.target.value)}
                    >
                        <MenuItem value='Expense'>Expense</MenuItem>
                        <MenuItem value='Income'>Income</MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{ m: 1, width: 200 }} size="small">
                    <InputLabel id="category-select">Category type:</InputLabel>
                    <Select
                        labelId="category-select"
                        id="category-select"
                        value={category}
                        label="Category type:"
                        onChange={(e)=>setCategory(e.target.value)}
                    >{categoriesList?.map((elem)=>{
                        return (
                            <MenuItem value={elem}>{elem}</MenuItem>
                        )
                    })}
                        
                    </Select>
                </FormControl>
                </div>
                <div className={styles.formFlex}>
                <TextField
                    id="title"
                    label="Title"
                    value={title}
                    onChange={(e)=>setTitle(e.target.value)}
                    size="small"
                    sx={{width:200,m:1}}
                />
                <TextField
                    id="amount"
                    label="Amount"
                    value={amount}
                    onChange={(e)=>setAmount(e.target.value)}
                    size="small"
                    sx={{width:200,m:1}}
                />
                </div>
                <TextField
                    multiline
                    id="description"
                    label="Description"
                    value={description}
                    onChange={(e)=>setDescription(e.target.value)}
                    sx={{
                        m:1,
                        width:'calc(100% - 16px)',
                    }}
                />
                <div className={styles.btnContainer}>
                <button type="button" onClick={handleCancel} className={styles.cancelBtn}>Cancel</button>
                <button type="button" onClick={handleSave} className={styles.saveBtn}>Save</button>
                </div>
                </form></>}
            </div>
        </Modal>
    )
}

export default AddTransactionModal