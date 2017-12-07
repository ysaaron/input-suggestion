# input-suggestion

## Requirement
1. Yarn

## Run example
```shell
yarn install
yarn app
open http://localhost:3000
```

## Getting started
1. HTML structure requirement
```html
<input 
    id="txtinput"
    type="text"
/>
```

2. That's it!
```javascript
import { LineSuggestions } from 'input-suggestions'

// Create hook point
const inputEle = document.querySelector('#txtinput')
// Regist hook point and callback when suggestion is choosed
const suggestions = new LineSuggestions({
    entryPoint: inputEle,
    onSuggestionChoosed: suggestionName => {}
})
// Open suggestions whenever you want
inputEle.addEventListener('click', e => suggestions.showSuggestions())
```

## API
### Importing
```javascript
import { LineSuggestions } from 'input-sutggestions'
```

### LineSuggestions
#### Constructor
| Attribute                      | Value             | Default Value                                                      | Description                                     |
|--------------------------------|-------------------|--------------------------------------------------------------------|-------------------------------------------------|
| [Required] entryPoint          | Input DOM Element |                                                                    |                                                 |
| [Optional] hookPoint           | DOM Element       | entryPoint                                                         | Everywhere you want to show the suggestion list |
| [Optional] onSuggestionChoosed | function          | suggestion => {} <br><br> suggestion properties: name: type String | Get current focus suggestion                    |

#### Method
| Method                 | Arguments                  | Description                                                                                 |
|------------------------|----------------------------|---------------------------------------------------------------------------------------------|
| showSuggestions        | [Optional] keyword: String | Open the suggestion list with keyword to filter suggestions                                 |
| closeRequest           |                            | Close suggestion list                                                                       |
| getSuggestionWithHover |                            | Get current focus suggestion, if there is no suggestion on focus, it may return `undefined` |