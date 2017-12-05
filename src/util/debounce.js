export default function debounce(fn, delay = 0) {
    let timer
    let deferred

    return function debounced(...args) {
        if (deferred) {
            clearTimeout(timer)
        } else {
            deferred = defer()
        }

        timer = setTimeout(flush, delay)

        return deferred.promise
    }

    function flush() {
        const prevDeferred = deferred

        clearTimeout(timer)
        fn.apply(null, args)
        .then(
            data => prevDeferred.resolve(data),
            error => prevDeferred.reject(data)
        )

        deferred = undefined
    }
}

function defer() {
    const deferred = {}

    deferred.promise = new Promise((resolve, reject) => {
        deferred.resolve = resolve
        deferred.reject = reject
    })

    return deferred
}