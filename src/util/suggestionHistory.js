export function getSuggestionHistory() {
    return JSON.parse(localStorage.getItem('$$line_suggestion_history'))
}

export function setSuggestionHistory(suggestionName) {
    let history = getSuggestionHistory()
    history = !history ? [] : history
    
    if (!history.includes(suggestionName)) {
        history.push(suggestionName)
        localStorage.setItem('$$line_suggestion_history', JSON.stringify(history))
    }
}