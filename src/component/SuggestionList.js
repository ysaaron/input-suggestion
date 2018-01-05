import { useDefaultProps, nop } from '../util'
import SuggestionItem, { SuggestionItemJsx } from './SuggestionItem'
import LoadingItem from './LoadingItem'
import style from './SuggestionList.less'

const defaultSuggestionListProps = {
    isLoading: false,
    suggestions: [],
    suggestionOnFocus: undefined,
    onSuggestionChoosed: nop,
    onSuggestionFocusIn: nop,
    onSuggestionFocusOut: nop,
    onHistoryRemove: nop
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

export function SuggestionListJsx(props = defaultSuggestionListProps) {
    const {
        isLoading,
        suggestions,
        suggestionOnFocus,
        onSuggestionChoosed,
        onSuggestionFocusIn,
        onSuggestionFocusOut,
        onHistoryRemove
    } = useDefaultProps(defaultSuggestionListProps, props)
    return (
        <ul className={style['list-wrapper']}>
            {
                isLoading ?
                <li>Loading</li> :
                suggestions.map(suggestion => (
                    <SuggestionItemJsx
                        suggestion={suggestion}
                        suggestionOnFocus={suggestionOnFocus}
                        onChoose={onSuggestionChoosed}
                        onSuggestionFocusIn={onSuggestionFocusIn}
                        onSuggestionFocusOut={onSuggestionFocusOut}
                        onHistoryRemove={onHistoryRemove}
                    />
                ))
            }
        </ul>
    )
}