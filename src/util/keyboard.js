const ENTER_KEY = 13
const ARROW_UP = 38
const ARROW_DOWN = 40
const checkKey = key => {
    return e => e.which === key || e.keyCode === key
}
const isEnterKey = checkKey(ENTER_KEY)
const isArrowDownKey = checkKey(ARROW_DOWN)
const isArrowUpKey = checkKey(ARROW_UP)

export {
    isEnterKey,
    isArrowDownKey,
    isArrowUpKey
}