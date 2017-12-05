import { useDefaultProps } from '../util'
import SuggestionItem from './SuggestionItem'
import style from './SuggestionList.less'

const defaultSuggestionListProps = {
    suggestions: [],
    onSuggestionChoosed: () => {}
}

export default function SuggestionList(props = defaultSuggestionListProps) {
    const {
        suggestions,
        onSuggestionChoosed
    } = useDefaultProps(defaultSuggestionListProps, props)

    const ulDOM = document.createElement('ul')
    const liFg = document.createDocumentFragment()
    ulDOM.classList.add(style['list-wrapper'])
    suggestions.forEach(suggestion => {
        liFg.appendChild(
            SuggestionItem({
                logo: suggestion.logo,
                name: suggestion.name,
                onChoose: onSuggestionChoosed
            })
        )
    })
    ulDOM.appendChild(liFg)

    return ulDOM
}