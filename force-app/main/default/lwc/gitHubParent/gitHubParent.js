import { LightningElement } from 'lwc';

export default class GitHubParent extends LightningElement {
    userData;
    errorMessage;

    /*For making the callout, ensure that ensure that githubapi and avatar url are added to trusted sites */ 
    //This method is triggered when the child fires the 'searchusername' event
    async performApiCall(event){
        const username = event.detail;
        //Reset our variables for a fresh search
        this.errorMessage = null;
        this.userData = null;
        //Ensure the input isn't blank
        if (!username) {
            this.errorMessage = 'Please enter a valid username.';
            return;
        }
        try {
            //Making an asynchronous callout to the external service
            const response = await fetch(`https://api.github.com/users/${username}`);    
            if (!response.ok) {
                throw new Error('User not found or API limits reached.');
            }     
            //Parse the JSON response
            const data = await response.json();    
            //Assign the data to our variable, which updates the child component automatically
            this.userData = data;     
        } catch (error) {
            //Catch and display any errors
            this.errorMessage = error.message;
        }
    }
}