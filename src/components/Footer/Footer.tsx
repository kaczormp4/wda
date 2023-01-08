import { FC, useCallback, useContext, useEffect, useRef, useState } from 'react';
import styles from './Footer.module.scss';
import Button from '../commonComponents/Button/Button';
import { useLocation } from 'react-router-dom';


const Footer: FC = props => {
  const location = useLocation();
  if(location.pathname === '/docs') {
    return <></>;
  }
  return (
    <footer className={styles.Footer}>
      <Button renderAsLink={true} kind="secondary" href={`/docs`}>Jak działa Nuptiae</Button>
    </footer>
  );
};
export default Footer;
