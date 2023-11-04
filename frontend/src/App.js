import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Landing from './Pages/Landing';
import SignupPage from './Pages/SignupPage';
import SigninPage from './Pages/SigninPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing />}/>
          <Route path='/signup' element={<SignupPage />}/>  
          <Route path='/signin' element={<SigninPage />}/>
        </Routes> 
      </BrowserRouter>
    </div>
  );
}

export default App;
