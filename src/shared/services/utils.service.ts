
export class UtilsService {
  /**
   * Generate random/text based ID
   *
   * @param text random string
   * @return new id
   */
  public static getGeneratedId(text?: string): string {
    const prefix: string = text ? text.toLowerCase().replace(' ', '_') : '';
    return `${prefix}_${Math.random().toString()}`;
  }
}
