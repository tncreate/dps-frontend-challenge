import { Component, Vue } from 'vue-property-decorator';

import IconComponent from '@/components/Icon/icon.component.vue';
import { NotificationService } from '@/components/Notification/notification.service';
import { NotificationTypeEnum } from '@/shared/model/NotificationTypeEnum';

@Component({
  components: {
    IconComponent,
  },
})
export default class NotificationComponent extends Vue {
  private notificationService: NotificationService = NotificationService.getInstance();

  /**
   * Is there any active notification to be shown
   */
  public get showNotification(): boolean {
    return this.notificationService.isVisible;
  }

  /**
   * Is active notification is from a success operation
   * + !isSuccess = isError
   */
  public get isSuccess(): boolean {
    return this.notificationService.type === NotificationTypeEnum.SUCCESS;
  }

  /**
   * Two available icons, depending on the notification type (success/error)
   */
  public get icon(): string {
    return this.isSuccess ? 'app-check' : 'app-warning';
  }

  /**
   * Notification text
   */
  public get text(): string {
    return this.notificationService.text;
  }

  /**
   * Hide notification
   */
  public hide(): void {
    this.notificationService.hideNotification();
  }
}
