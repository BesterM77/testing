import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Pages/Layout';
import Menu from './Pages/Menu';
import Income from './Pages/Income';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Expense from './Pages/Expense';
import Summary from './Pages/Summary';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [username, setUsername] = useState('');

  if (!loggedIn) {
    if (registered) {
      return (
        <Register
          onRegister={() => { setRegistered(false);}}
          onSwitchToLogin={() => setRegistered(false)}
        />
      );
    }
    return (
      <Login
        onLogin={(user) => {
          setLoggedIn(true);
          setUsername(user);
        }}
        onSwitchToRegister={() => setRegistered(true)}
      />
    );
  }


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Menu username={username} />} />
          <Route path="income" element={<Income username={username} />} />
          <Route path="expenses" element={<Expense username={username} />} />
          <Route path="summary" element={<Summary username={username} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
 
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

