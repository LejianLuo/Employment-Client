import JobPage from "./components/JobList/JobPage";
import Header from "./components/Header";
import { Route,Routes, useLocation} from "react-router-dom";
import { useEffect } from "react";
import Login from "./components/Login";
import Resume from "./components/Resume/Resume";
import ApplicationPage from "./components/Applications/ApplicationPage";

function App() {

  const location=useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="App font-Tahoma">
        <Header/>
        <Routes>
          <Route path='/' element={<JobPage/>}/>
          <Route path='login' element={<Login/>}/>
          <Route path='/resume/*'element={<Resume/>}/>
          <Route path='/applications'element={<ApplicationPage/>}/>
        </Routes>
    </div>
  );
}

export default App;
  