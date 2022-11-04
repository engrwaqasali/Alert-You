import EncryptedStorage from 'react-native-encrypted-storage';

export const saveToken = async (token: string) => {
  try {
    await EncryptedStorage.setItem('@token', token);
    console.log('성공!');
  } catch(e) {
    console.log(e);
  }
};

export const getToken = async () => {
    try {
      const token = await EncryptedStorage.getItem('@token');
      console.log(token);
    } catch (e) {
      console.log(e);
    }
  };

export const removeToken = async () => {
  try {
    await EncryptedStorage.removeItem('@token');
  } catch (e) {
    console.log(e)
  }
}