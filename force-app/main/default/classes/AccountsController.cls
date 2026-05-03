public with sharing class AccountsController {

    @AuraEnabled(cacheable=true)
    public static List<Account> getTopAccounts(){
        try {
            return [SELECT Id, Name, Industry, AnnualRevenue, (Select id, Name, Amount FROM Opportunities ORDER BY Amount DESC LIMIT 5) FROM Account ORDER BY AnnualRevenue DESC LIMIT 10];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}