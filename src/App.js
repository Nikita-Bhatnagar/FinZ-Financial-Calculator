import './App.css';
import { Route, Routes } from 'react-router-dom';
import Signin from './Screens/Auth/Signin';
import Dashboard from './Screens/Dashboard/Dashboard';
import Loan from './Screens/Loan/Loan';
import Savings from './Screens/Savings/Savings';
import Retirement from './Screens/Retirement/Retirement';
import Tax from './Screens/Tax/Tax';
import Resources from './Screens/Resources/Resources';
import Sidebar from './Components/Sidebar/Sidebar';
import Navbar from './Components/Navbar/Navbar';
import Transactions from './Screens/Transactions/Transactions';
import Calculator from './Screens/Savings/Calculator';
import PensionCalculator from './Screens/Retirement/PensionCalculator';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Signin type='signin'/>}/>
        <Route path='/signup' element={<Signin type='signup'/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/savings' element={<Savings/>}/>
        <Route path='/tax' element={<Tax/>}/>
        <Route path='/loan/:calculator' element={<Calculator/>}/>
        <Route path='/retirement' element={<Retirement/>}/>
        <Route path='/resources' element={<Resources/>}/>
        <Route path='/transactions' element={<Transactions/>}/>
        <Route path='/savings/:calculator' element={<Calculator/>}/>
        <Route path='/retirement/:calculator' element={<Calculator/>}/>
        <Route path='/ops' element={<PensionCalculator/>}/>
      </Routes>
     </div>
  );
}

export default App;
