import './App.css';
import NewsList from './news/NewsList';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<NewsList />} />
        <Route path='/news' element={<NewsList /> } />
      </Routes>
    </Router>
  );
}

export default App;
