import { useDefaultProps } from '../util'
import SuggestionItem from './SuggestionItem'
import LoadingItem from './LoadingItem'
import style from './SuggestionList.less'

const defaultSuggestionListProps = {
    isLoading: false,
    suggestions: [],
    onSuggestionChoosed: () => {},
    onSuggestionFocusIn: () => {},
    onSuggestionFocusOut: () => {},
    onHistoryRemove: () => {}
}

export default function SuggestionList(props = defaultSuggestionListProps) {
    const {
        isLoading,
        suggestions,
        suggestionIndex,
        onSuggestionChoosed,
        onSuggestionFocusIn,
        onSuggestionFocusOut,
        onHistoryRemove
    } = useDefaultProps(defaultSuggestionListProps, props)

    const ulDOM = document.createElement('ul')
    ulDOM.classList.add(style['list-wrapper'])
    if (isLoading) {
        ulDOM.appendChild(LoadingItem())
    } else {
        suggestions.forEach(suggestion => {
            ulDOM.appendChild(
                SuggestionItem({
                    suggestion,
                    onChoose: onSuggestionChoosed,
                    onSuggestionFocusIn,
                    onSuggestionFocusOut,
                    onHistoryRemove
                })
            )
        })
    }

    return ulDOM
}