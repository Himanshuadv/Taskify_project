import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landing from './Pages/Landing';
import SignupPage from './Pages/SignupPage';
import SigninPage from './Pages/SigninPage';
import Home from './Pages/Home';
import Notes from './Pages/Notes';
import AboutUsPage from './Pages/AboutUsPage';
import CanvasGenerator from './Pages/CanvasGeneratorPage';
import { AppProvider } from './Components/context';
import Canvas from './Pages/CanvasPage';
import {TaskProvider} from './Components/TaskContext';
// import ContactUsPage from './Pages/ContactUsPage';
// import CanvasEditorPage from './Pages/CanvasEditorPage';
// import IndividualIntervalsExample from './Components/IndividualIntervalExample';

function App() {
  return (
    <div className="App">
    <AppProvider>
      <TaskProvider>  
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/signin" element={<SigninPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/canvas-generator" element={<CanvasGenerator />} />
            <Route path="/canvas" element={<Canvas />} />
            <Route path="/aboutus" element={<AboutUsPage />} />
            {/* <Route path="/contactus" element={<ContactUsPage />} /> */}
            {/* <Route path='canvas-editor' element={<CanvasEditorPage />} /> */}
            {/* <Route path="/aboutus" element={<IndividualIntervalsExample />} /> */}
          </Routes>
        </BrowserRouter>
        </TaskProvider>
      </AppProvider>
    </div>
  );
}

export default App;
