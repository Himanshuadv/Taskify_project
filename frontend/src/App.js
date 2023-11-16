import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landing from './Pages/Landing';
import SignupPage from './Pages/SignupPage';
import SigninPage from './Pages/SigninPage';
import Home from './Pages/Home';
import Notes from './Pages/Notes';
<<<<<<< HEAD
import AboutUsPage from './Pages/AboutUsPage';
import CanvasGenerator from './Pages/CanvasGeneratorPage';
import { AppProvider } from './Components/context';
import Canvas from './Pages/CanvasPage';
import {TaskProvider} from './Components/TaskContext';
// import IndividualIntervalsExample from './Components/IndividualIntervalExample';
=======
import CanvasGenerator from './Pages/CanvasGenerator';
import { AppProvider } from './Components/context';
import Canvas from './Pages/Canvas';
>>>>>>> 00d214fab0d8c14484db942029a128cbfbcdac25

function App() {
  return (
    <div className="App">
<<<<<<< HEAD
    <TaskProvider>
=======
>>>>>>> 00d214fab0d8c14484db942029a128cbfbcdac25
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
<<<<<<< HEAD
            <Route path="/aboutus" element={<AboutUsPage />} />
            {/* <Route path="/aboutus" element={<IndividualIntervalsExample />} /> */}
          </Routes>
        </BrowserRouter>
      </AppProvider>
      </TaskProvider>
=======
          </Routes>
        </BrowserRouter>
      </AppProvider>
>>>>>>> 00d214fab0d8c14484db942029a128cbfbcdac25
    </div>
  );
}

export default App;
