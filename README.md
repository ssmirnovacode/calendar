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
- `vertical` boolean enabling vertical layout without arrows (false by default). Enabled for XS and S screens automatically as part of responsive design.

### Theme

Additional styles can be added by custom CSS.
Default style variables can be modified by passing an object with specific keys as in the following example (also suggesting a nice darkmode theme palette):

```js
    // nice dark mode theme settings
    const FONT_COLOR = '#E9A6A6';
    const BGC = '#1F1D36';
    const BGC_OTHER = '#3F3351';
    const ACCENT = '#864879';

    // configuration object to be passed as 'theme' prop
    const DARK_THEME = {
        color: FONT_COLOR, 
        bgc: BGC, 
        borderColor: BGC,
        hoverColor: BGC,
        hoverBg: FONT_COLOR,
        selectedColor: BGC, 
        selectedBg: ACCENT,
        betweenColor: FONT_COLOR,
        betweenBg: BGC_OTHER, 
        disabledColor: BGC,
        disabledBg: BGC,
        danger: ACCENT,
        fontFamily: '"Helvetica", sans-serif',
        fz: '16px',
        maxWidth: '800px',
        padding: '2rem',
        gap: '2rem'
    }

```
Values are to be passed as usual CSS values

## Themes

Dark mode lila:
```js
    const FONT_COLOR = '#E9A6A6';
    const BGC = '#1F1D36';
    const BGC_OTHER = '#3F3351';
    const ACCENT = '#864879';
```

Pink Pastel:
```js
    const FONT_COLOR = '#874356';
    const BGC = '#F6E7D8';
    const BGC_OTHER = '#F68989';
    const ACCENT = '#C65D7B';
```

## links
GitHub repository: (https://github.com/ssmirnovacode/mini-calendar)

