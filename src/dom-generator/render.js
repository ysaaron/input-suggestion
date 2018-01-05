function isBasicType(value) {
    return typeof value === 'string' || typeof value === 'nunmber'
}

function createElement(node) {
    let el = undefined

    if (isBasicType(node)) {
        el = document.createTextNode(node)
    } else if (Array.isArray(node)) {
        el = document.createDocumentFragment()
        node.map(createElement)
            .forEach(el.appendChild.bind(el))
    } else {
        el = document.createElement(node.type)
        setProps(el, node.props)
        addEventListener(el, node.props)
        if (node.props.children) {
            node.props.children
                .map(createElement)
                .forEach(el.appendChild.bind(el))
        } 
    }

    return el
}

function addEventListener($target, props, cb) {
    Object.keys(props)
        .forEach(key => {
            if (isEventProp(key)) {
                $target.addEventListener(extractEventName(key), props[key])
            }
        })
}

function setBooleanProp($target, name, value) {
    if (value) {
      $target.setAttribute(name, value);
      $target[name] = true
    } else {
      $target[name] = false
    }
}
  
function removeBooleanProp($target, name) {
    $target.removeAttribute(name);
    $target[name] = false;
}
  
function isEventProp(name) {
    return /^on/.test(name);
}
  
function extractEventName(name) {
    return name.slice(2).toLowerCase();
}
  
function isCustomProp(name) {
    return isEventProp(name) || name === 'forceUpdate';
}
  
function setProp($target, name, value) {
    if (isCustomProp(name)) {
        return
    } else if (name === 'className') {
        $target.setAttribute('class', value)
    } else if (typeof value === 'boolean') {
        setBooleanProp($target, name, value)
    } else {
        $target.setAttribute(name, value)
    }
}
  
function removeProp($target, name, value) {
    if (isCustomProp(name)) {
        return
    } else if (name === 'className') {
        $target.removeAttribute('class')
    } else if (typeof value === 'boolean') {
        removeBooleanProp($target, name)
    } else {
        $target.removeAttribute(name);
    }
}

function setProps($target, props) {
    const { children, ...restProps } = props

    Object.keys(restProps).forEach(name =>
        setProp($target, name, restProps[name])
    )
}

function updateProp($target, name, newVal, oldVal) {
    if (!newVal) {
        removeProp($target, name, oldVal);
    } else if (!oldVal || newVal !== oldVal) {
        setProp($target, name, newVal);
    }
}

function updateProps($target, newProps, oldProps = {}) {
    let props = Object.assign({}, newProps, oldProps);
    const { children, ...rest } = props

    Object.keys(rest).forEach(name =>
        updateProp($target, name, newProps[name], oldProps[name])
    )
}

function changed(node1, node2) {
    return typeof node1 !== typeof node2 ||
        isBasicType(node1) && node1 !== node2 ||
        node1.type !== node2.type
}

export default function render($parent, newNode, oldNode, index = 0) {
    if (!oldNode) {
        $parent.appendChild(
            createElement(newNode)
        )
    } else if (!newNode) {
        $parent.removeChild(
            $parent.childNodes[index]
        )
    } else if (changed(newNode, oldNode)) {
        $parent.replaceChild(
            createElement(newNode),
            $parent.childNodes[index]
        )
    } else if (Array.isArray(newNode) && Array.isArray(oldNode)) {
        for (let i = 0; i < newNode.length || i < oldNode.length; i++) {
            render(
                $parent,
                newNode[i],
                oldNode[i],
                i
            )
        }
    } else if (newNode.type) {
        const newLength = newNode.props.children.length
        const oldLength = oldNode.props.children.length
        updateProps(
            $parent.childNodes[index],
            newNode.props,
            oldNode.props
        )
        for (let i = 0; i < newLength || i < oldLength; i++) {
            render(
                $parent.childNodes[index],
                newNode.props.children[i],
                oldNode.props.children[i],
                i
            )
        }
    }
}