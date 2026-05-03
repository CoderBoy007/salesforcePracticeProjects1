/*
You're tasked with building a highly performant Lightning Web Component for a sales manager. This component needs to display a list of their top-performing accounts and allow them to quickly view the key opportunities associated with any selected account.These accounts must be sorted in descending order by their AnnualRevenue.
You must fetch the data for both the accounts and their related opportunities in a single server-side Apex call. This is a key performance requirement.
The datatable should allow for single-row selection.
When a user selects an account in the datatable, a separate section of the component should immediately display a list of the top 5 open opportunities associated with that selected account.
These opportunities should be sorted by their Amount in descending order.
 */
import { LightningElement, wire } from 'lwc';
import getTopAccounts from '@salesforce/apex/AccountsController.getTopAccounts';

export default class TopAccountsWithOpportunities extends LightningElement {

    accountsData = [];
    opportunitiesData = [];
    errorData;
    selectedAccountName;
    selectedAccount;

    accountColumns = [
        { label: 'Name', fieldName: 'name', type:'text' },
        { label: 'Annual Revenue', fieldName: 'revenue', type: 'currency' },
        { label: 'Industry', fieldName: 'industry',type: 'text'}
    ]

    opportunitiesColumns = [
        { label: 'Name', fieldName: 'name', type:'text' },
        { label: 'Amount', fieldName: 'amount', type: 'currency' }
    ]

    @wire(getTopAccounts)
    accountsDetails({data,error}){
        if(data){
            this.accountsData = data.map(currentItem => {
                return { 
                    id :currentItem.Id,
                    name: currentItem.Name,
                    revenue : currentItem.AnnualRevenue,
                    industry :currentItem.Industry,
                    opportunities:currentItem.Opportunities || []
                }
            })
            this.errorData = null;
        }
        if(error){
            this.errorData = error;
            this.accountsData = null;
        }
    }

    get hasAccounts(){
        return this.accountsData && this.accountsData.length > 0;
    }

    get opportunities(){
        return this.opportunitiesData && this.opportunitiesData.length > 0;
    }

    handleRowSelection(event){
        const selectedRows = event.detail.selectedRows;
        this.selectedAccountName = selectedRows.length > 0 ? selectedRows[0].name : null;
        this.selectedAccount = selectedRows.length > 0 ? selectedRows[0] : null;
        const oppies = this.selectedAccount ? this.selectedAccount.opportunities : [];
        this.opportunitiesData = oppies.map(currItem => {
            return {
                name: currItem.Name,
                amount: currItem.Amount
            };
        })
    }
}