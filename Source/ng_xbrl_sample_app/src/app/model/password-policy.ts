export class PasswordPolicy {

    id: number;
    type: string;
    stringValue: string;
    numberValue: number;

    constructor(
        id: number, type: string, stringValue: string, numberValue: number) {
        this.id = id;
        this.type = type;
        this.stringValue = stringValue;
        this.numberValue = numberValue;
    }
    
}