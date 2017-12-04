import useDefaultProps from './useDefaultProps'
import SuggestionItem from './SuggestionItem'
import style from './LineSuggestions.less'

const defaultProps = {
    hookPoint: undefined,
    onSuggestionChoosed: () => {}
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
    },
    {
        name: 'Line Me',
        logo: '../example/img/images.jpeg'
        // logo: 'https://d.line-scdn.net/stf/line-lp/family/en/b612_190.png'
    },
    {
        name: 'Line Me',
        logo: '../example/img/images.jpeg'
        // logo: 'https://d.line-scdn.net/stf/line-lp/family/en/b612_190.png'
    },
    {
        name: 'Line Me',
        logo: '../example/img/images.jpeg'
        // logo: 'https://d.line-scdn.net/stf/line-lp/family/en/b612_190.png'
    },
    {
        name: 'Line Me',
        logo: '../example/img/images.jpeg'
        // logo: 'https://d.line-scdn.net/stf/line-lp/family/en/b612_190.png'
    },
    {
        name: 'Line Me',
        logo: '../example/img/images.jpeg'
        // logo: 'https://d.line-scdn.net/stf/line-lp/family/en/b612_190.png'
    },
    {
        name: 'Line Me',
        logo: '../example/img/images.jpeg'
        // logo: 'https://d.line-scdn.net/stf/line-lp/family/en/b612_190.png'
    },
    {
        name: 'Line Me',
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
        this._props = useDefaultProps(defaultProps, props)
        if (!this._props.hookPoint) throw 'Please provide a dom!'

        this._hookPoint = this._props.hookPoint
        this._suggestions = defaultSuggestions
        this._listWrapper = undefined
        this._listContainer = undefined
        this._isOpen = false
        this._beforeMount()
        this._render()
    }

    _beforeMount() {
        this._listContainer = document.createElement('div')
        this._listWrapper = document.createElement('ul')
        this._listContainer.classList.add(style['list-container'])
        this._listContainer.appendChild(this._listWrapper)
        this._hookPoint.appendChild(this._listContainer)
    }

    _render() {
        if (!this._isOpen) {
            this._listContainer.style.display = 'none'
            return
        }
        const liFg = document.createDocumentFragment()
        const ulDOM = document.createElement('ul')
        ulDOM.classList.add(style['list-wrapper'])
        this._suggestions.forEach(suggestion => {
            liFg.appendChild(
                SuggestionItem({
                    logo: suggestion.logo,
                    name: suggestion.name,
                    onChoose: this._props.onSuggestionChoosed
                })
            )
        })
        ulDOM.appendChild(liFg)
        this._listWrapper.replaceWith(ulDOM)
        this._listContainer.style.display = ''
    }
    
    showSuggestions = (keyword = '') => {
        this._keyword = keyword
        this._isOpen = true
        this._render()
    }

    closeRequest = () => {
        this._isOpen = false
        this._render()
    }
}