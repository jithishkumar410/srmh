
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './home'
import Reg from './register';
import Login from './login';
import Userhome from './userhome';
import Learn from './learn';
import Codetails from './codet';
function App() {
  return (
    <div className="App">
   <BrowserRouter>
   <Routes>
   <Route path='/' element={<Home />} ></Route>
    <Route path='/login' element={<Login/>} ></Route>
    <Route path='/register' element={<Reg/>} ></Route>
    <Route path='/home' element={<Userhome/>} ></Route>
    <Route path='/home/learn' element={<Learn/>}></Route>
    <Route path='/home/learn/cd/:cid' element={<Codetails />}></Route>
   </Routes>
   </BrowserRouter>
    </div>
  );
}

export default App;
