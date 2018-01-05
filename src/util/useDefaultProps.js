export default function useDefaultProps(defaultProps, props) {
    let newProps = { ...defaultProps }
    
    Object.keys(props)
        .forEach(key => (newProps[key] = props[key]))

    return newProps
}