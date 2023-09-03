import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from "./components/Login";
import Register from './components/Register';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route exact path='/' element={<Login />} />
        <Route path='/register' element={<Register />} /> 
        <Route path='/dashboard' 
               element={ <div>
                            <Navbar />
                          <Dashboard />
                         </div>
                       } />        
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;
