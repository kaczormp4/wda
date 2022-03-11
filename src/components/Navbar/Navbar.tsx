import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC, useState } from 'react'
import { Link } from 'react-router-dom';
import Button from '../commonComponents/Button/Button';
import styles from "./Navbar.module.scss";

interface NavbarProps {
    loggedIn: boolean,
    flyoutMenuList: {
        id: string,
        text: string,
        route: string,
        icon: string
    }[];
}

const Navbar: FC<NavbarProps> = (props) => {
    const { loggedIn, flyoutMenuList } = props;
    const [openMenu, setOpenMenu] = useState<boolean>(false);

    return (
        <div className={styles.NavbarContainer}>
            <div className={styles.NavbarContent}>
                <div className={styles.Logo}>
                    <Link to='/'>WEDD LOGO</Link>
                </div>
                <nav className={styles.NavMenu}>
                    <Link to='/'>
                        <Button kind='teritiary' icon={<FontAwesomeIcon icon="comment-alt" />}>Wiadomości</Button>
                    </Link>
                    <Link to='/'>
                        <Button kind='teritiary' icon={<FontAwesomeIcon icon="list-squares" />}>Moja Lista</Button>
                    </Link>
                    <Link to='/'>
                        <Button kind='teritiary' icon={<FontAwesomeIcon icon="circle-plus" />}>Dodaj ogłoszenie</Button>
                    </Link>
                    {
                        loggedIn ?
                            <div className={styles.Avatar}>
                                <Link to='/'>
                                    <img src={"https://mir-s3-cdn-cf.behance.net/project_modules/disp/ea7a3c32163929.567197ac70bda.png"} />
                                </Link>
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
                            <Link to='/'>
                                <Button kind='primary'>Zaloguj Się</Button>
                            </Link>
                    }

                </nav>
            </div>
            <div className={styles.NavbarContentMobile}>
                <nav className={styles.NavMenu}>
                    <Link to='/'>
                        <Button kind='ghost' size="lg" iconOnly icon={<FontAwesomeIcon icon="home" />}>Wiadomości</Button>
                    </Link>
                    <Link to='/components'>
                        <Button kind='ghost' size="lg" iconOnly icon={<FontAwesomeIcon icon="list-squares" />}>Moja Lista</Button>
                    </Link>
                    <Link to='/components'>
                        <Button kind='ghost' size="lg" iconOnly icon={<FontAwesomeIcon icon="circle-plus" />}>Dodaj ogłoszenie</Button>
                    </Link>
                    <Link to='/components'>
                        <Button kind='ghost' size="lg" iconOnly icon={<FontAwesomeIcon icon="comment-alt" />}>Wiadomości</Button>
                    </Link>
                    {
                        openMenu ?
                            <Button
                                kind='ghost'
                                size="lg"
                                iconOnly
                                icon={<FontAwesomeIcon icon='close' />}
                                onClick={() => setOpenMenu(!openMenu)}
                            >
                                MENU
                            </Button> :
                            <Button
                                kind='ghost'
                                size="lg"
                                iconOnly
                                icon={<FontAwesomeIcon icon='navicon' />}
                                onClick={() => setOpenMenu(!openMenu)}
                            >
                                CLOSE
                            </Button>
                    }
                </nav>
                {
                    openMenu && <>
                        <div className={styles.FloatMobileMenuOverlay} onClick={() => setOpenMenu(!openMenu)}>
                        </div>
                        <div className={styles.FloatMobileMenuBackground}>
                            <div className={styles.FloatMobileMenu}>
                                <div className={styles.FloatMenuClose}>
                                    <Button
                                        kind='ghost'
                                        size="lg"
                                        iconOnly
                                        icon={<FontAwesomeIcon icon='close' />}
                                        onClick={() => setOpenMenu(!openMenu)}
                                    ></Button>
                                </div>
                                {
                                    loggedIn &&
                                    <div className={styles.FloatMenuAvatarBox}>
                                        <div className={styles.FloatMenuAvatar}>
                                            <img src={"https://mir-s3-cdn-cf.behance.net/project_modules/disp/ea7a3c32163929.567197ac70bda.png"} />
                                        </div>
                                        <div className={styles.FloatMenuUserName}>
                                            <h1>Jan Kowalski</h1>
                                        </div>
                                    </div>
                                }
                                <div className={styles.FloatMenuList}>
                                    {
                                        flyoutMenuList.map((item) =>
                                            <Link to={item.route} key={item.id}>
                                                <Button kind='ghost' size="lg" icon={<FontAwesomeIcon icon="home" />}>{item.text}</Button>
                                            </Link>
                                        )
                                    }
                                </div>
                                <div className={styles.FloatMenuLogout}>
                                    {
                                        loggedIn ?
                                            <Link to='/'>
                                                <Button kind='ghost' size="lg" icon={<FontAwesomeIcon icon="sign-out" />}>WYLOGUJ</Button>
                                            </Link> :
                                            <Link to='/'>
                                                <Button kind='ghost' size="lg" icon={<FontAwesomeIcon icon="sign-out" />}>ZALOGUJ</Button>
                                            </Link>
                                    }
                                </div>
                            </div>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}
export default Navbar;
