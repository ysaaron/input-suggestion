import { LineSuggestions } from '../../src'

const container = document.querySelector('#container')
const inputDOM = container.querySelector('input')
const lineSuggestions = new LineSuggestions({
    hookPoint: container,
    onSuggestionChoosed: suggestion => {}
})

const onInputChange = e => {
    lineSuggestions.showSuggestions(e.target.value)
}
const onInputBlur = e => lineSuggestions.closeRequest()
const onInputFocus = e => {
    lineSuggestions.showSuggestions(e.target.value)
}

inputDOM.addEventListener('keyup', onInputChange)
inputDOM.addEventListener('click', onInputFocus)
document.addEventListener('click', e => lineSuggestions.closeRequest())