import { Office } from '@/shared/model/Office';
import { IOffice } from '@/shared/model/IOffice';
import { ApiService } from '@/shared/services/api.service';

interface IStoreState {
  [key: string]: any;
}

interface IIndexedOffice {
  [officeId: string]: Office
}

export const OfficesState = {
  namespaced: true,
  state: {
    offices: {},
  },
  mutations: {
    setOffices(state: IStoreState, offices: IIndexedOffice) {
      state.offices = offices;
    },
    setOffice(state: IStoreState, office: Office) {
      state.offices = {
        ...state.offices,
        [office.id]: office,
      };
    },
    deleteOffice(state: IStoreState, officeId: string) {
      delete state.offices[officeId];
      state.offices = Object.assign({ }, state.offices); // to ensure reactivity (https://vuejs.org/v2/guide/reactivity.html#For-Objects)
    },
  },
  actions: {
    /**
     * state.offices is indexed by office.id to facilitate data access
     */
    async get({ commit }: any): Promise<void> {
      const data: IOffice[] = await ApiService.getInstance().getOffices();
      if (data) {
        const offices: IIndexedOffice = data.reduce((acc: IIndexedOffice, iOffice: IOffice) => {
          const office: Office = new Office(iOffice);
          acc[office.id] = office;
          return acc;
        }, { });
        commit('setOffices', offices);
      }
    },
    async add({ commit }: any, body: IOffice): Promise<Office | null> {
      return ApiService.getInstance().addOffice(body)
        .then((success: IOffice) => {
          const office: Office = new Office(success);
          commit('setOffice', office);
          return office;
        })
        .catch((error: IOffice) => null);
    },
    /**
     * The old Office() instance is replaced by a new, updated one >> Best controlled / efficiency way of detecting changes
     */
    async update({ commit }: any, body: IOffice): Promise<Office | null> {
      return ApiService.getInstance().updateOffice(body)
        .then((success: IOffice) => {
          const office: Office = new Office(success);
          commit('setOffice', office);
          return office;
        })
        .catch((error: IOffice) => null);
    },
    async delete({ commit }: any, officeId: string): Promise<string | null> {
      return ApiService.getInstance().deleteOffice(officeId)
        .then((success: IOffice) => {
          commit('deleteOffice', success.id);
          return officeId;
        })
        .catch((error: IOffice) => null);
    },
  },
  getters: {
    list: (state: IStoreState): Office[] => Object.values(state.offices),
  },
};
