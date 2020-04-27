import React from 'react';
import { Accordion, AccordionItem } from '@moxy/react-accordion';

import styles from './index.module.css';

const Title = () => (
    <div className={ styles.title }>
        Title 0
    </div>
);

// eslint-disable-next-line react/prop-types
const Content = ({ isActive }) => (
    <div className={ styles.description }>
        { isActive ? 'Open' : 'Closed' }
    </div>
);

const Home = () => (
    <div className={ styles.home }>
        <h1>react-accordion</h1>
        <Accordion
            className={ styles.accordion }
            defaultActiveItem={ [1] }
            scrollIntoView>
            <AccordionItem title={ <Title /> }>
                { ({ isActive }) => (<Content isActive={ isActive } />) }
            </AccordionItem>
            <AccordionItem title="Title 1">
                <div className={ styles.description }>
                    This is the item 1.
                </div>
            </AccordionItem>
            <AccordionItem title="Title 2">
                <div className={ styles.description }>
                    This is the item 2.
                </div>
            </AccordionItem>
            <AccordionItem title="Title 3">
                <div className={ styles.description }>
                    This is the item 3.
                </div>
            </AccordionItem>
        </Accordion>
    </div>
);

export default Home;
