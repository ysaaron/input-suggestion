import SuggestionItem from './SuggestionItem'

export default class LineSuggestions {
    constructor(hookPoint) {
        if (!hookPoint) throw 'Please provide an text input dom!'
        if (!hookPoint.nodeName === 'INPUT' || !hookPoint.type === 'text') throw 'Dom can only be a text input'

        this._hookPoint = hookPoint
        this.onRemoveHistory = () => {}
        this.onSuggestionChoosed = () => {}
    }

    _initialized() {

    }

    _render() {

    }

    removeHistory = e => {

    }

    suggestionChoosed = e => {

    }
}