import './App.scss';
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound/NotFound';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

const routes = [
  {
    path: "/",
    element: Home
  },
  {
    path: "/*",
    element: NotFound
  }
];


function App() {
  return (
    <div className="App">
      <Router>
        <div className="app">
          <Routes >
            {routes.map((route, i) => (
              <Route key={i} path={route.path} element={<route.element/>}/>
            ))}
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
