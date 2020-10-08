import { Component, Vue } from 'vue-property-decorator';

import { Office } from '@/shared/model/Office';
import { LocationFormService } from '@/components/LocationForm/location-form.service';

import OfficeItemComponent from '@/components/OfficeItem/office-item.component.vue';
import LocationFormComponent from '@/components/LocationForm/location-form.component.vue';
import NotificationComponent from '@/components/Notification/notification.component.vue';

@Component({
  components: {
    OfficeItemComponent,
    LocationFormComponent,
    NotificationComponent,
  },
})
export default class OfficesComponent extends Vue {
  // @ts-ignore
  private openFormSubscription: Subscription;

  // @ts-ignore
  private locationFormService: LocationFormService = LocationFormService.getInstance();

  /**
   * Subscribe form open event
   */
  public mounted(): void {
    this.loadOffices();
    this.openFormSubscription = this.locationFormService.openLocationFormObservable.subscribe(this.handleFormOpen);
  }

  /**
   * Unsubscribe form open/close events
   */
  public beforeDestroy(): void {
    this.openFormSubscription.unsubscribe();
  }

  /**
   * Validates if there are offices to show
   */
  public get hasOffices(): boolean {
    return this.offices && this.offices.length > 0;
  }

  /**
   * Returns the list of offices in the Store
   */
  public get offices(): Office[] {
    return this.$store.getters['offices/list'];
  }

  /**
   * Triggers the action in the Store to get all Offices from the API
   */
  private loadOffices(): void {
    this.$store.dispatch('offices/get');
  }

  /**
   * Handle event emited when a form is opened
   * + Scroll to the top (App title) if user is edditing
   */
  private handleFormOpen(): void {
    if (this.locationFormService.isEditing) {
      const appTitleElement: HTMLElement = <HTMLElement> this.$refs.AppTitle;
      const top: number = appTitleElement && appTitleElement.offsetTop;
      window.scrollTo(0, top || 0);
    }
  }
}
