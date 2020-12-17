import AsyncStorage from '@react-native-async-storage/async-storage';

export const TOKEN_KEY = "@mktapp:mobile";
export const isAuthenticated = async () => { return await AsyncStorage.getItem(TOKEN_KEY); };
export const getToken = () => AsyncStorage.getItem(TOKEN_KEY);
export const login = token => { AsyncStorage.setItem(TOKEN_KEY, token); };
export const logout = async () => { await AsyncStorage.removeItem(TOKEN_KEY); }