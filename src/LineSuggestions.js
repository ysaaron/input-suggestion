import { useDefaultProps, transformSuggestionData, searchSuggestions, setSuggestionHistory, removeSuggestionHistory } from './util'
import { SuggestionItem, SuggestionList } from './component'
import style from './LineSuggestions.less'

const defaultProps = {
    hookPoint: undefined,
    onSuggestionChoosed: () => {}
}

const defaultSuggestions = {
    total: 15,
    items: [
        { name: 'B612', logo: '../example/img/b612.png' },
        { name: 'LOOKS', logo: '../example/img/linelooks.png' },
        { name: 'LINE MAN', logo: '../example/img/lineman.png' },
        { name: 'Emoji LINE', logo: '../example/img/emojiline.png' },
        { name: 'LINE@', logo: '../example/img/lineat.png' },
        { name: 'LINE TV', logo: '../example/img/linetools.jpg' },
        { name: 'LINE Camera', logo: '../example/img/linecamera.png' },
        { name: 'LINE Dictionary English-Indonesian', logo: '' },
        { name: 'LINE DECO', logo: '../example/img/linedeco.jpg' },
        { name: 'LINE PLAY', logo: '../example/img/lineplay.png' },
        { name: 'LINE Antivirus', logo: '../example/img/lineantivirus.jpg' },
        { name: 'LINE Tools', logo: '../example/img/linetools.jpg' },
        { name: 'LINE Dictionary English-Thai', logo: '../example/img/enth.png' },
        { name: 'LINE Dictionary Chinese-English', logo: '../example/img/cnen.png' },
        { name: 'LINE SHOP', logo: '../example/img/lineshop.png' },
    ]
}

export default class LineSuggestions {
    constructor(props = defaultProps) {
        this._props = useDefaultProps(defaultProps, props)
        if (!this._props.hookPoint) throw 'Please provide a dom!'

        this._suggestions = searchSuggestions(transformSuggestionData(defaultSuggestions.items), '')
        this._originSuggestions = this._suggestions
        this._focusSuggestion = undefined
        this._listContainer = undefined
        this._keyword = ''
        this._isOpen = false
        this._beforeMount()
        this._render()
    }

    _beforeMount = () => {
        this._listContainer = document.createElement('div')
        this._listContainer.appendChild(document.createElement('ul'))
        this._listContainer.classList.add(style['list-container'])
        this._props.hookPoint.appendChild(this._listContainer)
        this._props.hookPoint.addEventListener('click', e => e.stopPropagation())
    }

    _onSuggestionChoosed = suggestion => {
        setSuggestionHistory(suggestion.name)
        suggestion.isHistory = true
        this.showSuggestions(this._keyword)
        this._props.onSuggestionChoosed(suggestion)
    }
    
    _onSuggestionFocus = suggestion => {
        this._focusSuggestion = suggestion
    }

    _onSuggestionFocusOut = () => {
        this._focusSuggestion = undefined
    }

    _onHistoryRemove = suggestion => {
        removeSuggestionHistory(suggestion.name)
        suggestion.isHistory = false
        this.showSuggestions(this._keyword)
    }

    _render = () => {
        if (!this._isOpen) {
            this._listContainer.style.display = 'none'
            return
        }
        this._listContainer.replaceChild(SuggestionList({
            suggestions: this._suggestions,
            onSuggestionChoosed: this._onSuggestionChoosed,
            onSuggestionFocus: this._onSuggestionFocus,
            onSuggestionFocusOut: this._onSuggestionFocusOut,
            onHistoryRemove: this._onHistoryRemove
        }), this._listContainer.firstChild)
        this._listContainer.style.display = ''
    }
    
    showSuggestions = (keyword = '') => {
        this._keyword = keyword
        this._isOpen = true
        // console.log(this._suggestions)
        this._suggestions = searchSuggestions(this._suggestions, keyword)
        // console.log(this._suggestions)
        this._render()
    }

    getSuggestionWithHover = () => {
        return this._focusSuggestion
    }

    closeRequest = () => {
        this._isOpen = false
        this._render()
    }
}