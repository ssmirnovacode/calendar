import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Calendar from "../Calendar";

const START_DATE = new Date(2022, 8, 21);
const NEXT_DATE = new Date(2022, 9, 21);
const NEXT_MONTH = 11; // first month that wouldnt apper in 2-months view until the next btn click

describe('Calendar test', () => {

    test('default rendering', () => {
        render(<Calendar startDate={START_DATE}/>); // overwise test will fail once month is passed
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
        render(<Calendar numberOfMonths={8} startDate={START_DATE}/>); 
        const months = screen.getAllByTitle('month');
        expect(months.length).toBe(8)
    })

    test('locale = DE', () => {
        render(<Calendar locale="de-DE" startDate={NEXT_DATE}/>); 
        const calendar = screen.getByTestId('calendar');
        expect(calendar).toMatchSnapshot();
    })

    test('vertical render', () => {
        render(<Calendar vertical startDate={START_DATE}/>); 
        const calendar = screen.getByTestId('calendar');
        expect(calendar).toMatchSnapshot();
    })

    test('disabled past', () => {
        render(<Calendar arrows disablePast />); 
        const calendar = screen.getByTestId('calendar');
        expect(calendar).toMatchSnapshot();
        const prevArrow = screen.queryByTestId('prev');
        expect(prevArrow).toBeNull();
        const nextArrow = screen.getByTestId('next');
        expect(nextArrow).toBeInTheDocument();   //toHaveClass
        const currentMonth = new Date().getMonth()+1;
        const currentDay = new Date().getDate();
        for (let i=currentDay-1; i > 0; i--) {
            const pastDayCells = screen.getAllByTestId(`day-${currentDay-i}.${currentMonth}`); // empty cells corresponding to next and prev months included
            pastDayCells.forEach(cell => {
                expect(cell).toHaveClass('blocked')
            })
        }
        
    })

    test('render without clear btn', () => {
        render(<Calendar clearDatesBtn={false} startDate={START_DATE}/>); 
        const calendar = screen.getByTestId('calendar');
        expect(calendar).toMatchSnapshot();
        const clearBtn = screen.queryByTestId('clear-btn');
        expect(clearBtn).toBeNull()
    })

    test('render arrows', () => {
        render(<Calendar arrows startDate={START_DATE} />);
        const calendar = screen.getByTestId('calendar');
        expect(calendar).toMatchSnapshot();
        const arrows = screen.getByTestId('arrows');
        expect(arrows).toBeInTheDocument();
    })

    test('next btn click', () => {
        render(<Calendar arrows startDate={NEXT_DATE} />);
        const nextArrow = screen.getByTestId('next');
        userEvent.click(nextArrow);
        const nextMonth = screen.getByTestId(`month-${NEXT_MONTH+1}`); // +1 here and after is because data-testid is using real month numbers
        expect(nextMonth).toBeInTheDocument();
        const initialMonth = screen.queryByTestId(`month-${NEXT_DATE.getMonth()+1}`);       
        expect(initialMonth).toBeNull();
    })

    test('prev btn click', () => {
        render(<Calendar arrows startDate={NEXT_DATE} />);
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