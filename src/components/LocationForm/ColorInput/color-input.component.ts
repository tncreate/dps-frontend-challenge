import { Component, Vue, Prop } from 'vue-property-decorator';

import { FormInput } from '@/shared/model/FormInput';

import IconComponent from '@/components/Icon/icon.component.vue';
import { OfficeColorEnum } from '@/shared/model/OfficeColorEnum';

@Component({
  components: {
    IconComponent,
  },
})
export default class ColorInputComponent extends Vue {
  // @ts-ignore
  @Prop() public input: FormInput;

  public showList: boolean = false;

  public colors: string[] = [
    OfficeColorEnum.PELOROUS,
    OfficeColorEnum.KOROMIKO,
    OfficeColorEnum.GERALDINE,
    OfficeColorEnum.GRAYCHATEAU,
    OfficeColorEnum.OXFORDBLUE,
  ];

  /**
   * Select random color if input.value is not a valid color
   */
  public mounted(): void {
    if (!this.input.value || !this.colors.includes(this.input.value)) {
      this.selectRandomColor();
    }
  }

  /**
   * Get selected color
   */
  public get activeColor(): string {
    return this.input.value;
  }

  /**
   * Validate if a given color is the selected one
   *
   * @param color color name
   */
  public isActiveColor(color: string): boolean {
    return this.activeColor === color;
  }

  /**
   * Open/Close list of available colors
   */
  public toogleColorList(): void {
    this.showList = !this.showList;
  }

  /**
   * Select one color
   * + Closes list of colors
   *
   * @param color selected color
   */
  public selectColor(color: string): void {
    this.input.value = color;
    this.showList = false;
  }

  /**
   * Get a random color from the list and selects it
   */
  private selectRandomColor(): void {
    const randomPosition: number = Math.floor(Math.random() * this.colors.length);
    const color: string = this.colors[randomPosition];
    this.selectColor(color);
  }
}
