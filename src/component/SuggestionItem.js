import { useDefaultProps, nop } from '../util'
import style from './SuggestionItem.less'

const defaultSuggestionProps = {
    name: '',
    logo: '',
    isHistory: false
}

const defaultSuggestionItemProps = {
    onChoose: nop,
    onHistoryRemove: nop,
    onSuggestionFocusIn: nop,
    onSuggestionFocusOut: nop,
    suggestion: defaultSuggestionProps
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

export default SuggestionItem