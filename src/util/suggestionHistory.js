export function getSuggestionHistory() {
    let history = JSON.parse(localStorage.getItem('$$line_suggestion_history'))
    return !history ? [] : history
}

export function setSuggestionHistory(suggestionName) {
    let history = getSuggestionHistory()
    
    if (!history.includes(suggestionName)) {
        history.push(suggestionName)
        localStorage.setItem('$$line_suggestion_history', JSON.stringify(history))
    }
}

export function removeSuggestionHistory(suggestionName) {
    let history = getSuggestionHistory()
    const idx = history.indexOf(suggestionName)

    if (idx >= 0) {
        history.splice(idx, 1)
        localStorage.setItem('$$line_suggestion_history', JSON.stringify(history))
    }
}