import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase/firebase';

export async function getUsers() {
  return await getDocs(collection(db, 'users'))
    .then(data => {
      return data;
    })
    .catch(err => {
      console.log(err);
    });
}
