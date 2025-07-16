import { create } from "zustand";
import Cookies from "js-cookie";
import axios from "axios";
import { urls } from "@/utils/endpoint";
import { toast } from "sonner";

interface Plan {
  id: string;
  name: string;
  plan_type: string;
  amount: string;
  interval: number;
}

interface PlanStore {
  plans: Plan[];
  selectedPlanId: string | null;
  setPlans: (plans: Plan[]) => void;
  selectPlan: (id: string) => void;
  clearPlanSelection: () => void;
  isLoading: boolean;
  fetchPlans: () => Promise<void>;
}

export const usePlanStore = create<PlanStore>((set, get) => ({
  plans: [],
  selectedPlanId: null,
  isLoading: false,
  setPlans: (plans) => set({ plans }),
  selectPlan: (id) => set({ selectedPlanId: id }),
  clearPlanSelection: () => set({ selectedPlanId: null }),
  fetchPlans: async () => {
    try {
      set({ isLoading: true });
      const response = await axios.get(urls.plans);

      set({ plans: response.data });
      if (response.status === 200) {
        set({ isLoading: false });
      }
    } catch (error: any) {
      if (error.message === "Network Error") {
        toast.error("Check your network!");
      } else {
        toast.error(error.response?.data?.detail);
      }
    } finally {
      set({ isLoading: false });
    }
  },
}));
