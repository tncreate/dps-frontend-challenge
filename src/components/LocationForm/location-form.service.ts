import { Observable, Subject } from 'rxjs';

import { Office } from '@/shared/model/Office';
import { FormInput } from '@/shared/model/FormInput';
import { FormInputTypeEnum } from '@/shared/model/FormInputTypeEnum';
import { IOffice } from '@/shared/model/IOffice';
import { OfficeColorEnum } from '@/shared/model/OfficeColorEnum';

interface IIndexedFormInput {
  [id: string]: FormInput
}

export class LocationFormService {
  // @ts-ignore
  private static _instance: ApiService;

  private openLocationFormSubject: Subject<Office> = new Subject<Office>();

  private closeLocationFormSubject: Subject<Office> = new Subject<Office>();

  // @ts-ignore
  private office: Office | null;

  private formInputs: IIndexedFormInput = {};

  private formOpen: boolean = false;

  private formValid: boolean = false;

  private formActiveErrors: { [id: string]: string } = {};

  private formShowErrors: boolean = false;

  /**
   * LocationFormService singleton
   */
  public static getInstance(): LocationFormService {
    if (!this._instance) {
      this._instance = new LocationFormService();
    }
    return this._instance;
  }

  /**
   * Expose observable to notify subscribers when a form is opened
   */
  public get openLocationFormObservable(): Observable<Office> {
    return this.openLocationFormSubject.asObservable();
  }

  /**
   * Expose observable to notify subscribers when a form is closed
   */
  public get closeLocationFormObservable(): Observable<Office> {
    return this.closeLocationFormSubject.asObservable();
  }

  /**
   * Is form valid - are all form inputs with valid data
   */
  public get isValid(): boolean {
    return this.formValid;
  }

  /**
   * Form inputs
   */
  public get inputs(): IIndexedFormInput {
    return this.formInputs;
  }

  /**
   * Is form opened
   */
  public get isFormOpen(): boolean {
    return this.formOpen;
  }

  /**
   * Is the user edditing or creating an Office
   */
  public get isEditing(): boolean {
    return this.isFormOpen && !!this.office;
  }

  /**
   * Force input error display when:
   * + input has invalid data
   * + user tries to submit the form
   */
  public get forceErrorDisplay(): boolean {
    return this.formShowErrors;
  }

  /**
   * Triggers form input errors
   */
  public showActiveErrors(): void {
    this.formShowErrors = true;
  }

  /**
   * Open form to add a new Office
   */
  public addLocation(): void {
    this.openForm();
  }

  /**
   * Open form to edit a given Office
   *
   * @param office to be eddited
   */
  public editLocation(office: Office): void {
    this.openForm(office);
  }

  /**
   * Update the error state for a given input id
   * + Update form valid state
   *
   * @param inputId form input id
   * @param error optional error message
   */
  public updateErrorState(inputId: string, error?: string): void {
    if (error) {
      this.formActiveErrors[inputId] = error;
    } else {
      delete this.formActiveErrors[inputId];
    }
    this.formValid = Object.keys(this.formActiveErrors).length === 0;
  }

  /**
   * Generates an IOffice object with data from the active form inputs
   *
   * @return generated IOffice object
   */
  public getLocationFormObject(): IOffice | null {
    const formExists: boolean = this.formInputs && Object.keys(this.formInputs).length > 0;
    if (formExists) {
      const body: IOffice = <IOffice> {
        name: this.formInputs.name.value,
        address: this.formInputs.address.value,
        color: <OfficeColorEnum> this.formInputs.color.value,
        contact: {
          name: this.formInputs.contactName.value,
          position: this.formInputs.contactPosition.value,
          email: this.formInputs.contactEmail.value,
          phone: this.formInputs.contactPhone.value,
        },
      };
      if (this.office && this.isEditing) {
        body.id = this.office.id;
      }
      return body;
    }
    return null;
  }

  /**
   * Close the active form
   * + Cleans all form related data
   * + Notifies subscribers
   */
  public closeForm(): void {
    this.formOpen = false;
    this.formShowErrors = false;
    this.formInputs = {};
    this.formActiveErrors = {};
    this.office = null;
    this.closeLocationFormSubject.next();
  }

  /**
   * Open a new form
   * + Creates new FormInputs instances
   * + Notifies subscribers
   *
   * @param office optional Office instance, when wdditing one
   */
  private openForm(office?: Office): void {
    this.formOpen = true;
    this.office = <Office> office;
    this.formInputs = {
      color: new FormInput('Color', office && office.color),
      name: new FormInput('Title', office && office.name),
      address: new FormInput('Enter the address', office && office.address),
      contactName: new FormInput('Full name', office && office.contactName),
      contactPosition: new FormInput('Job Position', office && office.contactPosition),
      contactEmail: new FormInput('Email address', office && office.contactEmail, 'name@example.com', FormInputTypeEnum.EMAIL),
      contactPhone: new FormInput('Phone', office && office.contactPhone, '(xxx) xxx-xxxx', FormInputTypeEnum.PHONE),
    };
    this.openLocationFormSubject.next(office);
  }
}
