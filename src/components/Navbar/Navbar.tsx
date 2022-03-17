import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC, useCallback, useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Button from '../commonComponents/Button/Button';
import { NavbarMobileProvider } from './NavbarMobileProvider/NavbarMobileProvider';
import styles from "./Navbar.module.scss";
import classnames from 'classnames';

interface NavbarProps {
    loggedIn: boolean,
    flyoutMenuList: {
        id: string,
        text: string,
        route: string,
        icon: string
    }[];
    userInfo: {
        name: string,
        avatar: string
    }
}

const Navbar: FC<NavbarProps> = (props) => {
    const { loggedIn, flyoutMenuList, userInfo } = props;
    const [openMenu, setOpenMenu] = useState<boolean>(false);
    const [unhideNavbar, setUnhideNavbar] = useState<boolean>(true);
    const mobileNavbarHeight = useRef<HTMLDivElement>(null);

    const navigate = useNavigate();

    const escFunction = useCallback((event) => {
        if (event.key === "Escape") {
            setOpenMenu(false);
        }
    }, []);

    const handleScroll = useCallback(() => {
        var lastScrollTop = 0;
        var st = window.pageYOffset || document.documentElement.scrollTop;
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
        document.addEventListener("keydown", escFunction, false);
        window.addEventListener('scroll', handleScroll, false);

        return () => {
            document.removeEventListener("keydown", escFunction, false);
        };
    }, []);

    const navigateTo = (route: string) => {
        navigate(`/${route}`);
        setOpenMenu(false);
    }
    const UserAvatar = () => {
        if (userInfo.avatar) {
            return <Link to='/profil'>
                <img src={userInfo.avatar} />
            </Link>
        } else {
            return <Link to='/profil'>
                <img src={"https://mir-s3-cdn-cf.behance.net/project_modules/disp/ea7a3c32163929.567197ac70bda.png"} />
            </Link>
        }
    }

    return (
        <div className={styles.NavbarContainer}>
            <div className={styles.NavbarContent}>
                <div className={styles.Logo}>
                    <Link to='/'>WEDD LOGO</Link>
                </div>
                <nav className={styles.NavMenu}>
                    <Link to='/wiadomosci'>
                        <Button kind='teritiary' icon={<FontAwesomeIcon icon="comment-alt" />} iconPosition="left">Wiadomości</Button>
                    </Link>
                    <Link to='/moja-lista'>
                        <Button kind='teritiary' icon={<FontAwesomeIcon icon="list-squares" />} iconPosition="left">Moja Lista</Button>
                    </Link>
                    <Link to='/nowe-ogloszenie'>
                        <Button kind='teritiary' icon={<FontAwesomeIcon icon="circle-plus" />}>Dodaj ogłoszenie</Button>
                    </Link>
                    {
                        loggedIn ?
                            <div className={styles.Avatar}>
                                {UserAvatar()}
                                <div className={styles.FlyoutMenu}>
                                    {
                                        flyoutMenuList.map((item) =>
                                            <Link to={item.route} key={item.id}>
                                                <Button kind='ghost' size="lg" >{item.text}</Button>
                                            </Link>
                                        )
                                    }
                                </div>
                            </div>
                            :
                            <Link to='/logowanie'>
                                <Button kind='primary'>Zaloguj Się</Button>
                            </Link>
                    }
                </nav>
            </div>
            <NavbarMobileProvider>
                <div className={classnames(styles.NavbarContainer, { [styles.Open]: unhideNavbar, [styles.Close]: !unhideNavbar })} ref={mobileNavbarHeight}>
                    <div className={styles.NavbarContentMobile}>
                        <nav className={styles.NavMenu}>
                            <Button kind='ghost' size="lg" iconOnly icon={<FontAwesomeIcon icon="home" />} onClick={() => navigateTo('')}>
                                HOME
                            </Button>
                            <Button kind='ghost' size="lg" iconOnly icon={<FontAwesomeIcon icon="list-squares" />} onClick={() => navigateTo('moja-lista')}>
                                Moja Lista
                            </Button>
                            <Button kind='ghost' size="lg" iconOnly icon={<FontAwesomeIcon icon="circle-plus" />} onClick={() => navigateTo('nowe-ogloszenie')}>
                                Dodaj ogłoszenie
                            </Button>
                            <Button kind='ghost' size="lg" iconOnly icon={<FontAwesomeIcon icon="comment-alt" />} onClick={() => navigateTo('wiadomosci')}>
                                wiadomosci
                            </Button>
                            <Button kind='ghost' size="lg" iconOnly icon={<FontAwesomeIcon icon={openMenu ? 'close' : 'navicon'} />} onClick={() => setOpenMenu(!openMenu)} >
                                MENU
                            </Button>
                        </nav>
                    </div>
                </div>
                {
                    openMenu &&
                    <div className={styles.FloatMobileMenuOverlay} onClick={() => setOpenMenu(!openMenu)}></div>
                }
                <div className={classnames(styles.FloatMobileMenuBackground, { [styles.FloatMenuOpen]: openMenu, [styles.FloatMenuClose]: !openMenu })}>
                    <div className={styles.FloatMobileMenu}>
                        <div className={styles.FloatMenuClose}>
                            <Button kind='ghost' size="lg" iconOnly icon={<FontAwesomeIcon icon='close' />} onClick={() => setOpenMenu(!openMenu)} />
                        </div>
                        {
                            loggedIn &&
                            <div className={styles.FloatMenuAvatarBox}>
                                <div className={styles.FloatMenuAvatar}>
                                    {UserAvatar()}
                                </div>
                                <div className={styles.FloatMenuUserName}>
                                    <h1>{userInfo.name}</h1>
                                </div>
                            </div>
                        }
                        <div className={styles.FloatMenuList}>
                            {
                                flyoutMenuList.map((item) =>
                                    <Link to={item.route} key={item.id}>
                                        {item.text}
                                    </Link>
                                )
                            }
                        </div>
                        {
                            openMenu && <div className={styles.FloatMenuLogout} style={{ marginBottom: mobileNavbarHeight.current.clientHeight }}>
                                {
                                    loggedIn ?
                                        <Button kind='ghost' size="lg" icon={<FontAwesomeIcon icon="sign-out" />} onClick={() => navigateTo('log-out')}>WYLOGUJ</Button>
                                        :
                                        <Button kind='ghost' size="lg" icon={<FontAwesomeIcon icon="sign-out" />} onClick={() => navigateTo('logowanie')}>ZALOGUJ</Button>
                                }
                            </div>
                        }
                    </div>
                </div>
            </NavbarMobileProvider>
        </div>
    )
}
export default Navbar;
