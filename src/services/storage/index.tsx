import { MMKV, useMMKVString } from "react-native-mmkv";

export const storage = new MMKV();

export function useStorageString(key: string, instance?: MMKV) {
  return useMMKVString(key, instance || storage);
}
