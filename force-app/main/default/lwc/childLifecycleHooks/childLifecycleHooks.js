import { LightningElement, api } from 'lwc';

export default class ChildLifecycleHooks extends LightningElement {

    error;
    stack;
    message;

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
        this.stack = stack;
        console.log('Inside Child errorCallback');
    }

    //method decorated with @api can be accessed from parent component
    @api childMessageHandler(strData){
        this.message = strData;
    }
}
