import { useDefaultProps, matchSuggestionHistory, searchSuggestions, setSuggestionHistory, removeSuggestionHistory, isEnterKey, isArrowDownKey, isArrowUpKey, nop, NEW_HISTORY, subscribeHistoryChange } from './util'
import { SuggestionItem, SuggestionList } from './component'
import { getSuggestions } from './service/suggestionService'
import style from './LineSuggestions.less'

const defaultProps = {
    entryPoint: undefined,
    hookPoint: undefined,
    onSuggestionChoosed: nop
}
const getFirstListItemInContainer = ele => {
    return ele.firstChild.firstChild
}
const hasNextListItem = ele => {
    return ele && ele.nextSibling
}
const hasPrevListItem = ele => {
    return ele && ele.previousElementSibling
}
const MOUSEOVER_EVENT = new Event('mouseover')

export default class LineSuggestions {
    constructor(props = defaultProps) {
        this._props = useDefaultProps(defaultProps, props)
        if (!this._props.entryPoint) throw 'Please provide a dom!'

        this._hookPoint = !this._props.hookPoint ? this._props.entryPoint : this._props.hookPoint
        this._suggestions = []
        this._originSuggestions = this._suggestions
        this._focusSuggestion = undefined
        this._listContainer = undefined
        this._keyword = ''
        this._isOpen = false
        this._isLoading = true
        this._activeSuggestionEle = undefined
        this._beforeMount()
    }

    _beforeMount = () => {
        this._listContainer = document.createElement('div')
        this._listContainer.appendChild(document.createElement('ul'))
        this._listContainer.classList.add(style['list-container'])
        this._hookPoint.after(this._listContainer)
        this._props.entryPoint.addEventListener('click', e => e.stopPropagation())
        this._props.entryPoint.addEventListener('keyup', e => {
            if (isArrowUpKey(e)) {
                this._prevSuggestion()
            } else if (isArrowDownKey(e)) {
                this._nextSuggestion()
            } else if (isEnterKey(e)) {
                this._onSuggestionChoosed(this._focusSuggestion)
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
    
    _onSuggestionFocusIn = ({target, suggestion}) => {
        if (this._activeSuggestionEle) {
            this._activeSuggestionEle.classList.remove(style['list-item_hover'])
        }
        this._activeSuggestionEle = target
        this._activeSuggestionEle.classList.add(style['list-item_hover'])
        this._focusSuggestion = suggestion
    }

    _onSuggestionFocusOut = ({target}) => {
        target.classList.remove(style['list-item_hover'])
        this._focusSuggestion = undefined
    }

    _onHistoryRemove = suggestion => {
        removeSuggestionHistory(suggestion.name)
        suggestion.isHistory = false
        this.showSuggestions(this._keyword)
    }

    _nextSuggestion = () => {
        if (hasNextListItem(this._activeSuggestionEle)) {
            this._activeSuggestionEle.classList.remove(style['list-item_hover'])
            this._activeSuggestionEle = this._activeSuggestionEle.nextSibling
            this._activeSuggestionEle.firstChild.dispatchEvent(MOUSEOVER_EVENT)
            this._activeSuggestionEle.classList.add(style['list-item_hover'])
        } else if (!this._activeSuggestionEle) {
            this._activeSuggestionEle = getFirstListItemInContainer(this._listContainer)
            this._activeSuggestionEle.firstChild.dispatchEvent(MOUSEOVER_EVENT)
            this._activeSuggestionEle.classList.add(style['list-item_hover'])
        }
    }

    _prevSuggestion = () => {
        if (hasPrevListItem(this._activeSuggestionEle)) {
            this._activeSuggestionEle.classList.remove(style['list-item_hover'])
            this._activeSuggestionEle = this._activeSuggestionEle.previousElementSibling
            this._activeSuggestionEle.firstChild.dispatchEvent(MOUSEOVER_EVENT)
            this._activeSuggestionEle.classList.add(style['list-item_hover'])
        }
    }

    _render = () => {
        if (!this._isOpen) {
            this._listContainer.style.display = 'none'
            return
        }
        this._listContainer.replaceChild(SuggestionList({
            isLoading: this._isLoading,
            suggestions: this._suggestions,
            onSuggestionChoosed: this._onSuggestionChoosed,
            onSuggestionFocusIn: this._onSuggestionFocusIn,
            onSuggestionFocusOut: this._onSuggestionFocusOut,
            onHistoryRemove: this._onHistoryRemove
        }), this._listContainer.firstChild)
        this._listContainer.style.display = ''
    }
    
    showSuggestions = (keyword = '') => {
        this._keyword = keyword
        this._isOpen = true
        this._suggestions = searchSuggestions(this._originSuggestions, keyword)
        this._render()
        this._activeSuggestionEle = undefined
    }

    getSuggestionWithHover = () => {
        this.closeRequest()
        return !this._focusSuggestion ? undefined : { name: this._focusSuggestion.name }
    }

    closeRequest = () => {
        this._isOpen = false
        this._render()
    }
}