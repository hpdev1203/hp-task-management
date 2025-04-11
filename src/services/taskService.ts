import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  Timestamp
} from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { Task } from '../types/task';

const TASKS_COLLECTION = 'tasks';

export const taskService = {
  // Lấy tất cả tasks
  async getAllTasks(): Promise<Task[]> {
    const querySnapshot = await getDocs(collection(db, TASKS_COLLECTION));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Task));
  },

  // Lấy tasks theo status
  async getTasksByStatus(status: string) {
    const q = query(
      collection(db, TASKS_COLLECTION),
      where('status', '==', status),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  },

  // Thêm task mới
  async addTask(task: any) {
    const docRef = await addDoc(collection(db, TASKS_COLLECTION), {
      ...task,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    return {
      id: docRef.id,
      ...task
    };
  },

  // Cập nhật task
  async updateTask(taskId: string, updates: any) {
    const taskRef = doc(db, TASKS_COLLECTION, taskId);
    await updateDoc(taskRef, {
      ...updates,
      updatedAt: Timestamp.now()
    });
  },

  // Xóa task
  async deleteTask(taskId: string) {
    const taskRef = doc(db, TASKS_COLLECTION, taskId);
    await deleteDoc(taskRef);
  }
}; 