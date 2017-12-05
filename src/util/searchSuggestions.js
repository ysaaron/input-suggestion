import { getSuggestionHistory } from './suggestionHistory'

export default function searchSuggestions(suggestions, keyword) {
    return suggestions.reduce((prev, curr) => {
        if (curr.name.indexOf(keyword) >= 0) {
            prev.push(curr)
        }
        return prev
    }, [])
    .sort((a, b) => b.isHistory - a.isHistory)
}