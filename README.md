# @ssmirnovacode/calendar

Light-weight simple Calendar React.js component.

- date formatting based on **locale**;
- customizable and responsive layout and styles;
- number of months to be displayed can be easily changed;
- customized **captions** each date (e.g. prices, notes etc)

![Calendar darkmode example](https://i.ibb.co/ph2Bwwx/calendar-captions.png)

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
    };

    const CAPTIONS_WITH_PRICES = {
        '2022-04-04': '123 USD',
        '2022-04-06': '125 USD',
        '2022-04-07': '121 USD',
    }

    return(
        <>
        <Calendar 
            numberOfMonths={2} 
            arrows
            startDate={selectedDates.startDate} 
            endDate={selectedDates.endDate} 
            onChange={setSelectedDates} 
            locale={'es-ES'}
            theme={THEME}
            clearDatesBtn
            weekendsStyled
            captions={CAPTIONS_WITH_PRICES}
            />
        </>
    )
};
```


## Properties

Following properties can be passed to Calendar component:
- `arrows` boolean indicating if to render previous/next arrow buttons (false by default);
- `blockedDates`* array of strings: dates to be blocked, in 'YYYY-MM-DD' format;
- `captions` - object with date strings in 'YYYY-MM-DD' format as keys and caption text for each date as values;
- `clearDatesBtn` boolean indicating if to render 'Clear dates' button or numberOfMonths;
- `locale` locale string ('en-US' by default);
- `numberOfMonths` number of months to be rendered (2 by default);
- `onChange` a function to be ejecuted when dates are selected;
- `startDate` and `endDate` javascript Date Objects;
- `theme` an object with specific keys defining the theme for the component to override default styles
- `vertical` boolean enabling vertical layout without arrows (false by default). Enabled for XS and S screens automatically as part of responsive design;
- `weekendsBlocked` boolean: if true weekends will be displayed with the same styles as blocked dates and will not be clickable;
- `weekendsStyled` boolean: if true speficic styles will be applied to weekends cells (can be customized with weekendColor and weekendBgc keys of theme configuration object);


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
        betweenColor: FONT_COLOR,
        betweenBg: BGC_OTHER, 
        bgc: BGC, 
        blockedColor: ACCENT,
        blockedBg: BGC,
        borderColor: BGC,
        captionFz: '12px', // captions font-size
        cellSize: '30px',
        color: FONT_COLOR, 
        danger: ACCENT,
        fontFamily: '"Helvetica", sans-serif',
        fz: '16px', // basic font-size
        gap: '2rem', // flex gap between months
        hiddenColor: BGC_OTHER, // can be styled same as blocked and be visible 
        hiddenBg: BGC,
        hoverColor: BGC,
        hoverBg: FONT_COLOR,
        maxWidth: '800px', // max calendar block width
        padding: '2rem',
        selectedColor: BGC, 
        selectedBg: ACCENT,
        weekendColor: ACCENT,
        weekendBg: BGC
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

