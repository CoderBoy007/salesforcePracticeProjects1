import { LightningElement } from 'lwc';

export default class ChildToParentCommChild extends LightningElement {

    handleMessageChange(event){
        var input = event.target.value;
        const eventDetail = new CustomEvent('myevent',{detail:input, bubbles:true});
        this.dispatchEvent(eventDetail);
    }
}