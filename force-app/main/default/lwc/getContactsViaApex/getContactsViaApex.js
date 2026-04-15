import { LightningElement, wire } from 'lwc';
import getContacts from '@salesforce/apex/ContactManager.getContacts';

export default class GetContactsViaApex extends LightningElement {
    contacts;
    numberOfContacts;

    get contactsReceived(){
        if(this.contacts){
            return true;
        }
        return false;
    }

    numberOfContactHandler(event){
        this.numberOfContacts = event.target.value;
    }

    getContactsHandler(){
        getContacts({numberOfContacts: this.numberOfContacts}).then(response => {
            this.contacts = response;
        })
        .catch(error =>{
            console.error('Error occurred while retriving contacts.  ',error);
        })
    }


}