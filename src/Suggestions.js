import { useDefaultProps, matchSuggestionHistory, searchSuggestions, setSuggestionHistory, removeSuggestionHistory, isEnterKey, isArrowDownKey, isArrowUpKey, nop, NEW_HISTORY, subscribeHistoryChange } from './util'
import { getSuggestions } from './service/suggestionService'
import { SuggestionList, SuggestionListJsx } from './component/SuggestionList'
import render from './dom-generator/render'

import style from './LineSuggestions.less'

const defaultProps = {
    entryPoint: undefined,
    hookPoint: undefined,
    onSuggestionChoosed: nop
}
const SuggestionsJsx = props => {
    return (
        <div className={`${style['list-container']} ${props.isOpen ? '' : style['list-container_hide']}`}>
            <SuggestionListJsx
                isLoading={props.isLoading}
                suggestions={props.suggestions}
                suggestionOnFocus={props.suggestionOnFocus}
                onSuggestionChoosed={props.onSuggestionChoosed}
                onSuggestionFocusIn={props.onSuggestionFocusIn}
                onSuggestionFocusOut={props.onSuggestionFocusOut}
                onHistoryRemove={props.onHistoryRemove}
            />
            {props.children}
        </div>
    )
}

export default class Suggestions {
    constructor(props = defaultProps) {
        this._props = useDefaultProps(defaultProps, props)
        if (!this._props.entryPoint) throw 'Please provide a dom!'

        this._hookPoint = !this._props.hookPoint ? this._props.entryPoint : this._props.hookPoint
        this._suggestions = []
        this._originSuggestions = this._suggestions
        this._suggestionOnFocus = undefined
        this._keyword = ''
        this._isOpen = false
        this._isLoading = true
        this._DOMTree = undefined
        this._beforeMount()
    }

    _beforeMount = () => {
        this._props.entryPoint.addEventListener('click', e => e.stopPropagation())
        this._props.entryPoint.addEventListener('keyup', e => {
            if (isArrowUpKey(e)) {
                this._prevSuggestion()
            } else if (isArrowDownKey(e)) {
                this._nextSuggestion()
            } else if (isEnterKey(e)) {
                this._onSuggestionChoosed(this._suggestionOnFocus)
            } else {
                this.showSuggestions(e.target.value)
            }
        })
        document.addEventListener('click', this.closeRequest)
        subscribeHistoryChange(this._subscribeHistoryChange)
        getSuggestions()
            .then(suggestions => {
                this._isLoading = false
                this._suggestions = searchSuggestions(matchSuggestionHistory(suggestions.items), '')
                this._originSuggestions = this._suggestions
                this._render()
            })
    }

    _subscribeHistoryChange = payload => {
        const isHistory = payload.status === NEW_HISTORY
        const suggestion = this._originSuggestions.find(suggestion => suggestion.name === payload.suggestionName)
        suggestion && (suggestion.isHistory = isHistory)
    }

    _onSuggestionChoosed = suggestion => {
        setSuggestionHistory(suggestion.name)
        suggestion.isHistory = true
        this.closeRequest()
        this._props.onSuggestionChoosed(suggestion)
    }
    
    _onSuggestionFocusIn = suggestion => {
        this._suggestionOnFocus = suggestion
        this._render()
    }

    _onSuggestionFocusOut = () => {
        this._suggestionOnFocus = undefined
        this._render()
    }

    _onHistoryRemove = suggestion => {
        removeSuggestionHistory(suggestion.name)
        suggestion.isHistory = false
        this.showSuggestions(this._keyword)
    }

    _prevSuggestion = () => {
        if (this._suggestionOnFocus) {
            let idx = this._suggestions.indexOf(this._suggestionOnFocus)
            const isOutOfRange = (idx - 1) < 0
            this._suggestionOnFocus = isOutOfRange ? this._suggestions[this._suggestions.length - 1] : this._suggestions[--idx]
        } else if (this._suggestions.length > 0) {
            this._suggestionOnFocus = this._suggestions[this._suggestions.length - 1]
        } else {
            return
        }
        this._render()
    }

    _nextSuggestion = () => {
        if (this._suggestionOnFocus) {
            let idx = this._suggestions.indexOf(this._suggestionOnFocus)
            const isOutOfRange = (this._suggestions.length - 1) < (idx + 1)
            this._suggestionOnFocus = isOutOfRange ? this._suggestions[0] : this._suggestions[++idx]
        } else if (this._suggestions.length > 0) {
            this._suggestionOnFocus = this._suggestions[0]
        } else {
            return
        }
        this._render()
    }

    _render = () => {
        const newDOMTree = (
            <SuggestionsJsx
                isOpen={this._isOpen}
                isLoading={this._isLoading}
                suggestions={this._suggestions}
                suggestionOnFocus={this._suggestionOnFocus}
                onSuggestionChoosed={this._onSuggestionChoosed}
                onSuggestionFocusIn={this._onSuggestionFocusIn}
                onSuggestionFocusOut={this._onSuggestionFocusOut}
                onHistoryRemove={this._onHistoryRemove}
            />
        )
        render(this._hookPoint, newDOMTree, this._DOMTree)
        this._DOMTree = newDOMTree
    }

    showSuggestions = (keyword = '') => {
        this._keyword = keyword
        this._isOpen = true
        this._suggestions = searchSuggestions(this._originSuggestions, keyword)
        this._render()
        this._suggestionOnFocus = undefined
    }

    closeRequest = () => {
        this._isOpen = false
        this._render()
    }
}