import React, {Component, PropTypes} from 'react'
import ReactDOM  from 'react-dom'
import { Provider, connect } from 'react-redux'
import store from 'config/store'


let Shop = connect(({shop}, {id}) => {

    return {
        ...shop[id],
        handleChange(key, value) {
            store.dispatch(`shop.${id}.${key}`, value);
        }
    }
})(function Shop({id, name, handleChange}) {
    return (
        <div>
            <h2>Shop id:{id}</h2>            
            <div>
                name: <input value={name} onChange={(e) => {
                    handleChange('name', e.target.value)
                }}/>
            </div>
        </div>
    )
})

let newAddedShopIdIndex = 0;

let Deal = connect(({deal}, {id}) => {
    return {
        ...deal[id],
        handleChange(key, value) {
            store.dispatch(`deal.${id}.${key}`, value);
        },
        addShop() {
            newAddedShopIdIndex += 1;

            let newShop = {
                id: `new-${newAddedShopIdIndex}`,
                name: `new-${newAddedShopIdIndex}`
            }

            store.dispatch(`shop.${newShop.id}`, newShop);

            store.dispatch(`deal.${id}.shops`, (shops) => {
                return shops.concat([newShop.id])
            });
        }
    }
})(function Deal({ id, name, shops, handleChange, addShop }) {
    return (
        <div style={{margin: '40px'}}>
            <h1>deal id:{id}</h1>            
            <div>
                name: <input value={name} onChange={(e) => {
                    handleChange('name', e.target.value)
                }}/>
            </div>
            <div>
                shops
                <div>
                    {
                        shops.map((id) => {
                            return <Shop id={id} key={id}  />
                        })
                    }
                </div>
                <button onClick={addShop}>create new shop</button>
            </div>
        </div>
    )
})

let Deals = connect((state) => {
    return state
})(function Deals(state) {
    let { deals } = state;
    return (
        <div>
            <div style={{display: 'inline-block', width: '40%'}}>
                {
                    deals.map((id) => {
                        return <Deal id={id} key={id} />
                    })
                }
            </div>
            <pre style={{display: 'inline-block', width: '40%'}}>
                {JSON.stringify(state, null, 4)}
            </pre>
        </div>
    )
})



ReactDOM.render(<Provider store={store}>
    <Deals />
</Provider>, document.getElementById('app'));

