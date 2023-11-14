import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landing from './Pages/Landing';
import SignupPage from './Pages/SignupPage';
import SigninPage from './Pages/SigninPage';
import Home from './Pages/Home';
import Notes from './Pages/Notes';
import CanvasGenerator from './Pages/CanvasGenerator';
import { AppProvider } from './Components/context';
import Canvas from './Pages/Canvas';

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
            <Route path="/canvas-generator" element={<CanvasGenerator />} />
            <Route path="/canvas" element={<Canvas />} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </div>
  );
}

export default App;
