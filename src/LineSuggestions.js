import useDefaultProps from './useDefaultProps'
import SuggestionItem from './SuggestionItem'
import style from './LineSuggestions.less'

const defaultProps = {
    hookPoint: undefined,
    onSuggestionChoosed: () => {},
    onRemoveHistory: () => {}
}

const defaultSuggestions = [
    {
        name: 'Line Here',
        logo: '../example/img/images.jpeg'
        // logo: 'https://d.line-scdn.net/stf/line-lp/family/en/b612_190.png'
    },
    {
        name: 'Line There',
        logo: '../example/img/images.jpeg'
        // logo: 'https://d.line-scdn.net/stf/line-lp/family/en/b612_190.png'
    },
    {
        name: 'Line Me',
        logo: '../example/img/images.jpeg'
        // logo: 'https://d.line-scdn.net/stf/line-lp/family/en/b612_190.png'
    }
]

export default class LineSuggestions {
    constructor(props = defaultProps) {
        let {
            hookPoint,
            onSuggestionChoosed,
            onRemoveHistory
        } = useDefaultProps(defaultProps, props)
        if (!hookPoint) throw 'Please provide a dom!'

        this._hookPoint = hookPoint
        this._listWrapper = undefined
        this._suggestions = defaultSuggestions
        this.onRemoveHistory = onRemoveHistory
        this.onSuggestionChoosed = onSuggestionChoosed

        this._initialized()
        this._render()
    }

    _initialized() {
        let listContainer = document.createElement('div')
        this._listWrapper = document.createElement('ul')
        listContainer.appendChild(this._listWrapper)
        this._hookPoint.appendChild(listContainer)
    }

    _sortSuggestions() {

    }

    _render() {
        const liFg = document.createDocumentFragment()
        const ulFg = document.createDocumentFragment()
        ulFg.appendChild(document.createElement('ul'))
        const ulDOM = ulFg.querySelector('ul')
        ulDOM.classList.add(style['list-wrapper'])
        this._suggestions.forEach(suggestion => {
            liFg.appendChild(
                SuggestionItem({
                    logo: suggestion.logo,
                    name: suggestion.name
                })
            )
        })
        ulDOM.appendChild(liFg)
        this._listWrapper.replaceWith(ulFg)
    }

    removeHistory = e => {

    }

    suggestionChoosed = e => {

    }
    
    showSuggestions = (keyword = '') => {
        this._keyword = keyword
        this._render()
    }
}