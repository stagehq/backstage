import { atomFamily } from 'recoil';

export const apiState = atomFamily({
  key: 'api',
  default: async (apiConnectorId: string) => {
    const response = await fetch(`/api/extension/${apiConnectorId}`);
    return response.json();
  }
});