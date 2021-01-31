import AsyncStorage from '@react-native-async-storage/async-storage';

export const TOKEN_KEY = "@mktapp:mobile";
export const isAuthenticated = () => { return AsyncStorage.getItem(TOKEN_KEY); };
export const getToken = () => AsyncStorage.getItem(TOKEN_KEY);
export const login = token => { if(token) return AsyncStorage.setItem(TOKEN_KEY, token); };
export const logout = () => { return AsyncStorage.removeItem(TOKEN_KEY); }