export function getSuggestionHistory() {
    let history = JSON.parse(localStorage.getItem('$$line_suggestion_history'))
    return !history ? [] : history
}

export function setSuggestionHistory(suggestionName) {
    let history = getSuggestionHistory()
    
    if (!history.includes(suggestionName)) {
        history.push(suggestionName)
        publishHistoryChange(createNewHistory(suggestionName))
        localStorage.setItem('$$line_suggestion_history', JSON.stringify(history))
    }
}

export function removeSuggestionHistory(suggestionName) {
    let history = getSuggestionHistory()
    const idx = history.indexOf(suggestionName)

    if (idx >= 0) {
        history.splice(idx, 1)
        publishHistoryChange(createRemoveHistory(suggestionName))
        localStorage.setItem('$$line_suggestion_history', JSON.stringify(history))
    }
}

export function matchSuggestionHistory(suggestions) {
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

export const NEW_HISTORY = 'NEW_HISTORY'
function createNewHistory(suggestionName) {
    return {
        status: NEW_HISTORY,
        suggestionName
    }
}

export const REMOVE_HISTORY = 'REMOVE_HISTORY'
function createRemoveHistory(suggestionName) {
    return {
        status: REMOVE_HISTORY,
        suggestionName
    }
}

const observeHistoryChangeCb = []
export function subscribeHistoryChange(cb) {
    cb && observeHistoryChangeCb.push(cb)
}
function publishHistoryChange(payload) {
    observeHistoryChangeCb.forEach(cb => {
        cb && cb(payload)
    })
}
