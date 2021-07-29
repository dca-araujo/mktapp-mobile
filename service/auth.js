import AsyncStorage from '@react-native-async-storage/async-storage';

export const TOKEN_KEY = "@mktapp:token";
export const TOKEN_CLIENT = "@mktapp:client";

export const isAuthenticated = () => { return AsyncStorage.getItem(TOKEN_KEY); };
export const getToken = () => AsyncStorage.getItem(TOKEN_KEY);
export const getCliente = () => AsyncStorage.getItem(TOKEN_CLIENT);
export const login = obj => {
    AsyncStorage.setItem(TOKEN_CLIENT, JSON.stringify(obj.user))
    return AsyncStorage.setItem(TOKEN_KEY, obj.token);
};
export const logout = () => { return AsyncStorage.removeItem(TOKEN_KEY); }