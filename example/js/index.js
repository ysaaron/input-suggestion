import { LineSuggestions, Suggestions } from '../..'

// const changeInputValue = dom => {
//     return suggestionName => {
//         dom.value = suggestionName || ''
//     }
// }
const handleInputFocusWrapper = suggestionInstance => {
    return e => {
        suggestionInstance.showSuggestions(e.target.value)
    }
}

// const entry = document.querySelector('#entry')
// const changeInput = changeInputValue(entry)
// const lineSuggestions = new LineSuggestions({
//     entryPoint: entry,
//     onSuggestionChoosed: suggestion => changeInput(suggestion.name)
// })
// entry.addEventListener('click', handleInputFocusWrapper(lineSuggestions))

// const entry1 = document.querySelector('#entry1')
// const hookPoint = document.querySelector('#hook')
// const changeInputOne = changeInputValue(entry1)
// const lineSuggestions1 = new LineSuggestions({
//     entryPoint: entry1,
//     hookPoint,
//     onSuggestionChoosed: suggestion => changeInputOne(suggestion.name)
// })
// entry1.addEventListener('click', handleInputFocusWrapper(lineSuggestions1))

const test = document.querySelector("#test")
const testSuggestions = new Suggestions({
    entryPoint: test,
    hookPoint: document.querySelector('#hook2')
})
test.addEventListener('click', handleInputFocusWrapper(testSuggestions))
