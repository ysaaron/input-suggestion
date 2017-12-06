import { LineSuggestions } from '../../src'

const ENTER_KEY = 13
const checkKey = key => {
    return e => e.which === key || e.keyCode === key
}
const isEnterKey = checkKey(ENTER_KEY)
const changeInputValue = dom => {
    return suggestionName => {
        dom.value = suggestionName || ''
    }
}
const handleKeyBoardEventWrapper = (suggestionInstance, changeInputCb) => {
    return e => {
        if (isEnterKey(e)) {
            const suggestion = suggestionInstance.getSuggestionWithHover()
            changeInputCb(suggestion.name)
        }
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
hookInput.addEventListener('keyup', handleKeyBoardEventWrapper(lineSuggestions, changeInput))
hookInput.addEventListener('click', handleInputFocusWrapper(lineSuggestions))

const hookInput1 = document.querySelector('#hookPoint1')
const changeInputOne = changeInputValue(hookInput1)
const lineSuggestions1 = new LineSuggestions({
    hookPoint: hookInput1,
    onSuggestionChoosed: suggestion => changeInputOne(suggestion.name)
})
hookInput1.addEventListener('keyup', handleKeyBoardEventWrapper(lineSuggestions1, changeInputOne))
hookInput1.addEventListener('click', handleInputFocusWrapper(lineSuggestions1))