export let config: object = {
    routes: {
        get: {
            route: '',
        },
        find: {
            route: '/{key}',
        },
    },
    url: {
        regex: /{(\w+)}/gm,
        base: '/api/'
    }
}