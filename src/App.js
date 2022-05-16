import './App.css';
import { BrowserRouter as Router, Route, Routes  } from "react-router-dom"
import AddCategory from './components/Category/AddCategory';
import AddQuestion from './components/Question/AddQuestion';
import SubmitSurvey from './components/Answer/SubmitSurvey';
import ListAnswers from './components/Answer/ListAnswers';

function App() {
  return (
    <div>
      <Router>
        <div className="container">
            <Routes>
              <Route path="/" element={<AddCategory/>}></Route>
              <Route path="/add-category" element={<AddCategory/>}></Route>
              <Route path="/add-question" element={<AddQuestion/>}></Route>
              <Route path="/submit-survey" element={<SubmitSurvey/>}></Route>
              <Route path="/list-answers" element={<ListAnswers/>}></Route>
            </Routes>
        </div>
      </Router>  
    </div>
  );
}

export default App;
