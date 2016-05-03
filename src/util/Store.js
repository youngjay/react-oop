import _, { without, isPlainObject } from 'lodash'

// 这个类会是一个npm包
export default class Store {
    constructor(initState) {
        this.listeners = [];
        this.state = initState || {};
    }

    getState() {
        return this.state;
    }

    setState(newState) {
        this.state = newState;
        this.emitChange();
    }

    dispatch(path, value) {
        let props = [this.state];
        let paths = path.split('.')

        paths.forEach((subPath) => {
            props.push(props[props.length - 1][subPath])
        })

        let prevValue = props.pop();
        let resolvedValue;

        if (typeof value === 'function') {
            resolvedValue = value(prevValue)
        } else {
            resolvedValue = value;
        }

        if (isPlainObject(prevValue) && isPlainObject(resolvedValue)) {
            _.defaults(resolvedValue, prevValue)
        }

        props.push(resolvedValue)

        let i = paths.length;
        while (--i >= 0) {
            props[i] = {
                ...props[i],
                [paths[i]]: props[i + 1]
            }
        }

        this.setState(props[0]);
    }

    emitChange() {
        this.listeners.slice().forEach((listener) => {
            listener();
        });
    }

    subscribe(listener) {
        this.listeners.push(listener);

        return () => {
            let index = this.listeners.indexOf(listener)
            if (index !== -1) {
                this.listeners.splice(index, 1);
            }            
        }
    }
}