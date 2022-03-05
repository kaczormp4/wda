import React, { Component } from 'react';
import { Link } from "react-router-dom";

import styles from "./Home.module.scss";

class Home extends Component {

    render() {
        return <>
        <div className={styles.Home}>SSS</div>
        <Link to="/asdsaaisouygdas">Go to not found</Link>
    </>    
}
}

export default Home;