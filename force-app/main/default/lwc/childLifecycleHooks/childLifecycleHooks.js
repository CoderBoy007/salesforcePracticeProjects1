import { LightningElement } from 'lwc';

export default class ChildLifecycleHooks extends LightningElement {

    error;
    stack;

    //Super constructor is always called in actual constructor
    constructor() {
        super();
        console.log('Inside Child Constructor');
    }

    connectedCallback() {
        console.log('Inside Child connectedCallback');
    }

    renderedCallback() {
        console.log('Inside Child renderedCallback');
    }

    disconnectedCallback() {
        console.log('Inside Child disconnectedCallback');
    }

    errorCallback(error, stack)
    {
        this.error = error;
        this.satck = stack;
        console.log('Inside Child errorCallback');
    }

}
