import { LightningElement } from 'lwc';

export default class ChildToParentCommParent extends LightningElement {
    message;

    constructor(){
        super();
        this.template.addEventListener('myevent', this.handleEvent.bind(this));
    }

    handleEvent(event){
        this.message = event.detail;
    }
}