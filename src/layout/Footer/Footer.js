import React from 'react';
import { Footer } from 'mui-layout';

import styles from './Footer.module.css';

const FooterLayout = props => (
    <Footer className={`${styles.footer} ${props.styles.footer}`}>
        Vet Express &copy; 2019.
    </Footer>
);

export default FooterLayout;