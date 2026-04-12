import { LightningElement, wire } from 'lwc';
// Import LMS features (subscribe instead of publish)
import { subscribe, MessageContext, APPLICATION_SCOPE } from 'lightning/messageService';
import PRODUCT_CHANNEL from '@salesforce/messageChannel/ProductSelected__c';

export default class ProductSubscriber extends LightningElement {
    receivedProduct = '';
    subscription = null;

    @wire(MessageContext)
    messageContext;

    // connectedCallback runs automatically when the component is inserted into the screen
    connectedCallback() {
        this.subscribeToMessageChannel();
    }

    subscribeToMessageChannel() {
        // Prevent duplicate subscriptions
        if (!this.subscription) {
            this.subscription = subscribe(
                this.messageContext,
                PRODUCT_CHANNEL,
                (message) => this.handleMessage(message),
                { scope: APPLICATION_SCOPE } // Ensures it hears messages from anywhere on the app
            );
        }
    }

    // Function to run whenever a message is received
    handleMessage(message) {
        this.receivedProduct = message.productName;
    }
}