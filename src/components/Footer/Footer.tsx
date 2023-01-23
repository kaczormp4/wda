import { FC } from 'react';
import { useLocation } from 'react-router-dom';

import Button from '../commonComponents/Button/Button';

import styles from './Footer.module.scss';

const Footer: FC = () => {
  const location = useLocation();
  if (location.pathname === '/docs') {
    return <></>;
  }

  return (
    <footer className={styles.Footer}>
      <Button renderAsLink={true} kind="secondary" href={`/docs`}>Jak działa Nuptiae</Button>
    </footer>
  );
};

export default Footer;
