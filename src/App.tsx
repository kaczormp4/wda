import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import NewAd from './pages/NewAd/NewAd';
import Offer from './pages/Offer/Offer';
import Offers from './pages/Offers/Offers';
import Profile from './pages/Profile/Profile';
import FavList from './pages/FavList/FavList';
import Messages from './pages/Messages/Messages';
import { Home } from './pages/Home/Home';
import NotFound from './pages/NotFound/NotFound';
import OfferEdit from './pages/Offer/OfferEdit/OfferEdit';
import AdminPanel from './pages/AdminPanel/AdminPanel';

import Showcase from './components/Showcase/Showcase';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

import APITest from './api/APITest';

import { Docs } from './docs/Docs';
import './utils/icons';

import './App.scss';

const flyoutMenuList = [
  {
    id: '1',
    text: 'Profil',
    route: 'profil',
    icon: 'home',
  },
  {
    id: '2',
    text: 'Wiadomości',
    route: 'wiadomosci',
    icon: 'circle-plus',
  },
  {
    id: '3',
    text: 'Moja Lista',
    route: 'moja-lista',
    icon: 'comment-alt',
  },
];

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar flyoutMenuList={flyoutMenuList} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/*" element={<NotFound />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/wiadomosci/:userId" element={<Messages />} />
          <Route path="/wiadomosci" element={<Messages />} />
          <Route path="/nowe-ogloszenie" element={<NewAd />} />
          <Route path="/apitest" element={<APITest />} />
          <Route path="/components" element={<Showcase />} />
          <Route path="/moja-lista" element={<FavList />} />
          <Route path="/admin" element={<AdminPanel />}>
            <Route path=":subpage" element={<Profile />} />
          </Route>
          <Route path="/profil" element={<Profile />}>
            <Route path=":id" element={<Profile />} />
          </Route>
          <Route path="/ogloszenia" element={<Offers />}>
            <Route path=":id" element={<Offers />} />
          </Route>
          <Route path="/ogloszenie">
            <Route path=":offerId" element={<Offer />} />
            <Route path=":offerId/edycja" element={<OfferEdit />} />
          </Route>
        </Routes>
        <Footer />
      </Router >
      <ToastContainer />
    </div >
  );
}

export default App;
