import { LightningElement } from 'lwc';

export default class ForEachAndIteratorExample extends LightningElement {
    wrestlers =[
        {
            Id: 1, Name: 'John Cena', FinishingMove: 'F-U'
        },
        {
            Id: 2, Name: 'Dweyne Johnson', FinishingMove: 'Rock Bottom'
        },
        {
            Id: 3, Name: 'Tripple H', FinishingMove: 'Pedigree'
        },
        {
            Id: 4, Name: 'Shawn Micheals', FinishingMove: 'Sweet Chin Music'
        },
        {
            Id: 5, Name: 'Under Taker', FinishingMove: 'Tomb Raider'
        }
    ]
}