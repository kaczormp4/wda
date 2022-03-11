import './App.scss';
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound/NotFound';
import Showcase from './components/Showcase/Showcase';
import './utils/icons';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar/Navbar';


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
    path: "/*",
    element: NotFound
  }
];

const temporaryFlyoutMenuList = [
  {
    id: '1',
    text: 'home',
    route: '/home',
    icon: 'home'
  },
  {
    id: '2',
    text: 'User',
    route: '/user',
    icon: 'circle-plus'
  },
  {
    id: '3',
    text: 'Settiings',
    route: '/ettiings',
    icon: 'comment-alt'
  },
]

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar loggedIn={true} flyoutMenuList={temporaryFlyoutMenuList} />
        <div className="app">
          <Routes >
            {routes.map((route, i) => (
              <Route key={i} path={route.path} element={<route.element />} />
            ))}
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
