import { create } from "zustand";
import axios from "axios";
import { urls } from "@/utils/endpoint";
import { toast } from "sonner";

interface StudentsStore {
  students: any;
  loading: boolean;
  fetchStudents: () => Promise<void>;
}

const useStudentsStore = create<StudentsStore>((set, get) => ({
  students: {},
  loading: false,

  fetchStudents: async () => {
    try {
      set({ loading: true });
      const response = await axios.get(urls.getStudents);
      if (response.status === 200) {
        set({ students: response.data });
        // console.log(response.data, "resdat");
      }
    } catch (error: any) {
      toast.error(`Error fetching courses: ${error.message}`);
    } finally {
      set({ loading: false });
    }
  },
}));

export default useStudentsStore;
