import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AssignmentList from './pages/AssignmentList';
import AssignmentEditor from './pages/AssignmentEditor';
import './styles/main.scss';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<AssignmentList />} />
        <Route path="/assignment/:id" element={<AssignmentEditor />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
