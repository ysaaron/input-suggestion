# input-suggestion

## Requirement
1. Yarn

## Run example
```shell
yarn install
yarn build:example
open ./example/example.html
```

## Getting started
1. HTML structure requirement
```html
<input 
    id="hookhere"
    type="text"
/>
```

2. That's it!
```javascript
import { LineSuggestions } from 'LineSuggestions'

// Create hook point
const hookpoint = document.querySelector('#hookhere')
// Regist hook point and callback when suggestion is choosed
const suggestions = new LineSuggestions({
    hookPoint: hookpoint,
    onSuggestionChoosed: suggestionName => {}
})
// Open suggestions whenever you want
hookpoint.addEventListener('click', e => suggestions.showSuggestions())
```

## API
### Importing
```javascript
import { LineSuggestions } from 'LineSuggestions'
```

### LineSuggestions
| Attribute                      | Value       | Description |
|--------------------------------|-------------|-------------|
| [Required] hookPoint           | DOM Element |             |
| [Optional] onSuggestionChoosed | function    |             |
