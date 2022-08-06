export let config: object = {
    routes: {
        get: {
            route: '',
        },
        find: {
            route: '/{key}',
        },
        create: {
            route: ''
        },
        update: {
            route: '/{key}'
        },
        patch: {
            route: '/{key}'
        },
        delete: {
            route: '/{key}'
        }
    },
    url: {
        regex: /{(\w+)}/gm,
        base: '/api/'
    }
}