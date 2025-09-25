import AsyncStorage from "@react-native-async-storage/async-storage";

export async function save(key: string, value: unknown) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn("Erro ao salvar", key, e);
  }
}

export async function load<T>(key: string): Promise<T | null> {
  try {
    const raw = await AsyncStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch (e) {
    console.warn("Erro ao carregar", key, e);
    return null;
  }
}

