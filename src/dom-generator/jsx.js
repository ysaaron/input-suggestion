export default function jsx(jsxObject) {
    if (typeof jsxObject.elementName === 'function') {
        return jsxObject.elementName({
            ...jsxObject.attributes,
            children: jsxObject.children || []
        })
    } else {
        return {
            type: jsxObject.elementName,
            props: {
                ...jsxObject.attributes,
                children: jsxObject.children || []
            }
        }
    }
}