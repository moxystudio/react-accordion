import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { Accordion, AccordionItem } from '../src';

beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
    jest.clearAllMocks();
});

const renderAccordionItem = (index) => (
    <AccordionItem key={ index } title={ `title-${index}` }>
        {`content-${index}`}
    </AccordionItem>
);

const AccordionWithItems = (props) => (
    <Accordion { ...props }>
        { Array.from({ length: 5 }, (_, index) =>
            renderAccordionItem(index),
        )}
    </Accordion>
);

describe('Accordion', () => {
    it('should render correctly with 1 item', () => {
        const { getByText } = render(
            <Accordion>
                <AccordionItem title="title">
                    content
                </AccordionItem>
            </Accordion>,
        );

        expect(getByText('title')).toBeInTheDocument();
        expect(getByText('content')).toBeInTheDocument();
    });

    it('should render correctly with multiple items', () => {
        /* Random number between 2 and 10 */
        const randomNumber = Math.floor((Math.random() * 4) + 2);

        const { getByText } = render(
            <Accordion>
                { Array.from({ length: randomNumber }, (_, index) =>
                    renderAccordionItem(index),
                )}
            </Accordion>,
        );

        expect(getByText('title-0')).toBeInTheDocument();
        expect(getByText('content-0')).toBeInTheDocument();
        expect(getByText(`title-${randomNumber - 1}`)).toBeInTheDocument();
        expect(getByText(`content-${randomNumber - 1}`)).toBeInTheDocument();
    });

    it('should render className', () => {
        const { getByTestId } = render(<AccordionWithItems className="test-class" />);

        expect(getByTestId('accordion-item-0').parentElement).toHaveClass('test-class');
    });

    it('should render closedClassName', () => {
        const { getByTestId } = render(<AccordionWithItems closedClassName="closed-class" />);

        expect(getByTestId('accordion-item-0').parentElement).toHaveClass('closed-class');
    });

    it('should render closedClassName with multiple props on', () => {
        const { getByTestId } = render(<AccordionWithItems closedClassName="closed-class" multiple />);

        expect(getByTestId('accordion-item-0').parentElement).toHaveClass('closed-class');
    });

    it('should open and close an item', () => {
        const { getByTestId, getByText } = render(<AccordionWithItems />);

        fireEvent.click(getByText('title-0'));

        expect(getByTestId('accordion-item-0')).toHaveClass('active');

        fireEvent.click(getByText('title-0'));

        expect(getByTestId('accordion-item-1')).not.toHaveClass('active');
    });

    it('should open and close multiple items', () => {
        const { getByTestId, getByText } = render(<AccordionWithItems multiple />);

        fireEvent.click(getByText('title-0'));

        expect(getByTestId('accordion-item-0')).toHaveClass('active');

        fireEvent.click(getByText('title-1'));

        expect(getByTestId('accordion-item-1')).toHaveClass('active');

        fireEvent.click(getByText('title-0'));

        expect(getByTestId('accordion-item-0')).not.toHaveClass('active');
    });

    it('should have first item opened by default', () => {
        const { getByTestId } = render(<AccordionWithItems defaultActiveItems={ [0] } />);

        expect(getByTestId('accordion-item-0')).toHaveClass('active');
    });

    it('should have first item opened by default with multiple props on', () => {
        const { getByTestId } = render(<AccordionWithItems defaultActiveItems={ [0] } multiple />);

        expect(getByTestId('accordion-item-0')).toHaveClass('active');
    });

    it('should have 2 first items open by default', () => {
        const { getByTestId } = render(<AccordionWithItems defaultActiveItems={ [0, 1] } multiple />);

        expect(getByTestId('accordion-item-0')).toHaveClass('active');
        expect(getByTestId('accordion-item-1')).toHaveClass('active');
    });

    it('should call onItemToggle when opening or closing', () => {
        const spyOnItemToggle = jest.fn();

        const { getByText } = render(<AccordionWithItems onItemToggle={ spyOnItemToggle } />);

        fireEvent.click(getByText('title-0'));
        fireEvent.click(getByText('title-0'));

        expect(spyOnItemToggle).toHaveBeenCalledTimes(2);
    });

    it('should call onItemToggle when opening or closing with multiple props on', () => {
        const spyOnItemToggle = jest.fn();

        const { getByText } = render(<AccordionWithItems onItemToggle={ spyOnItemToggle } multiple />);

        fireEvent.click(getByText('title-0'));
        fireEvent.click(getByText('title-0'));

        expect(spyOnItemToggle).toHaveBeenCalledTimes(2);
    });

    it('should call onToggling when opening', () => {
        const spyOnToggling = jest.fn();

        const { getByText } = render(<AccordionWithItems onItemToggling={ spyOnToggling } />);

        fireEvent.click(getByText('title-0'));

        expect(spyOnToggling).toHaveBeenCalledTimes(1);
        expect(spyOnToggling).toHaveBeenCalledWith(0, { active: true });
    });

    it('should call onToggling when closing', () => {
        const spyOnToggling = jest.fn();

        const { getByText } = render(<AccordionWithItems onItemToggling={ spyOnToggling } defaultActiveItems={ [0] } />);

        fireEvent.click(getByText('title-0'));

        expect(spyOnToggling).toHaveBeenCalledTimes(1);
        expect(spyOnToggling).toHaveBeenCalledWith(0, { active: false });
    });

    it('should throw error when multiple props is invalid', () => {
        const spyOnConsole = jest.spyOn(console, 'error');

        render(<AccordionWithItems multiple="invalid" />);

        expect(spyOnConsole).toHaveBeenCalledTimes(1);
    });

    it('should throw error when defaultActiveItems has multiple items with multiple set to false', () => {
        const spyOnConsole = jest.spyOn(console, 'error');

        render(<AccordionWithItems defaultActiveItems={ [0, 1] } />);

        expect(spyOnConsole).toHaveBeenCalledTimes(1);
    });
});
