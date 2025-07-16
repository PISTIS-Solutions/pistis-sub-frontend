import { create } from "zustand";
import axios from "axios";
import Cookies from "js-cookie";
import { urls } from "@/utils/endpoint";
import { toast } from "sonner";
import refreshTokens from "@/utils/refreshToken";

interface CheckStatusState {
  current_plan: string | null;
  time_left: string | null;
  loadSub: boolean;
  error: string | null;
  checkStatus: () => Promise<void>;
}

const useCheckStatusStore = create<CheckStatusState>((set) => ({
  current_plan: null,
  time_left: null,
  loadSub: false,
  error: null,

  checkStatus: async () => {
    set({ loadSub: true, error: null, current_plan: null, time_left: null });
    const refresh = Cookies.get("refreshToken");
    const accessToken = Cookies.get("authToken");

    try {
      const response = await axios.get(urls.subStatus, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (response.status === 200) {
        set({
          current_plan: response.data.current_plan,
          time_left: response.data.time_left,
          error: null,
        });
      }
    } catch (error: any) {
      if (error.response?.status === 401) {
        const refreshed = await refreshTokens();
        if (refreshed) {
          await useCheckStatusStore.getState().checkStatus();
          return;
        } else {
          set({ error: "Session expired" });
          toast.error("Session expired. Please log in again.");
        }
      } else if (error?.message === "Network Error") {
        toast.error("Check your network!");
      } else {
        set({ error: error?.response?.data?.detail || "An error occurred" });
        toast.error(error?.response?.data?.detail || "An error occurred");
      }
    } finally {
      set({ loadSub: false });
    }
  },
}));

export default useCheckStatusStore;
