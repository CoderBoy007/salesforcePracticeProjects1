import { LightningElement, wire } from 'lwc';
// Import LMS features
import { publish, MessageContext } from 'lightning/messageService';
// Import our custom Message Channel
import PRODUCT_CHANNEL from '@salesforce/messageChannel/ProductSelected__c';

export default class ProductPublisher extends LightningElement {
    // MessageContext is required to establish the LMS connection
    @wire(MessageContext)
    messageContext;

    handleProductClick(event) {
        // Get the label of the button that was clicked
        const selectedProduct = event.target.label;
        // Create the payload (the data we want to send)
        const payload = {
            productName: selectedProduct
        };
        // Publish the message to the channel
        publish(this.messageContext, PRODUCT_CHANNEL, payload);
    }
}

