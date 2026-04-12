import { LightningElement } from 'lwc';

export default class GitHubSearch extends LightningElement {
    userName;

    handleUserNameChange(event){
        this.userName = event.target.value;
    }

    handleSearch(){
        const searchEvent = new CustomEvent('searchusername', {detail: this.userName});
        this.dispatchEvent(searchEvent);
    }
}