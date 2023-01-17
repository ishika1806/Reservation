import './App.css';
import {BrowserRouter ,Route,Routes} from 'react-router-dom'
import Home from './pages/home/Home';
import Hotel from './pages/hotels/Hotel';
import List from './pages/lists/List';
import Login from './pages/Login/login';
function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Login/>}/>
    <Route path='/hotels' element={<List/>}/>
    <Route path='/hotels/:id' element={<Hotel/>}/>
    <Route path='/home' element={<Home/>}/>
   </Routes>
   </BrowserRouter>
  );
}

export default App;
