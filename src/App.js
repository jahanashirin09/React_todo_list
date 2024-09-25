import { BrowserRouter } from 'react-router-dom';
import './App.css';
import PageNavigation from './Routes/PageNavigation'
import Login from './component/Login';

function App() {
  return (
    <div  className='main-app-container'>
      <BrowserRouter>
        <PageNavigation/>
      </BrowserRouter>
      
     
    </div>
  );
}

export default App;
