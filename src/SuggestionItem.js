import useDefaultProps from './useDefaultProps'
import style from './SuggestionItem.less'

const defaultSuggestionItemProps = {
    onClick: () => {},
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

    let wrapper = document.createElement('div')
    let textDOM = document.createElement('span')
    let imgDOM = document.createElement('img')
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

    let buttonDOM = document.createElement('button')
    buttonDOM.textContent = 'Remove History'
    buttonDOM.classList.add(style['remove-button'])

    return buttonDOM
}

const SuggestionItem = (props = defaultSuggestionItemProps) => {
    props = useDefaultProps(defaultSuggestionItemProps, props)

    let suggestionDOM = document.createElement('li')
    suggestionDOM.classList.add(style['list-item'])
    suggestionDOM.appendChild(Content(props))
    suggestionDOM.appendChild(RemoveHistoryButton(props))
    suggestionDOM.onclick = props.onClick

    return suggestionDOM
}

export default SuggestionItem