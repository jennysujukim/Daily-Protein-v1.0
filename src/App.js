import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

// styles
import './_App.scss';

// pages
import Header from './components/Header';
import Home from './pages/Home';
import Onboard from './pages/Onboard';
import Add from './pages/Add';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Setting from './pages/Setting';
import Footer from './components/Footer';

function App() {

  // we don't want to display content until the auth is ready. -> we need authIsREady
  const { user, authIsReady } = useAuthContext()

  return (
    <div className="App">
      { authIsReady && (
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
            <Route path="/account/setting" element={user && <Setting />} />
            <Route path="/account/signup" element={!user ? <Signup /> : <Navigate to ="/onboard" replace={true}/>} />
            <Route path="/account/login" element={!user ? <Login /> : <Navigate to ="/" replace={true}/>} />
          </Routes>
        </main>
        { user && 
          <footer className="Footer">
            <Footer /> 
          </footer>
        }
      </BrowserRouter>
      )}
    </div>
  );
}

export default App;
