import { Component, Vue } from 'vue-property-decorator';

import { LocationFormService } from '@/components/LocationForm/location-form.service';
import { NotificationService } from '@/components/Notification/notification.service';
import { FormInput } from '@/shared/model/FormInput';
import { IOffice } from '@/shared/model/IOffice';
import { Office } from '@/shared/model/Office';

import IconComponent from '@/components/Icon/icon.component.vue';
import TextInputComponent from '@/components/LocationForm/TextInput/text-input.component.vue';
import ColorInputComponent from '@/components/LocationForm/ColorInput/color-input.component.vue';

const enum OperationEnum {
  ADD = 'add',
  UPDATE = 'update',
}

@Component({
  components: {
    IconComponent,
    TextInputComponent,
    ColorInputComponent,
  },
})
export default class LocationFormComponent extends Vue {
  public idEditing: boolean = false;

  // @ts-ignore
  private locationFormService: LocationFormService = LocationFormService.getInstance();

  /**
   * Different form title depending on the isEditing status (Edit/New Location)
   */
  public get formTitle(): string {
    return `${this.isEditing ? 'Edit' : 'New'} Location`;
  }

  /**
   * The form inputs related with color change
   */
  public get colorInput(): FormInput {
    const formInputs = this.locationFormService.inputs;
    return formInputs.color;
  }

  /**
   * The form inputs related with office data
   */
  public get officeInputs(): FormInput[] {
    const formInputs = this.locationFormService.inputs;
    return [
      formInputs.name,
      formInputs.address,
    ];
  }

  /**
   * The form inputs related with contact data
   */
  public get contactInputs(): FormInput[] {
    const formInputs = this.locationFormService.inputs;
    return [
      formInputs.contactName,
      formInputs.contactPosition,
      formInputs.contactEmail,
      formInputs.contactPhone,
    ];
  }

  /**
   * Is form valid
   * + To enable/disable Save button
   */
  public get isValid(): boolean {
    return this.locationFormService.isValid;
  }

  /**
   * Is form opened
   */
  public get isFormOpen(): boolean {
    return this.locationFormService.isFormOpen;
  }

  /**
   * Is the user edditing or creating an Office
   */
  public get isEditing(): boolean {
    return this.locationFormService.isEditing;
  }

  /**
   * Open / Close the form
   */
  public toggleForm(): void {
    if (this.isFormOpen) {
      this.closeForm();
    } else {
      this.openForm();
    }
  }

  /**
   * Open the form to add a new location
   */
  public openForm(): void {
    this.locationFormService.addLocation();
  }

  /**
   * Close the form
   */
  public closeForm(): void {
    this.locationFormService.closeForm();
  }

  /**
   * When user clicks on the Save button
   * + Triggers add/update operation is form is valid
   * + Triggers all input errors to be shown
   */
  public submitForm(): void {
    if (this.isValid) {
      this.dispatchOperation(<IOffice> this.locationFormService.getLocationFormObject());
    } else {
      this.locationFormService.showActiveErrors();
    }
  }

  /**
   * Triggers add/update operation depending on the isEditing status
   *
   * @param body IOffice object
   */
  private dispatchOperation(body: IOffice): void {
    const opetation: string = this.isEditing ? OperationEnum.UPDATE : OperationEnum.ADD;
    this.$store.dispatch(`offices/${opetation}`, body).then(this.notify);
  }

  /**
   * Notifies the user by showing a message through NotificationComponent
   * + Triggered when ADD/UPDATE responds
   *
   * @param office Office instance - has value if ADD/UPDATE operation was successful
   */
  private notify(office?: Office): void {
    if (office) {
      const message: string = `The location has been ${this.isEditing ? 'updated' : 'added'}`;
      NotificationService.getInstance().showSuccess(message);
      this.closeForm();
    } else {
      NotificationService.getInstance().showError();
    }
  }
}
