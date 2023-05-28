import store from "./store";

export const base_url = "http://localhost:8000";

export const getAuthHeader = () => {
  const { token } = store.getState();
  return { Authorization: `Bearer ${token}` };
};
