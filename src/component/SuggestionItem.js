import { useDefaultProps } from '../util'
import style from './SuggestionItem.less'

const defaultSuggestionItemProps = {
    onChoose: () => {},
    onRemove: () => {},
    logo: '',
    name: '',
    isHistory: false
}

const defaultContentProps = {
    logo: '',
    name: ''
}

const defaultRemoveHistoryButtonProps = {
    isHistory: false,
    onHistoryRemove: () => {}
}

const Content = (props = defaultContentProps) => {
    props = useDefaultProps(defaultContentProps, props)

    const wrapper = document.createElement('div')
    const textDOM = document.createElement('span')
    const imgDOM = document.createElement('img')
    imgDOM.src = props.logo
    imgDOM.classList.add(style['list-item_icon'])
    textDOM.textContent = props.name
    textDOM.classList.add(style['list-item_text'])
    wrapper.appendChild(imgDOM)
    wrapper.appendChild(textDOM)

    return wrapper
}

const RemoveHistoryButton = (props = defaultRemoveHistoryButtonProps) => {
    props = useDefaultProps(defaultRemoveHistoryButtonProps, props)

    const buttonDOM = document.createElement('button')
    buttonDOM.textContent = 'Remove History'
    buttonDOM.classList.add(style['remove-button'])

    return buttonDOM
}

const SuggestionItem = (props = defaultSuggestionItemProps) => {
    props = useDefaultProps(defaultSuggestionItemProps, props)
    const onChoose = e => {
        props.onChoose({
            name: props.name
        })
    }

    const suggestionDOM = document.createElement('li')
    suggestionDOM.classList.add(style['list-item'])
    suggestionDOM.appendChild(Content(props))
    props.isHistory && suggestionDOM.appendChild(RemoveHistoryButton(props))
    suggestionDOM.addEventListener('mousedown', onChoose)

    return suggestionDOM
}

export default SuggestionItem