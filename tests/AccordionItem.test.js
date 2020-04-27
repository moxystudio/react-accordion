import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import scrollIntoViewIfNeeded from 'smooth-scroll-into-view-if-needed';
import { Accordion, AccordionItem } from '../src';

jest.mock('smooth-scroll-into-view-if-needed');

const defaultProps = { children: <div />, title: 'foo', index: 0, scrollIntoView: true };

describe('AccordionItem', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should call toggleItemActive when the item is clicked', () => {
        const spyToggleActiveItem = jest.fn();

        const { getByText } = render(<AccordionItem toggleItemActive={ spyToggleActiveItem } { ...defaultProps } />);

        fireEvent.click(getByText(defaultProps.title));

        expect(spyToggleActiveItem).toHaveBeenCalledTimes(1);
        expect(spyToggleActiveItem).toHaveBeenCalledWith(defaultProps.index);
    });

    it('should call onItemToggle when opened', () => {
        const spyOnItemToggle = jest.fn();

        const { rerender } = render(
            <AccordionItem onItemToggle={ spyOnItemToggle } isActive={ false } { ...defaultProps }>
                Test
            </AccordionItem>,
        );

        rerender(<AccordionItem onItemToggle={ spyOnItemToggle } isActive { ...defaultProps } />);

        expect(spyOnItemToggle).toHaveBeenCalledTimes(1);
        expect(spyOnItemToggle).toHaveBeenCalledWith(defaultProps.index, { active: true });
    });

    it('should scrollIntoView', () => {
        jest.useFakeTimers();

        const { rerender } = render(
            <AccordionItem isActive={ false } { ...defaultProps }>
                Test
            </AccordionItem>,
        );

        rerender(
            <AccordionItem isActive { ...defaultProps }>
                Test
            </AccordionItem>,
        );

        jest.runAllTimers();

        expect(scrollIntoViewIfNeeded).toHaveBeenCalledTimes(1);
    });

    it('should not scrollIntoView', () => {
        jest.useFakeTimers();

        const { rerender } = render(
            <AccordionItem isActive={ false } { ...defaultProps } scrollIntoView={ false }>
                Test
            </AccordionItem>,
        );

        rerender(
            <AccordionItem isActive { ...defaultProps } scrollIntoView={ false }>
                Test
            </AccordionItem>,
        );

        jest.runAllTimers();

        expect(scrollIntoViewIfNeeded).toHaveBeenCalledTimes(0);
    });

    it('should pass to the children its state', () => {
        const { getByText } = render(
            <AccordionItem { ...defaultProps }>
                { ({ isActive }) => isActive ? 'Open' : 'Closed' }
            </AccordionItem>);

        expect(getByText('Closed')).not.toBeNull();
    });

    it('should call toggleItemActive when enter key is pressed', () => {
        const spyToggleActiveItem = jest.fn();

        const { getByText } = render(<AccordionItem toggleItemActive={ spyToggleActiveItem } { ...defaultProps } />);

        fireEvent.keyDown(getByText(defaultProps.title).parentElement, { key: 'Enter' });

        expect(spyToggleActiveItem).toHaveBeenCalledTimes(1);
    });

    it('should select the last item when the end key is pressed', () => {
        const { getByText } = render(
            <Accordion>
                <AccordionItem { ...defaultProps } />
                <AccordionItem title="bar" index={ 1 }>
                    content
                </AccordionItem>
            </Accordion>,
        );

        fireEvent.keyDown(getByText(defaultProps.title).parentElement, { key: 'End' });

        expect(getByText('bar').parentElement).toBe(document.activeElement);
    });

    it('should select the first item when the home key is pressed', () => {
        const { getByText } = render(
            <Accordion>
                <AccordionItem { ...defaultProps } />
                <AccordionItem title="bar" index={ 1 }>
                    content
                </AccordionItem>
            </Accordion>,
        );

        fireEvent.keyDown(getByText(defaultProps.title).parentElement, { key: 'Home' });

        expect(getByText(defaultProps.title).parentElement).toBe(document.activeElement);
    });

    it('should select the next item when the arrow down key is pressed', () => {
        const { getByText } = render(
            <Accordion>
                <AccordionItem { ...defaultProps } />
                <AccordionItem title="bar" index={ 1 }>
                    content
                </AccordionItem>
            </Accordion>,
        );

        fireEvent.keyDown(getByText(defaultProps.title).parentElement, { key: 'ArrowDown' });

        expect(getByText('bar').parentElement).toBe(document.activeElement);
    });

    it('should stay on the same item when there is no next item and arrow down key is pressed', () => {
        const { getByText } = render(
            <Accordion>
                <AccordionItem { ...defaultProps } />
            </Accordion>,
        );

        const item = getByText(defaultProps.title).parentElement;

        item.focus();

        fireEvent.keyDown(item, { key: 'ArrowDown' });

        expect(getByText(defaultProps.title).parentElement).toBe(document.activeElement);
    });

    it('should select the previous item when the arrow up key is pressed', () => {
        const { getByText } = render(
            <Accordion>
                <AccordionItem { ...defaultProps } />
                <AccordionItem title="bar" index={ 1 }>
                    content
                </AccordionItem>
            </Accordion>,
        );

        fireEvent.keyDown(getByText('bar').parentElement, { key: 'ArrowUp' });

        expect(getByText(defaultProps.title).parentElement).toBe(document.activeElement);
    });

    it('should stay on the same item when there is no previous item and arrow up key is pressed', () => {
        const { getByText } = render(
            <Accordion>
                <AccordionItem { ...defaultProps } />
            </Accordion>,
        );

        const item = getByText(defaultProps.title).parentElement;

        item.focus();

        fireEvent.keyDown(item, { key: 'ArrowUp' });

        expect(getByText(defaultProps.title).parentElement).toBe(document.activeElement);
    });

    it('should render iconClassName', () => {
        const { getByText } = render(
            <AccordionItem iconClassName="icon-test" { ...defaultProps } />,
        );

        expect(getByText(defaultProps.title).nextElementSibling).toHaveClass('icon-test');
    });

    it('should render custom icon', () => {
        const { getByText } = render(
            <AccordionItem icon={ <div> icon </div> } { ...defaultProps } />,
        );

        expect(getByText('icon')).toBeInTheDocument();
    });
});
