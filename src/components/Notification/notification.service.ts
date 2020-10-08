import { NotificationTypeEnum } from '@/shared/model/NotificationTypeEnum';

export class NotificationService {
  // @ts-ignore
  private static _instance: ApiService;

  private notificationVisibleState: boolean = false;

  private notificationText: string = '';

  private notificationTimeout: number = 5000; // 5sec

  // @ts-ignore
  private notificationTimer: number;

  // @ts-ignore
  private notificationType: NotificationTypeEnum;

  /**
   * NotificationService singleton
   */
  public static getInstance(): NotificationService {
    if (!this._instance) {
      this._instance = new NotificationService();
    }
    return this._instance;
  }

  /**
   * Is notification visible
   */
  public get isVisible(): boolean {
    return this.notificationVisibleState;
  }

  /**
   * Notification type (success/error)
   */
  public get type(): string {
    return this.isVisible ? this.notificationType : '';
  }

  /**
   * Notification text
   */
  public get text(): string {
    return this.notificationText;
  }

  /**
   * Triggers a success notification
   *
   * @param text optional notification text
   */
  public showSuccess(text?: string): void {
    this.notificationText = text || 'Request successfully completed';
    this.notificationType = NotificationTypeEnum.SUCCESS;
    this.showNotification();
  }

  /**
   * Triggers an error notification
   *
   * @param text optional notification text
   */
  public showError(text?: string): void {
    this.notificationText = text || 'We were not able to complete your request';
    this.notificationType = NotificationTypeEnum.ERROR;
    this.showNotification();
  }

  /**
   * Hide notification
   */
  public hideNotification(): void {
    this.hide();
  }

  /**
   * Show notification
   * + Hides old notifications
   * + Triggers a timeout to automatically hide (only) successful notifications
   * + Error notifications must be hidden manually by the user
   */
  private showNotification(): void {
    this.hide();
    this.notificationVisibleState = true;
    if (this.notificationType === NotificationTypeEnum.SUCCESS) {
      this.notificationTimer = setTimeout(() => this.hide(), this.notificationTimeout);
    }
  }

  /**
   * Hide notification
   * + Clears active successful notification timeout
   */
  private hide(): void {
    this.notificationVisibleState = false;
    clearTimeout(this.notificationTimer);
  }
}
