import { IOffice } from '@/shared/model/IOffice';

export interface IApiService {
  getOffices(): Promise<IOffice[]>;
  addOffice(body: IOffice): Promise<IOffice>;
  updateOffice(body: IOffice): Promise<IOffice>;
  deleteOffice(officeId: string): Promise<IOffice>;
}
