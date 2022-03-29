# @ssmirnovacode/calendar
Light-weight minimalistic Calendar component made with React.js

## Setup
```
npm install @ssmirnovacode/calendar
```

## Usage

```js
const App = () => {

    const [ selectedDates, setSelectedDates ] = useState({
        startDate: new Date(2022, 2, 21),
        endDate: new Date()
    });

    const SETTINGS = {
        color: '#0f1721',
        bgc: 'white',
        borderColor: 'white',
        hoverColor: 'white',
        hoverBg: 'grey'
    }

    return(
        <>
        <Calendar 
            numberOfMonths={2} 
            arrows={true} 
            startDate={selectedDates.startDate} 
            endDate={selectedDates.endDate} 
            onChange={setSelectedDates} 
            locale={'es-ES'}
            theme={SETTINGS}
            clearDatesBtn
            />
        </>
    )
};

export default App;
```

## Properties

Following properties can be passed to Calendar component:
- `numberOfMonths` number of months to be rendered (2 by default);
- `arrows` boolean indicating if yu want to render previous/next arrow buttons (true by default)
- `startDate` and `endDate` javascript Date Objects
- `onChange` a function to be ejecuted when dates are selected
- `locale` locale string ('en-US' by default)
- `theme` an object with specific keys defining the theme for the component to override default styles
- `clearDatesBtn` boolean indicating if to render 'Clear dates' button or numberOfMonths

### theme

Additional styles can be added by custom CSS.
Default style variables can be modified by passing an object with following keys:

```js
    {
        color: 'black',
        bgc: 'white',
        borderColor: 'white',
        hoverColor: 'white',
        hoverBg: 'grey',
        selectedColor: 'black',
        selectedBg: 'rgb(124, 184, 124)',
        betweenColor: 'black',
        betweenBg: 'rgb(205, 240, 205)',
        disabledColor:'rgb(189, 186, 186)',
        disabledBg: 'white',
        danger: 'rgb(165, 41, 41)',
        fontFamily: '"Arial", sans-serif',
        fz: '16px',
        maxWidth: '800px',
        padding: '2rem',
        gap: '2rem'
    }

```
Values are to be passed as usual CSS values

## links
GitHub repository: (https://github.com/ssmirnovacode/mini-calendar)

