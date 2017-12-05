export default function useDefaultProps(defaultProps, props) {
    let newProps = {}

    Object.keys(defaultProps)
        .forEach(key => {
            if (!props[key]) {
                newProps[key] = defaultProps[key]
            } else {
                newProps[key] = props[key]
            }
        })

    return newProps
}