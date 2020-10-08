import axios, { AxiosResponse } from 'axios';
import { IApiService } from '@/shared/model/IApiService';
import { IOffice } from '@/shared/model/IOffice';
import { UtilsService } from '@/shared/services/utils.service';

export class ApiService implements IApiService {
  // @ts-ignore
  private static _instance: ApiService;

  /**
   * ApiService singleton
   */
  public static getInstance(): ApiService {
    if (!this._instance) {
      this._instance = new ApiService();
    }
    return this._instance;
  }

  /**
   * Get Offices
   *
   * @return list of IOffice
   */
  public async getOffices(): Promise<IOffice[]> {
    const response: AxiosResponse<IOffice[]> = await axios.get('mock-data/offices.json');
    return response && response.data;
  }

  /**
   * Add Office
   * + simulates API request
   *
   * @param body api body
   * @return new IOffice
   */
  public async addOffice(body: IOffice): Promise<IOffice> {
    return new Promise((resolve, reject) => {
      const office: IOffice = { ...body, id: UtilsService.getGeneratedId(body.name) };
      resolve(office);
    });
  }

  /**
   * Edit Office
   * + simulates API request
   *
   * @param body api body
   * @return updated IOffice
   */
  public async updateOffice(body: IOffice): Promise<IOffice> {
    return new Promise((resolve, reject) => {
      const office: IOffice = { ...body };
      resolve(office);
    });
  }

  /**
   * Delete Office
   * + simulates API request
   *
   * @param officeId office id to be removed
   * @return removed IOffice
   */
  public async deleteOffice(officeId: string): Promise<IOffice> {
    return new Promise((resolve, reject) => {
      const office: IOffice = <IOffice> { id: officeId };
      resolve(office);
    });
  }
}
