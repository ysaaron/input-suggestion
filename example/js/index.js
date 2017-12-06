import { LineSuggestions } from '../..'

const changeInputValue = dom => {
    return suggestionName => {
        dom.value = suggestionName || ''
    }
}
const handleInputFocusWrapper = suggestionInstance => {
    return e => {
        suggestionInstance.showSuggestions(e.target.value)
    }
}

const hookInput = document.querySelector('#hookPoint')
const changeInput = changeInputValue(hookInput)
const lineSuggestions = new LineSuggestions({
    hookPoint: hookInput,
    onSuggestionChoosed: suggestion => changeInput(suggestion.name)
})
hookInput.addEventListener('click', handleInputFocusWrapper(lineSuggestions))

const hookInput1 = document.querySelector('#hookPoint1')
const changeInputOne = changeInputValue(hookInput1)
const lineSuggestions1 = new LineSuggestions({
    hookPoint: hookInput1,
    onSuggestionChoosed: suggestion => changeInputOne(suggestion.name)
})
hookInput1.addEventListener('click', handleInputFocusWrapper(lineSuggestions1))