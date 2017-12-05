import style from './LoadingItem.less'

const LoadingItem = function() {
    const liDOM = document.createElement('li')
    const spanDOM = document.createElement('span')

    liDOM.classList.add(style['list-item'])
    spanDOM.textContent = 'NOW LOADING'
    spanDOM.classList.add(style['list-item_loading'])
    liDOM.appendChild(spanDOM)
    
    return liDOM
}

export default LoadingItem