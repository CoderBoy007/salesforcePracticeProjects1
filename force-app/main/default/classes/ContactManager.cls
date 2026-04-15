public with sharing class ContactManager {
   @AuraEnabled
   public static List<Contact> getContacts(Integer numberOfContacts){
    try {
       return [Select id, LastName, Phone from Contact LIMIT :numberOfContacts];   
    } catch (Exception e) {
        throw new AuraHandledException(e.getMessage());
    }
   }
}