import { LightningElement, api } from 'lwc';

export default class GitHubDetails extends LightningElement {    
    //public property to be populated from parent
    @api user;
}