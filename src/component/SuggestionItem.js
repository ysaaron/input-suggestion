import { useDefaultProps, nop } from '../util'
import style from './SuggestionItem.less'

const defaultSuggestionProps = {
    name: '',
    logo: '',
    isHistory: false
}

const defaultRemoveHistoryButtonProps = {
    suggestion: defaultSuggestionProps,
    onRemove: nop
}

const Content = (props = defaultContentProps) => {
    props = useDefaultProps(defaultContentProps, props)
    const onChoose = e => props.onChoose(props.suggestion)
    const onFocusIn = e => {
        props.onSuggestionFocusIn({
            target: e.target.parentNode,
            suggestion: props.suggestion
        })
    }
    const onFocusOut = e => {
        props.onSuggestionFocusOut({
            target: e.target.parentNode
        })
    }

    const wrapper = document.createElement('div')
    const textDOM = document.createElement('span')
    const imgDOM = document.createElement('img')
    imgDOM.src = props.suggestion.logo
    imgDOM.classList.add(style['list-item_icon'])
    textDOM.textContent = props.suggestion.name
    textDOM.classList.add(style['list-item_text'])
    wrapper.classList.add(style['list-item_wrapper'])
    wrapper.appendChild(imgDOM)
    wrapper.appendChild(textDOM)
    wrapper.addEventListener('mouseover', onFocusIn)
    wrapper.addEventListener('mouseout', onFocusOut)
    wrapper.addEventListener('mousedown', onChoose)

    return wrapper
}

const defaultContentProps = {
    suggestion: {
        name: '',
        logo: '',
        isHistory: false
    },
    onChoose: nop,
    onSuggestionFocusIn: nop,
    onSuggestionFocusOut: nop,
}

const ContentJsx = (props = defaultContentProps) => {
    props = useDefaultProps(defaultContentProps, props)
    const onChoose = e => props.onChoose(props.suggestion)
    const onFocusIn = e => props.onSuggestionFocusIn(props.suggestion)
    const onFocusOut = e => props.onSuggestionFocusOut()

    return (
        <div
            onClick={onChoose}
            onMouseover={onFocusIn}
            onMouseout={onFocusOut}
        >
            <img
                className={style['list-item_icon']}
                src={props.suggestion.logo} 
            />
            <span className={style['list-item_text']}>{props.suggestion.name}</span>
        </div>
    )
}


const RemoveHistoryButton = (props = defaultRemoveHistoryButtonProps) => {
    props = useDefaultProps(defaultRemoveHistoryButtonProps, props)
    const onRemove = e => {
        e.stopPropagation()
        props.onRemove(props.suggestion)
    }

    const buttonDOM = document.createElement('button')
    buttonDOM.textContent = 'Remove History'
    buttonDOM.classList.add(style['remove-button'])
    buttonDOM.addEventListener('mousedown', onRemove)

    return buttonDOM
}

const SuggestionItem = (props = defaultSuggestionItemProps) => {
    props = useDefaultProps(defaultSuggestionItemProps, props)

    const liDOM = document.createElement('li')
    liDOM.classList.add(style['list-item'])
    liDOM.appendChild(Content(props))
    props.suggestion.isHistory && liDOM.appendChild(RemoveHistoryButton({
        suggestion: props.suggestion,
        onRemove: props.onHistoryRemove
    }))

    return liDOM
}

const defaultSuggestionItemProps = {
    onChoose: nop,
    onHistoryRemove: nop,
    onSuggestionFocusIn: nop,
    onSuggestionFocusOut: nop,
    suggestion: defaultSuggestionProps,
    suggestionOnFocus: undefined
}
export function SuggestionItemJsx(props = defaultSuggestionItemProps) {
    const {
        onChoose,
        onHistoryRemove,
        onSuggestionFocusIn,
        onSuggestionFocusOut,
        suggestion,
        suggestionOnFocus
    } = useDefaultProps(defaultSuggestionItemProps, props)
    const hoverClass = suggestionOnFocus === suggestion ? style['list-item_hover'] : ''
    
    return (
        <li className={`${style['list-item']} ${hoverClass}`}>
            <ContentJsx
                suggestion={suggestion}
                onChoose={onChoose}
                onSuggestionFocusIn={onSuggestionFocusIn}
                onSuggestionFocusOut={onSuggestionFocusOut}
            />
        </li>
    )
}

export default SuggestionItem