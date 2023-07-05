import { 
  BrowserRouter, 
  Routes, 
  Route, 
  Navigate } 
  from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

// styles
import './App.scss';

// pages
import Home from './pages/Home';
import Onboard from './pages/Onboard';
import Add from './pages/Add';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Setting from './pages/Setting';
import NotFound from './pages/NotFound';

// components
import Header from './components/Header';
import { ProteinContextProvider } from './context/ProteinContext';


function App() {

  // Use AuthContext() 
    // - to check auth is ready before display content
    // - to check user availability before routing each page
  const { user, authIsReady } = useAuthContext()

  return (
    <div className="App">
      { authIsReady && (
      <ProteinContextProvider>
        <BrowserRouter>
          { user &&
            <header className="Header">
              <Header />
            </header>
          }
          <main className="Content">
            <Routes>
              <Route path="/" element={user ? <Home /> : <Navigate to ="/account/login" replace={true}/>} />
              <Route path="/onboard" element={user && <Onboard />} />
              <Route path="/add" element={user && <Add />} />
              <Route path="/account">
                <Route path="setting" element={user && <Setting />} />
                <Route path="signup" element={!user ? <Signup /> : <Navigate to ="/onboard" replace={true}/>} />
                <Route path="login" element={!user ? <Login /> : <Navigate to ="/" replace={true}/>} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </BrowserRouter>
      </ProteinContextProvider>
      )}
    </div>
  );
}

export default App;
