import { LineSuggestions } from '../../src'

const container = document.querySelector('#container')
const inputDOM = container.querySelector('input')
const lineSuggestions = new LineSuggestions({
    hookPoint: container,
    onSuggestionChoosed: suggestion => console.log(suggestion)
})
const onInputBlur = e => lineSuggestions.closeRequest()
const onInputFocus = e => lineSuggestions.showSuggestions('')
const onInputChange = e => {
    console.log(e.target.value)
}

inputDOM.addEventListener('focus', onInputFocus)
inputDOM.addEventListener('change', onInputChange)
inputDOM.addEventListener('blur', onInputBlur)