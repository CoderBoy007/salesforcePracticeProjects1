import { LightningElement, wire } from 'lwc';
import deleteAccount from '@salesforce/apex/AccountsController.deleteAccount';
import getAccountWithOpportunityCount from '@salesforce/apex/AccountsController.getAccountWithOpportunityCount';
import { encodeDefaultFieldValues } from "lightning/pageReferenceUtils";
import { NavigationMixin } from "lightning/navigation";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { refreshApex } from "@salesforce/apex";

export default class ShowAccWithOppCount extends NavigationMixin(LightningElement) {

    columns = [
    { label: 'Account Name', fieldName: 'accUrl', type: 'url',
         typeAttributes: {label: { fieldName: 'accName' }, target: '_blank'} },
    { label: 'Industry', fieldName: 'industry', type: 'text' },
    { label: 'Phone', fieldName: 'phone', type: 'phone' },
    { label: 'Total Opportunities', fieldName: 'numberOfOpportunities', type: 'number', cellAttributes: {
        alignment: 'left' // Change from 'right' to 'left'
    } },
    {
        type:'button',
         typeAttributes: {
             label: 'Create Contact', name: 'createContact', variant:'brand'
             }
    },
    {
        type:'button',
         typeAttributes: {
             label: 'Delete Account', name: 'deleteAccount', variant:'destructive'
             }
    }
];

    @wire(getAccountWithOpportunityCount)
    accounts

    get ifAccountsPresent(){
        return this.accounts && this.accounts.data && this.accounts.data.length > 0;
    }

    handleRowAction(event) {
            const action = event.detail.action;
            const row = event.detail.row;
            switch (action.name) {
                case 'createContact':
                    this.handleCreateContact(row.accId)
                    break;
                case 'deleteAccount':
                    this.handleDeleteAccount(row.accId)
                    break;
        }
    }

    handleCreateContact(accountId){
        const defaultValues = encodeDefaultFieldValues({
            AccountId: accountId
        });
        let pageReference = {
            type: "standard__objectPage",
            attributes: {
                objectApiName: "Contact",
                actionName: "new",
            },
            state: {
                defaultFieldValues: defaultValues,
            },
        };
        this[NavigationMixin.Navigate](pageReference);
    }

    async handleDeleteAccount(accountId){
        try{
            await deleteAccount({
                accountId: accountId
            });
            await refreshApex(this.accounts);
            this.showToast('Success', 'Account Deleted Successfully', 'success');
        }
        catch(error){
            this.showToast('Error', error.body.message, 'error');
        }    
    }

    showToast(title, message, variant){
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant
        });
        this.dispatchEvent(event);
    }
}