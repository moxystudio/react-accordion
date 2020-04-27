import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Heading = ({ title, index, isActive, icon, iconClassName, containerClassName, titleContainerClassName, toggleItemActive }) => {
    const handleOnClick = useCallback(() => {
        toggleItemActive(index);
    }, [index, toggleItemActive]);

    const handleKeyDown = useCallback((event) => {
        const item = event.target;
        const itemContainer = item.parentElement;
        const accordionContainer = itemContainer.parentElement;
        const nextItem = itemContainer.nextElementSibling;
        const previousItem = itemContainer.previousElementSibling;

        // Enter/Return key
        if (event.key === 'Enter') {
            toggleItemActive(index);
        }

        // End key
        if (event.key === 'End') {
            accordionContainer.lastChild.firstElementChild.focus();
        }

        // Home key
        if (event.key === 'Home') {
            accordionContainer.firstElementChild.firstElementChild.focus();
        }

        // Arrow Up key
        if (event.key === 'ArrowUp') {
            if (previousItem) {
                previousItem.firstElementChild.focus();
            }
        }

        // Arrow Down key
        if (event.key === 'ArrowDown') {
            if (nextItem) {
                nextItem.firstElementChild.focus();
            }
        }
    }, [index, toggleItemActive]);

    return (
        <div
            role="button"
            tabIndex="0"
            className={ classNames('react-accordion-item_heading', containerClassName) }
            aria-expanded={ isActive }
            aria-label={ title }
            onClick={ handleOnClick }
            onKeyDown={ handleKeyDown }>
            <div index={ index } className={ classNames('react-accordion-item_title-container', titleContainerClassName) }>
                { title }
            </div>
            <div className={ classNames('react-accordion-item_icon-container', iconClassName) }>
                { icon ? icon : <div className="react-accordion-item_icon" /> }
            </div>
        </div>
    );
};

Heading.propTypes = {
    title: PropTypes.any.isRequired,
    index: PropTypes.number,
    isActive: PropTypes.bool,
    icon: PropTypes.any,
    iconClassName: PropTypes.string,
    containerClassName: PropTypes.string,
    titleContainerClassName: PropTypes.string,
    toggleItemActive: PropTypes.func,
};

export default Heading;
