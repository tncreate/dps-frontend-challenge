import { Component, Vue } from 'vue-property-decorator';

import { Office } from '@/shared/model/Office';

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
  public mounted(): void {
    this.loadOffices();
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
}
