import { debounce } from '../util'

function getSuggestions() {
    return fetch('./linesuggestions')
            .then(res => res.json())
}

const getSuggestionsWithDebounce = debounce(getSuggestions)

export {
    getSuggestions,
    getSuggestionsWithDebounce 
}