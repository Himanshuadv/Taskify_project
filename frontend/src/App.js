import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landing from './Pages/Landing';
import SignupPage from './Pages/SignupPage';
import SigninPage from './Pages/SigninPage';
import Home from './Pages/Home';
import Notes from './Pages/Notes';
import Canvas from './Pages/CanvasGenerator';
import { AppProvider } from './Components/context';
import CanvasCreate from './Pages/Canvas';

function App() {
  return (
    <div className="App">
      <AppProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/signin" element={<SigninPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/canvas-generator" element={<Canvas />} />
            <Route path="/canvas" element={<CanvasCreate />} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </div>
  );
}

export default App;
