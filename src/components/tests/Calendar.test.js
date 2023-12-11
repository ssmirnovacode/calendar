import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Calendar from "../Calendar";

const START_DATE = new Date(2023, 8, 21); 
const NEXT_DATE = new Date(2023, 9, 21); 
const NEXT_MONTH = 11; // first month that wouldnt apper in 2-months view until the next btn click

describe('Calendar test', () => {
   
    const currentMonth = 9; // new Date().getMonth()+1;
    const currentDay = new Date().getDate();
    const requiredProps = { startDate: START_DATE, endDate: NEXT_DATE, onChange: ({startDate: START_DATE, endDate: NEXT_DATE}) => {} }

    test('default rendering', () => {
        render(<Calendar {...requiredProps} />); // overwise test will fail once month is passed
        const calendar = screen.getByTestId('calendar');
        expect(calendar).toBeInTheDocument();
        expect(calendar).toMatchSnapshot();
        const arrows = screen.queryByTestId('arrows');
        expect(arrows).toBeNull()
        const clearBtn = screen.queryByTestId('clear-btn');
        expect(clearBtn).toBeInTheDocument();
        const months = screen.getAllByTitle('month');
        expect(months.length).toBe(2)
    })

    test('custom months number', () => {
        render(<Calendar {...requiredProps}  numberOfMonths={8} />); 
        const months = screen.getAllByTitle('month');
        expect(months.length).toBe(8)
    })

    test('locale = DE', () => {
        render(<Calendar {...requiredProps} locale="de-DE" startDate={NEXT_DATE}/>); 
        const calendar = screen.getByTestId('calendar');
        expect(calendar).toMatchSnapshot();
    })

    test('vertical render', () => {
        render(<Calendar {...requiredProps} vertical startDate={START_DATE}/>); 
        const calendar = screen.getByTestId('calendar');
        expect(calendar).toMatchSnapshot();
    })

    test('disabled past', () => {
        render(<Calendar {...requiredProps} arrows disablePast />); 
        const calendar = screen.getByTestId('calendar');
        expect(calendar).toMatchSnapshot();
        const prevArrow = screen.queryByTestId('prev');
        expect(prevArrow).toBeNull();
        const nextArrow = screen.getByTestId('next');
        expect(nextArrow).toBeInTheDocument();   //toHaveClass
        for (let i=currentDay-1; i > 0; i--) {
            const pastDayCells = screen.getAllByTestId(`day-${currentDay-i}.${currentMonth}`); // empty cells corresponding to next and prev months included
            pastDayCells.forEach(cell => {
                expect(cell).toHaveClass('blocked')
            })
        }
    });

    test('blocked weekends', () => {
        render(<Calendar {...requiredProps} weekendsBlocked startDate={START_DATE}/>); 
        const saturday = screen.getByTestId('day-9.9');
        expect(saturday).toHaveClass('blocked')
        const sunday = screen.getByTestId('day-10.9');
        expect(sunday).toHaveClass('blocked')
    })

    test('with selected dates', () => {
        render(<Calendar {...requiredProps} startDate={START_DATE} endDate ={NEXT_DATE} />); 
        const calendar = screen.getByTestId('calendar');
        expect(calendar).toMatchSnapshot();
        const from = screen.getByTestId(`day-${START_DATE.getDate()-1}.${START_DATE.getMonth()+1}`); // -1 coz Date() returns 1 day less
        const between = screen.getByTestId(`day-${START_DATE.getDate()+5}.${START_DATE.getMonth()+1}`);
        const to = screen.getByTestId(`day-${NEXT_DATE.getDate()-1}.${NEXT_DATE.getMonth()+1}`);
        expect(from).toHaveClass('selected')
        expect(to).toHaveClass('selected')
        expect(between).toHaveClass('between')
    })

    test('render without clear btn', () => {
        render(<Calendar {...requiredProps} clearDatesBtn={false} startDate={START_DATE}/>); 
        const calendar = screen.getByTestId('calendar');
        expect(calendar).toMatchSnapshot();
        const clearBtn = screen.queryByTestId('clear-btn');
        expect(clearBtn).toBeNull()
    })

    test('render arrows', () => {
        render(<Calendar {...requiredProps} arrows startDate={START_DATE} />);
        const calendar = screen.getByTestId('calendar');
        expect(calendar).toMatchSnapshot();
        const arrows = screen.getByTestId('arrows');
        expect(arrows).toBeInTheDocument();
    })

    test('next btn click', () => {
        render(<Calendar {...requiredProps} arrows startDate={NEXT_DATE} />);
        const nextArrow = screen.getByTestId('next');
        userEvent.click(nextArrow);
        const nextMonth = screen.getByTestId(`month-${NEXT_MONTH+1}`); // +1 here and after is because data-testid is using real month numbers
        expect(nextMonth).toBeInTheDocument();
        const initialMonth = screen.queryByTestId(`month-${NEXT_DATE.getMonth()+1}`);       
        expect(initialMonth).toBeNull();
    })

    test('prev btn click', () => {
        render(<Calendar {...requiredProps} arrows startDate={NEXT_DATE} />);
        const prevArrow = screen.getByTestId('prev');
        userEvent.click(prevArrow);
        const initialMonth = screen.getByTestId(`month-${NEXT_DATE.getMonth()+1}`);       
        expect(initialMonth).toBeInTheDocument();
        const prevMonth = screen.getByTestId(`month-${NEXT_DATE.getMonth()}`);
        expect(prevMonth).toBeInTheDocument();
        const initialSecondMonth = screen.queryByTestId(`month-${NEXT_DATE.getMonth()+2
        }`);       
        expect(initialSecondMonth).toBeNull();
    })

})