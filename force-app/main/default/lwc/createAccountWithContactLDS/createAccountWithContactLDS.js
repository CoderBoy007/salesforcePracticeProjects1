import { LightningElement, wire } from 'lwc';
import { getObjectInfo, getPicklistValues } from "lightning/uiObjectInfoApi";
import ACCOUNT_OBJECT from "@salesforce/schema/Account";
import INDUSTRY_FIELD from "@salesforce/schema/Account.Industry";
import NAME_FIELD from "@salesforce/schema/Account.Name";
import { createRecord } from "lightning/uiRecordApi";


export default class CreateAccountWithContactLDS extends LightningElement {
    accountName;
    industry;
    lastName;
    industryOptions = [];
    accountRecordTypeId;
    error;

    @wire(getObjectInfo, { objectApiName: ACCOUNT_OBJECT })
    results({ error, data }) {
        if (data) {
            this.accountRecordTypeId = data.defaultRecordTypeId;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.accountRecordTypeId = undefined;
        }
    }

    @wire(getPicklistValues, { recordTypeId: "$accountRecordTypeId", fieldApiName: INDUSTRY_FIELD})
    picklistResults({ error, data }) {
        if (data) {
            this.industryOptions = data.values;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.industryOptions = undefined;
        }
    }

    handleInputChange(event){
        const field = event.target.name;
        const value = event.target.value;
        this[field] = value;
    }

    handleSave(event){
        let isValid = this.validateUserInput();
        if(isValid){
            this.handleCreate();
        }
    }

    async handleCreate() {
    const fields = {};
    // Map the user input to the fields
    fields[NAME_FIELD.fieldApiName] = this.accountName;
    fields[INDUSTRY_FIELD.fieldApiName] = this.industry;

    // Configure your recordInput object with the object and field API names
    const recordInput = { apiName: ACCOUNT_OBJECT.objectApiName, fields };

    try {
      // Invoke createRecord
      const account = await createRecord(recordInput);
      console.log('account= ',account);
    } catch (error) {
      // Handle error
      console.log('error= ',error);
    }
  }

    validateUserInput(){
        let elements = this.template.querySelectorAll("lightning-input");
        let isValid = true;
        elements.forEach((currentItem) => {
            if(!currentItem.checkValidity()){
                isValid = false;
                currentItem.reportValidity();
            }
        });
        return isValid;
    }
}