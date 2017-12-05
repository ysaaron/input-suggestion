import { getSuggestionHistory } from './suggestionHistory'

export default function transformSuggestionData(suggestions) {
    const history = getSuggestionHistory()

    return suggestions.map(suggestion => {
        if (history.includes(suggestion.name)) {
            suggestion.isHistory = true
        } else {
            suggestion.isHistory = false
        }

        return suggestion
    })
}