import { Route, Routes } from 'react-router-dom';
import Home from './home/Home';
import Login from './authentication/login/Login';
import Signup from './authentication/signup/Signup';
import Dashboard from './dashboard/Dashboard';
import NotFound from './errorPages/notFound/NotFound';
import './App.scss';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/dashboard/*' element={<Dashboard />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App;
