import { LightningElement } from 'lwc';

export default class ParentLifecycleHooks extends LightningElement {
    error;
    stack;
    showChild = true;

    constructor(){
        super();
        console.log('Inside Parent Constructor');
    }

    connectedCallback(){
        console.log('Inside Parent connectedCallback');
    }

    renderedCallback(){
        console.log('Inside Parent renderedCallback');
    }

    disconnectedCallback(){
        console.log('Inside Parent disconnectedCallback');
    }
    
    errorCallback(error, stack){
        this.error = error;
        this.stack = stack;
        console.log('Inside Parent errorCallback');
    }

    handleToggleChild(){
        this.showChild = !this.showChild;
    }
}