import { LineSuggestions } from '../../src'

const ENTER_KEY = 13
const container = document.querySelector('#container')
const inputDOM = container.querySelector('input')
const lineSuggestions = new LineSuggestions({
    hookPoint: container,
    onSuggestionChoosed: suggestion => {}
})
const isEnterKey = e => (e.which === ENTER_KEY || e.keyCode === ENTER_KEY)
const handleBoradEvent = e => {
    if (isEnterKey(e)) {
        console.log(lineSuggestions.getSuggestionWithHover())
    } else {
        lineSuggestions.showSuggestions(e.target.value)
    }
}
const onInputFocus = e => lineSuggestions.showSuggestions(e.target.value)

inputDOM.addEventListener('keyup', handleBoradEvent)
inputDOM.addEventListener('click', onInputFocus)
document.addEventListener('click', e => lineSuggestions.closeRequest())