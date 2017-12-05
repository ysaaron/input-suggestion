import { useDefaultProps } from '../util'
import SuggestionItem from './SuggestionItem'
import style from './SuggestionList.less'

const defaultSuggestionListProps = {
    suggestions: [],
    onSuggestionChoosed: () => {},
    onSuggestionFocusIn: () => {},
    onSuggestionFocusOut: () => {},
    onHistoryRemove: () => {}
}

export default function SuggestionList(props = defaultSuggestionListProps) {
    const {
        suggestions,
        onSuggestionChoosed,
        onSuggestionFocusIn,
        onSuggestionFocusOut,
        onHistoryRemove
    } = useDefaultProps(defaultSuggestionListProps, props)

    const ulDOM = document.createElement('ul')
    const liFg = document.createDocumentFragment()
    ulDOM.classList.add(style['list-wrapper'])
    suggestions.forEach(suggestion => {
        liFg.appendChild(
            SuggestionItem({
                suggestion,
                onChoose: onSuggestionChoosed,
                onSuggestionFocusIn,
                onSuggestionFocusOut,
                onHistoryRemove
            })
        )
    })
    ulDOM.appendChild(liFg)

    return ulDOM
}