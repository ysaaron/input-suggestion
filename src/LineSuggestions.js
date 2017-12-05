import { useDefaultProps } from './util'
import { SuggestionItem, SuggestionList } from './component'
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
        this._props.hookPoint.appendChild(this._listContainer)
    }

    _render() {
        if (!this._isOpen) {
            this._listContainer.style.display = 'none'
            return
        }
        this._listWrapper.replaceWith(SuggestionList({
            suggestions: this._suggestions,
            onSuggestionChoosed: this._props.onSuggestionChoosed
        }))
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