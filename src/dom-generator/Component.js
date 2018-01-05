// import { useDefaultProps } from '../util'


export default class Component {
    constructor(props) {
        this.props = {}
        this.defaultProps = {}
        this.state = {}
        this._useDefaultProps(props)
    }

    _useDefaultProps = props => {
        const { defaultProps } = this
        this.props = { ...defaultProps }
        Object.keys(props)
            .forEach(key => !this.props.hasOwnProperty(key) && (this.props[key] = props[key]))
    }

    render = () => null
}