import { LightningElement } from 'lwc';

export default class ParentLifecycleHooks extends LightningElement {
    error;
    stack;

    constructor(){
        super();
        console.log('inside Parent Constructor');
    }

    connectedCallback(){
        console.log('inside Parent connectedCallback');
    }

    renderedCallback(){
        console.log('inside Parent renderedCallback');
    }

    disconnectedCallback(){
        console.log('inside Parent disconnectedCallback');
    }
    
    errorCallback(error, stack){
        this.error = error;
        this.stack = stack;
        console.log('inside Parent errorCallback');
    }
}