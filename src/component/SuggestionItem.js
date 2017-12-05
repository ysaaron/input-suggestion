import { useDefaultProps } from '../util'
import style from './SuggestionItem.less'

const defaultSuggestionItemProps = {
    onChoose: () => {},
    onHistoryRemove: () => {},
    onSuggestionFocusIn: () => {},
    onSuggestionFocusOut: () => {},
    suggestion: {
        name: '',
        logo: '',
        isHistory: false
    }
}

const defaultContentProps = {
    suggestion: {
        name: '',
        logo: '',
        isHistory: false
    },
    onChoose: () => {},
    onSuggestionFocusIn: () => {},
    onSuggestionFocusOut: () => {},
}

const defaultRemoveHistoryButtonProps = {
    suggestion: {
        name: '',
        logo: '',
        isHistory: false
    },
    onRemove: () => {}
}

const Content = (props = defaultContentProps) => {
    props = useDefaultProps(defaultContentProps, props)
    const onChoose = e => props.onChoose(props.suggestion)
    const onFocusIn = e => props.onSuggestionFocusIn(props.suggestion)
    const onFocusOut = e => props.onSuggestionFocusOut()

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
    const onRemove = e => props.onRemove(props.suggestion)

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