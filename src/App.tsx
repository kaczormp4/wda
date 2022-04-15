import './App.scss';
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound/NotFound';
import Showcase from './components/Showcase/Showcase';
import NewAd from './pages/NewAd/NewAd';
import './utils/icons';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import APITest from './api/APITest';
import { ToastContainer } from 'react-toastify';


const routes = [
  {
    path: "/",
    element: Home
  },
  {
    path: "/components",
    element: Showcase
  }, 
  {
    path: "/nowe-ogloszenie",
    element: NewAd
  },
  {
    path: "/apitest",
    element: APITest
  },
  {
    path: "/*",
    element: NotFound
  }
];

const temporaryFlyoutMenuList = [
  {
    id: '1',
    text: 'Profil',
    route: '/profil',
    icon: 'home'
  },
  {
    id: '2',
    text: 'Wiadomości',
    route: '/wiadomosci',
    icon: 'circle-plus'
  },
  {
    id: '3',
    text: 'Ustawienia',
    route: '/ustawienia',
    icon: 'comment-alt'
  },
  {
    id: '4',
    text: 'Moja Lista',
    route: '/moja-lista',
    icon: 'comment-alt'
  },
]

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar loggedIn={true} flyoutMenuList={temporaryFlyoutMenuList} userInfo={{ name: "Jan Kowalski", avatar: null }} />
        <div className="app">
          <Routes >
            {routes.map((route, i) => (
              <Route key={i} path={route.path} element={<route.element />} />
            ))}
          </Routes>
        </div>
      </Router>
      <ToastContainer/>
    </div>
  );
}

export default App;
