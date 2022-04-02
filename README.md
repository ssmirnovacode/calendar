# @ssmirnovacode/calendar

Light-weight simple Calendar React.js component.

- date formatting based on **locale**;
- number of months to be displayed can be easily changed;
- customizable styles;

![Calendar darkmode example](https://i.ibb.co/VBp6ccg/calendar4.png)

![Calendar view example](https://i.ibb.co/WBMg6GB/calendar1.png)

## Setup
```
npm install @ssmirnovacode/calendar
```


## Usage

```js
import { Calendar } from '@ssmirnovacode/calendar';

const App = () => {

    const [ selectedDates, setSelectedDates ] = useState({
        startDate: new Date(2022, 2, 21),
        endDate: new Date()
    });

    const THEME = {
        color: '#0f1721',
        bgc: 'white'
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
            theme={THEME}
            clearDatesBtn
            />
        </>
    )
};
```


## Properties

Following properties can be passed to Calendar component:
- `numberOfMonths` number of months to be rendered (2 by default);
- `arrows` boolean indicating if to render previous/next arrow buttons (false by default);
- `blockedDates`* array of strings: dates to be blocked, in 'YYYY-MM-DD' format;
- `startDate` and `endDate` javascript Date Objects
- `onChange` a function to be ejecuted when dates are selected
- `locale` locale string ('en-US' by default)
- `theme` an object with specific keys defining the theme for the component to override default styles
- `clearDatesBtn` boolean indicating if to render 'Clear dates' button or numberOfMonths
- `vertical` boolean enabling vertical layout without arrows (false by default). Enabled for XS and S screens automatically as part of responsive design;
- `weekendsBlocked` boolean: if true weekends will be displayed with the same styles as blocked dates and will not be clickable;



### Theme

Default style variables can be modified by passing an theme object with specific keys as in the following example (also suggesting a nice darkmode theme palette):

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
        hiddenColor: BGC_OTHER, // can be styled same as blocked and be visible 
        hiddenBg: BGC,
        blockedColor: ACCENT,
        blockedBg: BGC,
        danger: ACCENT,
        fontFamily: '"Helvetica", sans-serif',
        fz: '16px',
        maxWidth: '800px',
        padding: '2rem',
        gap: '2rem'
    }

```
Values are to be passed as usual CSS values.

Additional styles can be also added by custom CSS.

## Themes

Dark mode lila:

![Calendar dark mode example](https://i.ibb.co/k8hHpLV/calendar2.png)

```js
    const FONT_COLOR = '#E9A6A6';
    const BGC = '#1F1D36';
    const BGC_OTHER = '#3F3351';
    const ACCENT = '#864879';
```

Pink Pastel:

![Calendar pastel theme example](https://i.ibb.co/88KfbZC/calendar3.png)

```js
    const FONT_COLOR = '#874356';
    const BGC = '#F6E7D8';
    const BGC_OTHER = '#F68989';
    const ACCENT = '#C65D7B';
```

## links
GitHub repository: (https://github.com/ssmirnovacode/mini-calendar)

