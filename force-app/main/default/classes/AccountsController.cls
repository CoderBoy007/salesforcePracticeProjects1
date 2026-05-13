public with sharing class AccountsController {

    @AuraEnabled(cacheable=true)
    public static List<Account> getTopAccounts(){
        try {
            return [SELECT Id, Name, Industry, AnnualRevenue, (Select id, Name, Amount FROM Opportunities ORDER BY Amount DESC LIMIT 5) FROM Account ORDER BY AnnualRevenue DESC LIMIT 10];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled(cacheable=true)
    public static List<AccountResponseWrapper> getAccountWithOpportunityCount(){
        List<AccountResponseWrapper> lstAccountResponseWrapper = new List<AccountResponseWrapper>();
        for(Account acc : [SELECT Id, Name, Industry, Phone, (SELECT Id FROM Opportunities) FROM Account Where LastModifiedBy.Id=:UserInfo.getUserId() LIMIT 10]){
            AccountResponseWrapper accWrap = new AccountResponseWrapper();
            accWrap.accUrl = '/'+acc.Id;
            accWrap.accName = acc.Name;
            accWrap.numberOfOpportunities = acc.Opportunities.size();
            accWrap.accId = acc.Id;
            accWrap.phone = acc.Phone;
            accWrap.industry = acc.Industry;
            lstAccountResponseWrapper.add(accWrap);
        }
        return lstAccountResponseWrapper;
    }

    @AuraEnabled(cacheable=true)
    public static List<RelatedRecordWrapper> getRelatedRecords(List<Id> lstAccountIds){
        List<RelatedRecordWrapper> rrWrapList = new List<RelatedRecordWrapper>();
        for(Account acc:[Select Id,(select Id,AccountId, Account.Name, CaseNumber, Priority, Status from Cases), (Select Id, AccountId, Name, Account.Name, StageName From Opportunities) From Account where Id IN :lstAccountIds]){
            RelatedRecordWrapper rWrap = new RelatedRecordWrapper();
            rWrap.accountId = acc.Id;
            rWrap.caseList = acc.Cases;
            rWrap.opportunityList = acc.Opportunities;
            rrWrapList.add(rWrap);
        }
        return rrWrapList;
    }

    @AuraEnabled
    public static void deleteAccount(string accountId){
        Account acc = [Select id, (Select id from Opportunities where isClosed = false) from Account where Id=:accountId LIMIT 1];
        if(acc.Opportunities.size() > 0){
            throw new AuraHandledException('You cannot delete this account');
        }
        try{
            delete acc;
        }
        catch(Exception e){
            throw new AuraHandledException(e.getMessage());
        }
    }

     public class AccountResponseWrapper{
        @AuraEnabled
        public string accUrl;

        @AuraEnabled
        public string accName;

        @AuraEnabled
        public string accId;

        @AuraEnabled
        public string phone;

        @AuraEnabled
        public string industry;

        @AuraEnabled
        public Integer numberOfOpportunities;
    }

    public class RelatedRecordWrapper{
        @AuraEnabled
        public string accountId;
        @AuraEnabled
        public List<Case> caseList;
        @AuraEnabled
        public List<Opportunity> opportunityList;
    }
}