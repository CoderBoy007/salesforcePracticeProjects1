import { LightningElement } from 'lwc';

export default class SampleAreaCalculator extends LightningElement {
    squareSide;
    rectangleLength;
    rectangleWidth;
    rhombusFirstSide;
    rhombusSecondSide;
    calculatedOutput;

    handleSideSquareChange(event){
        this.squareSide = event.target.value;
    }

    handleRectangleLengthChange(event){
        this.rectangleLength = event.target.value;
    }

    handleRectangleWidthChange(event){
        this.rectangleWidth = event.target.value
    }

    handleRhombusFirstSideChange(event){
        this.rhombusFirstSide = event.target.value;
    }

    handleRhombusSecondSideChange(event){
        this.rhombusSecondSide = event.target.value;
    }

    handleSquareArea(){
        const s = parseFloat(this.squareSide);
        this.calculatedOutput = 'Area of square: '+(s*s);
    }

    handleRectangleArea(){
        const l = parseFloat(this.rectangleLength);
        const w = parseFloat(this.rectangleWidth);
        this.calculatedOutput = 'Area of rectangle: '+(l*w);
    }

    handleRhombusArea(){
        const d1 = parseFloat(this.rhombusFirstSide);
        const d2 = parseFloat(this.rhombusSecondSide);
        this.calculatedOutput = 'Area of rhombus: '+(d1*d2)/2;
    }
}