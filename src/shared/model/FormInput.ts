import { FormInputTypeEnum } from '@/shared/model/FormInputTypeEnum';
import { UtilsService } from '@/shared/services/utils.service';

export class FormInput {
  // @ts-ignore
  private _id: string;

  // @ts-ignore
  private _title: string;

  // @ts-ignore
  private _placeholder: string;

  // @ts-ignore
  private _type: FormInputTypeEnum;

  // @ts-ignore
  private _value: string;

  // @ts-ignore
  private _required: boolean;

  constructor(title: string, value: string = '', placeholder: string = '', type: FormInputTypeEnum = FormInputTypeEnum.TEXT, required: boolean = true) {
    this._id = UtilsService.getGeneratedId(title);
    this._title = title;
    this._placeholder = placeholder;
    this._type = type;
    this._value = value;
    this._required = required;
  }

  public get id(): string {
    return this._id;
  }

  public get title(): string {
    return this._title;
  }

  public get placeholder(): string {
    return this._placeholder;
  }

  public get type(): string {
    return this._type;
  }

  public get value(): string {
    return this._value;
  }

  public set value(value: string) {
    this._value = value;
  }

  public get isRequired(): boolean {
    return this._required;
  }
}
