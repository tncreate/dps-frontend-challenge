import { OfficeColorEnum } from '@/shared/model/OfficeColorEnum';
import { IContact } from '@/shared/model/IContact';

export interface IOffice {
  id: string;
  name: string;
  address: string;
  color: OfficeColorEnum;
  contact: IContact;
}
