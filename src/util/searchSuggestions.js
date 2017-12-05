import { getSuggestionHistory } from './suggestionHistory'

export default function searchSuggestions(suggestions, keyword) {
    return suggestions.reduce((prev, curr) => {
        if (curr.name.toLowerCase().indexOf(keyword.toLowerCase()) >= 0) {
            prev.push(curr)
        }
        return prev
    }, [])
    .sort((a, b) => {
        const compareHistory = b.isHistory - a.isHistory
        const compareName = b.name.localeCompare(a.name)

        return compareHistory || compareName
    })
}