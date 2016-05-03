import Store from 'util/Store'

let store = new Store({
    deals: [1,2],
    
    deal: {
        1: {
            id: 1,
            name: 'deal1',
            shops: [11, 22]
        },
        2: {
            id: 2,
            name: 'deal2',
            shops: [11, 33]
        }
    },
    
    shop: {
        11: {
            id: 11,
            name: 'shop11'
        },
        22: {
            id: 22,
            name: 'shop2'
        },
        33: {
            id: 33,
            name: 'shop3'
        }
    }
})


export default store

