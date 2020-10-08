import { IOffice } from '@/shared/model/IOffice';
import { OfficeColorEnum } from '@/shared/model/OfficeColorEnum';

export class Office {
  // @ts-ignore
  private _id: string;

  // @ts-ignore
  private _name: string;

  // @ts-ignore
  private _address: string;

  // @ts-ignore
  private _color: OfficeColorEnum;

  // @ts-ignore
  private _contactName: string;

  // @ts-ignore
  private _contactPosition: string;

  // @ts-ignore
  private _contactEmail: string;

  // @ts-ignore
  private _contactPhone: string;

  constructor(office: IOffice) {
    this.setData(office);
  }

  public get id(): string {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }

  public get address(): string {
    return this._address;
  }

  public get color(): OfficeColorEnum {
    return this._color;
  }

  public get contactName(): string {
    return this._contactName;
  }

  public get contactPosition(): string {
    return this._contactPosition;
  }

  public get contactEmail(): string {
    return this._contactEmail;
  }

  public get contactPhone(): string {
    return this._contactPhone;
  }

  private setData(office: IOffice): void {
    this._id = office.id;
    this._name = office.name;
    this._address = office.address;
    this._color = office.color;
    if (office.contact) {
      this._contactName = office.contact.name;
      this._contactPosition = office.contact.position;
      this._contactEmail = office.contact.email;
      this._contactPhone = office.contact.phone;
    }
  }
}
