import React, { cloneElement, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Accordion = ({ children, className, closedClassName, defaultActiveItems, onItemToggling, multiple, ...rest }) => {
    const [activeItems, setActiveItems] = useState(defaultActiveItems);

    const toggleItemActive = useCallback((index) => {
        const isActive = activeItems.includes(index);

        if (isActive) {
            setActiveItems(activeItems.filter((i) => i !== index));
            onItemToggling(index, { active: false });
        } else {
            setActiveItems(multiple ? [...activeItems, index] : [index]);
            onItemToggling(index, { active: true });
        }
    }, [activeItems, multiple, onItemToggling]);

    const childrenArray = Array.isArray(children) ? children : [children];

    const accordionClassName = classNames(className, {
        [closedClassName]: closedClassName && activeItems.length === 0,
    });

    return (
        <div className={ classNames('react-accordion', accordionClassName) }>
            { childrenArray.map((child, index) =>
                cloneElement(child, {
                    ...rest,
                    ...child.props,
                    key: `${child.props.title}-${index}`,
                    index,
                    toggleItemActive,
                    isActive: activeItems.includes(index),
                }),
            )}
        </div>
    );
};

Accordion.propTypes = {
    /* AccordionItem props */
    animationDuration: PropTypes.number,
    animationEasing: PropTypes.string,
    itemContainerClassName: PropTypes.string,
    headingContainerClassName: PropTypes.string,
    titleContainerClassName: PropTypes.string,
    contentContainerClassName: PropTypes.string,
    contentClassName: PropTypes.string,
    icon: PropTypes.any,
    iconClassName: PropTypes.string,
    onItemToggle: PropTypes.func,
    scrollIntoView: PropTypes.bool,
    /* Accordion */
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    closedClassName: PropTypes.string,
    onItemToggling: PropTypes.func,
    defaultActiveItems: PropTypes.arrayOf(PropTypes.number),
    multiple: (props, propName) => {
        const multiple = props[propName];

        if (typeof multiple !== 'boolean') {
            return new Error('Accordion prop "multiple" must be a boolean.');
        }

        if (!multiple && props.defaultActiveItems.length > 1) {
            return new Error('Accordion prop "multiple" is not set or set as false but "defaultActiveItems" has more than one item.');
        }
    },
};

Accordion.defaultProps = {
    multiple: false,
    scrollIntoView: false,
    defaultActiveItems: [],
    onItemToggling: () => null,
};

export default Accordion;
