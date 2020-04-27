import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import AnimateHeight from 'react-animate-height';

const Content = ({ children, isActive, animationEasing, animationDuration, containerClassName, contentClassName, onAnimationEnd }) => {
    const height = isActive ? 'auto' : 0;

    return (
        <AnimateHeight
            className={ classNames('react-accordion-item_content-container', containerClassName) }
            easing={ animationEasing }
            duration={ animationDuration }
            onAnimationEnd={ onAnimationEnd }
            height={ height }>
            <div
                className={ classNames('react-accordion-item_content', contentClassName) }
                role="region"
                tabIndex="-1">
                { typeof children === 'function' ? children({ isActive }) : children }
            </div>
        </AnimateHeight>
    );
};

Content.propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
    isActive: PropTypes.bool,
    animationEasing: PropTypes.string,
    animationDuration: PropTypes.number,
    containerClassName: PropTypes.string,
    contentClassName: PropTypes.string,
    onAnimationEnd: PropTypes.func,
};

export default Content;
