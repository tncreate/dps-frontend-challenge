import { Component, Vue, Prop } from 'vue-property-decorator';
import Axios, { AxiosResponse } from 'axios';

@Component({})
export default class IconComponent extends Vue {
  // @ts-ignore
  @Prop() public name: string;

  private svg: string = '';

  /**
   * Return the fetched icon
   */
  public get icon(): string {
    return this.svg;
  }

  /**
   * Fetch the required icon if a name was provided
   */
  public mounted(): void {
    if (this.name) {
      this.fetchIcon(this.name);
    }
  }

  /**
   * Icon was clicked
   * + Emit event to the parent component
   */
  public iconClicked(): void {
    this.$emit('iconClicked');
  }

  /**
   * Get the svg file
   */
  private async fetchIcon(iconName: string): Promise<void> {
    const response: AxiosResponse = await Axios.get(`./img/icons/${iconName}.svg`);
    this.svg = response && response.data;
  }
}
