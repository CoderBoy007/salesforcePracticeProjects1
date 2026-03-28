import { LightningElement } from 'lwc';

export default class ChildLifecycleHooks extends LightningElement {

    error;
    stack;

    constructor() {
        super();
        console.log('inside Child Constructor');
    }

    connectedCallback() {
        console.log('inside Child connectedCallback');
    }

    renderedCallback() {
        console.log('inside Child renderedCallback');
    }

    disconnectedCallback() {
        console.log('inside Child disconnectedCallback');
    }

    errorCallback(error, stack)
    {
        this.error = error;
        this.satck = stack;
        console.log('inside Child errorCallback');
    }

}