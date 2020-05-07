import React, { useCallback, useEffect, useRef } from 'react';
import { usePrevious } from 'react-hanger';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import scrollIntoViewIfNeeded from 'smooth-scroll-into-view-if-needed';

import Heading from './components/Heading';
import Content from './components/Content';

const AccordionItem = ({
    animationDuration = 300,
    animationEasing = 'ease-in-out',
    children,
    itemContainerClassName,
    headingContainerClassName,
    titleContainerClassName,
    contentContainerClassName,
    contentClassName,
    iconClassName,
    icon,
    index,
    isActive = false,
    onItemToggle = () => null,
    scrollIntoView = false,
    toggleItemActive,
    title,
}) => {
    const containerRef = useRef();
    const wasActive = usePrevious(isActive);

    useEffect(() => {
        if (wasActive !== isActive && typeof wasActive !== 'undefined') {
            onItemToggle(index, { active: isActive });
        }
    }, [index, isActive, onItemToggle, wasActive]);

    const scrollToContent = useCallback(() => {
        if (!wasActive && isActive && scrollIntoView) {
            scrollIntoViewIfNeeded(containerRef.current, {
                block: 'nearest',
                behavior: 'smooth',
                scrollMode: 'if-needed',
            });
        }
    }, [isActive, scrollIntoView, wasActive]);

    return (
        <div
            ref={ containerRef }
            data-testid={ `accordion-item-${index}` }
            className={ classNames('react-accordion-item', { active: isActive }, itemContainerClassName) }>
            <Heading
                index={ index }
                isActive={ isActive }
                icon={ icon }
                iconClassName={ iconClassName }
                toggleItemActive={ toggleItemActive }
                containerClassName={ headingContainerClassName }
                titleContainerClassName={ titleContainerClassName }
                title={ title } />
            <Content
                isActive={ isActive }
                animationDuration={ animationDuration }
                animationEasing={ animationEasing }
                onAnimationEnd={ scrollToContent }
                contentClassName={ contentClassName }
                containerClassName={ contentContainerClassName }>
                { children }
            </Content>
        </div>
    );
};

AccordionItem.propTypes = {
    animationDuration: PropTypes.number,
    animationEasing: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
    itemContainerClassName: PropTypes.string,
    contentContainerClassName: PropTypes.string,
    contentClassName: PropTypes.string,
    headingContainerClassName: PropTypes.string,
    titleContainerClassName: PropTypes.string,
    icon: PropTypes.any,
    iconClassName: PropTypes.string,
    onItemToggle: PropTypes.func,
    scrollIntoView: PropTypes.bool,
    title: PropTypes.any.isRequired,
    /* Accordion */
    index: PropTypes.number,
    isActive: PropTypes.bool,
    toggleItemActive: PropTypes.func,
};

export default AccordionItem;
