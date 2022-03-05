import React, { Component } from 'react';

import styles from "./NotFound.module.scss";
import { Link } from "react-router-dom";

class NotFound extends Component {

    render() {
        return <>
            <div className={styles.NotFound}>Not Found</div>
            <Link to="/">Home</Link>
        </>
    }
}

export default NotFound;