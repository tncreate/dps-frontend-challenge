import { Component, Vue, Prop } from 'vue-property-decorator';
import { Subscription } from 'rxjs';

import { Office } from '@/shared/model/Office';
import { LocationFormService } from '@/components/LocationForm/location-form.service';
import { NotificationService } from '@/components/Notification/notification.service';

import IconComponent from '@/components/Icon/icon.component.vue';

@Component({
  components: {
    IconComponent,
  },
})
export default class OfficeItemComponent extends Vue {
  // @ts-ignore
  @Prop() public office: Office;

  public isVisible: boolean = true;

  public showDetails: boolean = false;

  // @ts-ignore
  private locationFormService: LocationFormService = LocationFormService.getInstance();

  // @ts-ignore
  private openFormSubscription: Subscription;

  // @ts-ignore
  private closeFormSubscription: Subscription;

  /**
   * Subscribe form open/close events
   */
  public mounted(): void {
    this.openFormSubscription = this.locationFormService.openLocationFormObservable.subscribe(this.handleFormOpen);
    this.closeFormSubscription = this.locationFormService.closeLocationFormObservable.subscribe(this.handleFormClose);
  }

  /**
   * Unsubscribe form open/close events
   */
  public beforeDestroy(): void {
    this.openFormSubscription.unsubscribe();
    this.closeFormSubscription.unsubscribe();
  }

  /**
   * Open / Close the Office details
   * + Any open forms should be closed
   * + Scroll to the top of the item if form is open
   */
  public toggleOfficeDetails(): void {
    this.showDetails = !this.showDetails;
    if (this.showDetails && this.locationFormService.isFormOpen) {
      this.scrollToItem();
    }
    this.locationFormService.closeForm();
  }

  /**
   * Start edditing the office information
   * + Opens form at the top and hides office item
   */
  public editOffice(): void {
    this.hideDetails();
    this.isVisible = false;
    this.locationFormService.editLocation(this.office);
  }

  /**
   * Triggers action to delete office
   * + NOTE: no confirmation from the user is required
   */
  public deleteOffice(): void {
    this.$store.dispatch('offices/delete', this.office.id).then(this.notifyDelete);
  }

  /**
   * Hide office details
   */
  private hideDetails(): void {
    this.showDetails = false;
  }

  /**
   * Handle event emited when a form is opened
   * + Office details should close automatically
   */
  private handleFormOpen(): void {
    this.hideDetails();
  }

  /**
   * Handle event emited when a form is closed
   * + If office item was hidden, it should become visible
   */
  private handleFormClose(): void {
    this.isVisible = true;
  }

  /**
   * Notifies the user by showing a message through NotificationComponent
   * + Triggered when DELETE responds
   *
   * @param officeId has value if DELETE operation was successful
   */
  private notifyDelete(officeId?: string): void {
    if (officeId) {
      NotificationService.getInstance().showSuccess('The location has been deleted');
      this.hideDetails();
    } else {
      NotificationService.getInstance().showError(`Could not delete ${this.office.name}`);
    }
  }

  /**
   * Scroll to show the item
   * + Prevent closing of the form
   */
  private scrollToItem(): void {
    const appTitleElement: HTMLElement = <HTMLElement> this.$refs.OfficeItem;
    const top: number = appTitleElement && appTitleElement.offsetTop;
    window.scrollTo(0, top || 0);
  }
}
