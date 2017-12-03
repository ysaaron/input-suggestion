export default class LineSuggestions {
    constructor(hookPoint) {
        if (!hookPoint) throw 'Please provide an text input dom!'
        if (!hookPoint.nodeName === 'INPUT' || !hookPoint.type === 'text') throw 'Dom can only be a text input'

        this.hookPoint = hookDom
    }
}