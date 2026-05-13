import { LightningElement, wire } from 'lwc';
import getAccountWithOpportunityCount from '@salesforce/apex/AccountsController.getAccountWithOpportunityCount';
import getRelatedRecords from '@salesforce/apex/AccountsController.getRelatedRecords';

export default class DisplayRelatedRecordsForAccount extends LightningElement {

    accColumns = [
        { label: 'Account Name', fieldName: 'accUrl', type:'url', typeAttributes:{
           label: { fieldName: 'accName' },
           target: '_blank'
            }
        },
        { label: 'Phone', fieldName: 'phone', type: 'phone'},
        { label: 'Industry', fieldName: 'industry', type: 'text'}
    ];

    caseColumns = [
        { label: 'Account Name', fieldName: 'accNameUrl', type:'url', typeAttributes:{
           label: { fieldName: 'accName' },
           target: '_blank'
            }
        },
        { label: 'Case Number', fieldName: 'caseNumberUrl', type:'url', typeAttributes:{
           label: { fieldName: 'caseNumber' },
           target: '_blank'
            }
        },
        { label: 'Priority', fieldName: 'priority', type: 'text'}
    ];
    
    oppColumns = [
        { label: 'Account Name', fieldName: 'accNameUrl', type:'url', typeAttributes:{
           label: { fieldName: 'accName' },
           target: '_blank'
            }
        },
        { label: 'Opportunity', fieldName: 'opportunityUrl', type:'url', typeAttributes:{
           label: { fieldName: 'oppName' },
           target: '_blank'
            }
        },
        { label: 'Stage', fieldName: 'stage', type: 'text'}
    ];
    
    
    cases =[];
    opportunities=[];

    @wire(getAccountWithOpportunityCount)
    accounts

    get isAccountsPresent(){
        return this.accounts.data && this.accounts.data.length > 0;
    }
    get isOpportunitiesPresent(){
        return this.opportunities && this.opportunities.length > 0;
    }
    get isCasesPresent(){
        return this.cases && this.cases.length > 0;
    }

    handleSelectedRows(event){
        const selectedRows = event.detail.selectedRows;
        // Display that fieldName of the selected rows
        console.log('selectedRows= ',selectedRows)
        let selectedIds = selectedRows.map(row => row.accId);
        console.log('selectedIds= ',JSON.stringify(selectedIds));
        this.getRelatedData(selectedIds);
    }

    async getRelatedData(selectedIds){
        const relatedData = await getRelatedRecords({lstAccountIds: selectedIds});
        console.log('relatedData= ',relatedData);

        //Process Case records
        this.cases = relatedData.reduce((acc, accountData) => {
            if(accountData.caseList && accountData.caseList.length>0){
               let processedData = accountData.caseList.map(caseRecord =>({
                    accNameUrl: '/'+caseRecord.AccountId,
                    caseNumberUrl : '/'+caseRecord.Id,
                    accName: caseRecord.Account.Name,
                    caseNumber: caseRecord.CaseNumber,
                    caseId: caseRecord.Id,
                    priority: caseRecord.Priority
                }))
                acc.push(...processedData);
            }
            return acc;
        },[])

        //Process Opportunity records
        this.opportunities = relatedData.reduce((acc, accountData) =>{
            if(accountData.opportunityList && accountData.opportunityList.length>0){
                let processedOpp = accountData.opportunityList.map(oppRecord => ({
                    accNameUrl: '/'+oppRecord.AccountId,
                    opportunityUrl : '/'+oppRecord.Id,
                    accName: oppRecord.Account.Name,
                    oppName: oppRecord.Name,
                    oppId: oppRecord.Id,
                    stage: oppRecord.StageName
                }))
                acc.push(...processedOpp);
            }
            return acc;
        },[])
    }
}