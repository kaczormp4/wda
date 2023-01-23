import { FC } from 'react';
import { Link } from "react-router-dom";

import { SectionMedium } from '../../components/Section/Section';

import styles from "./NotFound.module.scss";

const NotFound: FC = () => {
    return (
        <SectionMedium>
            <div className={styles.NotFound}><h2>page not found</h2>
                <h1><Link to="/">go to Home</Link></h1>
            </div>
        </SectionMedium>
    )
}

export default NotFound;