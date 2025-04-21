import { Injectable } from '@angular/core';
import { signal } from '@angular/core';
import { XMLParser } from 'fast-xml-parser';
import { validate } from '../validation/schema';

@Injectable({
  providedIn: 'root'
})
export class XMLValidationService {
  private parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "",
    attributesGroupName: false,
    textNodeName: "#text",
    parseAttributeValue: false,
    parseTagValue: false         
  });

  validationResult = signal<boolean | null>(null);
  validationErrors = signal<any[]>([]);

  validateXML(xmlContent: string): boolean {
    try {
      const jsonObj = this.parser.parse(xmlContent);
      
      if (jsonObj.results?.warehousestock?.article && !Array.isArray(jsonObj.results.warehousestock.article)) {
        jsonObj.results.warehousestock.article = [jsonObj.results.warehousestock.article];
      }
      
      console.log('Parsed JSON:', JSON.stringify(jsonObj, null, 2));
      
      const isValid = validate(jsonObj);
      
      this.validationResult.set(isValid);
      
      if (!isValid && validate.errors) {
        this.validationErrors.set(validate.errors);
        console.log("Validierungsfehler:", validate.errors);
      } else {
        this.validationErrors.set([]);
      }
      
      return isValid;
    } catch (error) {
      this.validationResult.set(false);
      this.validationErrors.set([{ message: 'XML konnte nicht geparst werden' }]);
      return false;
    }
  }

  getValidationErrorMessages(): string[] {
    return this.validationErrors().map(error => {
      return `${error.instancePath} ${error.message}`;
    });
  }
}