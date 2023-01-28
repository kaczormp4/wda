import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import classnames from 'classnames';

import Button from '../commonComponents/Button/Button';
import { Portal } from '../Portal/Portal';
import styles from './Navbar.module.scss';
import Flyout from '../commonComponents/Flyout/Flyout';
import AuthenticationContext from '../../api/Authentication/AuthenticationContext';
import { MSALInstance } from '../../api/Authentication/MSALConfig';
import { IOffer, Offers } from '../../api/Offers';

interface NavbarProps {
  flyoutMenuList: {
    id: string;
    text: string;
    route: string;
    icon: string;
  }[];
}

const Navbar: FC<NavbarProps> = props => {
  const context = useContext(AuthenticationContext);
  const location = useLocation();

  const { flyoutMenuList } = props;
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [unhideNavbar, setUnhideNavbar] = useState<boolean>(true);
  const [offers, setOffers] = useState<IOffer[]>(null);
  const mobileNavbarHeight = useRef<HTMLDivElement>(null);
  let lastScrollTop = 0;
  const isAdmin = MSALInstance.getAccount(); // currently just isLoggedIn

  const navigate = useNavigate();

  const escFunction = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setOpenMenu(false);
    }
  }, []);

  const handleScroll = useCallback(() => {
    let st = window.pageYOffset || document.documentElement.scrollTop;
    if (openMenu === false) {
      if (st > lastScrollTop) {
        setUnhideNavbar(false);
        setOpenMenu(false);
      } else {
        setUnhideNavbar(true);
      }
    }

    lastScrollTop = st <= 0 ? 0 : st;
  }, []);

  useEffect(() => {
    const prof = MSALInstance.getAccount();
    if (prof) {
      new Offers().getUserOffers(prof.accountIdentifier).then(userOffers => {
        setOffers(userOffers);
      });
    }
    document.addEventListener('keydown', escFunction, false);
    window.addEventListener('scroll', handleScroll, false);

    return () => {
      document.removeEventListener('keydown', escFunction, false);
    };
  }, []);

  const navigateTo = (route: string) => {
    navigate(`/${route}`);
    setOpenMenu(false);
  };

  const UserAvatar = () => {
    if (context.authInfo) {
      return (
        <Link to="/profil">
          <img
            src={
              'https://mir-s3-cdn-cf.behance.net/project_modules/disp/ea7a3c32163929.567197ac70bda.png'
            }
          />
        </Link>
      );
    } else {
      return (
        <Link to="/profil">
          <img
            src={
              'https://mir-s3-cdn-cf.behance.net/project_modules/disp/ea7a3c32163929.567197ac70bda.png'
            }
          />
        </Link>
      );
    }
  };

  return (
    <div className={styles.NavbarContainer}>
      <div className={styles.NavbarContent}>
        <div className={styles.Logo}>
          <Link to="/"><div className={styles.LogoImg}></div></Link>
        </div>
        <nav className={styles.NavMenu}>
          {isAdmin && (
            <Button
              kind="ghost"
              onClick={() => navigateTo('admin')}
              icon={<FontAwesomeIcon icon="dashboard" />}
              iconPosition="left"
            >
              Panel administracyjny
            </Button>
          )}
          <Button
            kind="teritiary"
            onClick={() => navigateTo('wiadomosci')}
            icon={<FontAwesomeIcon icon="comment-alt" />}
            disabled={!isAdmin}
            iconPosition="left"
          >
            Wiadomości
          </Button>
          <Button
            kind="teritiary"
            onClick={() => navigateTo('moja-lista')}
            icon={<FontAwesomeIcon icon="list-squares" />}
            iconPosition="left"
          >
            Moja Lista
          </Button>
          <Flyout
            direction="bottom-end"
            useAbsolutePositioning
            focusTrap
            renderInPortal
            openOnHover
            disabled={!offers || offers?.length < 3 || location.pathname === '/profil'}
            buttonProps={{
              kind: 'teritiary',
              children: 'Dodaj ogłoszenie',
              disabled: offers && offers.length >= 3,
              onClick: () =>
                context.isAuthenticated ? navigateTo('nowe-ogloszenie') : context.login(),
              icon: <FontAwesomeIcon icon="circle-plus" />,
            }}
          >
            <div className={styles.FlyoutBtn}>
              <p>Posiadasz co najmniej 3 aktywne ogłoszenia.</p>
              <p>
                Dodaj pakiet do swojego konta, móc dodać kolejne ogłoszenia i zyskac dodatkowe
                korzyści!
              </p>
              <Button size="sm" onClick={() => navigate('/profil')}>
                Przejdź do ustawień
              </Button>
            </div>
          </Flyout>
          {context.isAuthenticated ? (
            <Flyout
              direction="bottom-end"
              useAbsolutePositioning
              focusTrap
              renderInPortal
              buttonProps={{ kind: 'ghost', iconOnly: true, icon: <FontAwesomeIcon icon="user" />, }}
            >
              <div className={styles.FlyoutMenu}>
                {flyoutMenuList.map(item => (
                  <Button
                    kind="ghost"
                    key={item.id}
                    size="lg"
                    onClick={() => navigateTo(item.route)}
                  >
                    {item.text}
                  </Button>
                ))}
                <Button kind="ghost" size="lg" onClick={context.logout}>
                  Wyloguj
                </Button>
              </div>
            </Flyout>
          ) : (
            <Button kind="primary" onClick={context.login}>
              Zaloguj
            </Button>
          )}
        </nav>
      </div>
      <Portal divId="navbarMenuMobile">
        <div
          className={classnames(styles.NavbarContainer, {
            [styles.Open]: unhideNavbar,
            [styles.Close]: !unhideNavbar,
          })}
          ref={mobileNavbarHeight}
        >
          <div className={styles.NavbarContentMobile}>
            <nav className={styles.NavMenu}>
              <Button
                kind="ghost"
                size="lg"
                iconOnly
                icon={<FontAwesomeIcon icon="home" />}
                onClick={() => navigateTo('')}
              >
                HOME
              </Button>
              <Button
                kind="ghost"
                size="lg"
                iconOnly
                icon={<FontAwesomeIcon icon="list-squares" />}
                onClick={() => navigateTo('moja-lista')}
              >
                Moja Lista
              </Button>
              <Button
                kind="ghost"
                size="lg"
                iconOnly
                icon={<FontAwesomeIcon icon="circle-plus" />}
                disabled={offers && offers.length >= 3}
                onClick={() =>
                  context.isAuthenticated ? navigateTo('nowe-ogloszenie') : context.login()
                }
              >
                Dodaj ogłoszenie
              </Button>
              <Button
                kind="ghost"
                size="lg"
                iconOnly
                icon={<FontAwesomeIcon icon="comment-alt" />}
                onClick={() => navigateTo('wiadomosci')}
              >
                wiadomosci
              </Button>
              <Button
                kind="ghost"
                size="lg"
                iconOnly
                icon={<FontAwesomeIcon icon={openMenu ? 'close' : 'navicon'} />}
                onClick={() => setOpenMenu(!openMenu)}
              >
                MENU
              </Button>
            </nav>
          </div>
        </div>
        {openMenu && (
          <div
            className={styles.FloatMobileMenuOverlay}
            onClick={() => setOpenMenu(!openMenu)}
          ></div>
        )}
        <div
          className={classnames(styles.FloatMobileMenuBackground, {
            [styles.FloatMenuOpen]: openMenu,
            [styles.FloatMenuClose]: !openMenu,
          })}
        >
          <div className={styles.FloatMobileMenu}>
            <div className={styles.FloatMenuClose}>
              <Button
                kind="ghost"
                size="lg"
                iconOnly
                icon={<FontAwesomeIcon icon="close" />}
                onClick={() => setOpenMenu(!openMenu)}
              />
            </div>
            {context.isAuthenticated && (
              <div className={styles.FloatMenuAvatarBox}>
                <div className={styles.FloatMenuAvatar}>{UserAvatar()}</div>
                <div className={styles.FloatMenuUserName}>
                  <h1>{context.authInfo.name}</h1>
                </div>
              </div>
            )}
            <div className={styles.FloatMenuList}>
              {flyoutMenuList.map(item => (
                <Button key={item.id} kind="ghost" size="lg" onClick={() => navigateTo(item.route)}>
                  {item.text}
                </Button>
              ))}
            </div>
            {openMenu && (
              <div
                className={styles.FloatMenuLogInLogout}
                style={{ marginBottom: mobileNavbarHeight.current.clientHeight }}
              >
                {context.isAuthenticated ? (
                  <Button
                    kind="teritiary"
                    size="lg"
                    icon={<FontAwesomeIcon icon="sign-out" />}
                    onClick={() => navigateTo('log-out')}
                  >
                    WYLOGUJ
                  </Button>
                ) : (
                  <Button
                    kind="primary"
                    size="lg"
                    icon={<FontAwesomeIcon icon="sign-out" />}
                    onClick={() => navigateTo('logowanie')}
                  >
                    ZALOGUJ
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </Portal>
    </div>
  );
};
export default Navbar;
