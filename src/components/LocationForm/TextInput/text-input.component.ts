import { Component, Vue, Prop } from 'vue-property-decorator';

import { FormInput } from '@/shared/model/FormInput';
import { FormInputTypeEnum } from '@/shared/model/FormInputTypeEnum';
import { LocationFormService } from '@/components/LocationForm/location-form.service';

import IconComponent from '@/components/Icon/icon.component.vue';

const enum ErroCodeEnum {
  NOT_AN_EMAIL = 'E-mail address not valid',
  NOT_A_PHONE = 'Phone number not valid',
  EMPTY_FIELD = 'This field cannot be empty',
}

@Component({
  components: {
    IconComponent,
  },
})
export default class TextInputComponent extends Vue {
  // @ts-ignore
  @Prop() public input: FormInput;

  // @ts-ignore
  private _changed: boolean = false;

  /**
   * Get input error
   * + Update LocationFormService error state
   * + Only show active error if !!forceErrorDisplay flag or input was already changed
   */
  public get activeError(): string {
    const activeError: string = this.getActiveError();
    const showError: boolean = LocationFormService.getInstance().forceErrorDisplay || this._changed;
    LocationFormService.getInstance().updateErrorState(this.input.id, activeError);
    return showError && activeError ? activeError : '';
  }

  /**
   * When user starts changing the value on the text input
   * + Activate changed flag
   */
  public handleKeydown(): void {
    this._changed = true;
  }

  /**
   * Get active error, depending on the input type
   */
  private getActiveError(): string {
    const isValid: boolean = !this.input.isRequired || !!this.input.value;
    if (isValid) {
      if (this.input.type === FormInputTypeEnum.EMAIL && !this.isEmail(this.input.value)) {
        return ErroCodeEnum.NOT_AN_EMAIL;
      }
      return '';
    }
    return ErroCodeEnum.EMPTY_FIELD;
  }

  /**
   * Tests if given text is a valid email
   *
   * @param text string to be tested
   */
  private isEmail(text: string): boolean {
    return RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g).test(text);
  }
}
