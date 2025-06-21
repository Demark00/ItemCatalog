import { create } from "zustand";
import { axiosInstance } from "@/lib/axios";
import toast from "react-hot-toast";
import { ItemStore, ItemType } from "@/types/items-type";

export const useItemStore = create<ItemStore>((set) => ({
    items: [],
    isLoading: false,

    fetchItems: async () => {
        try {
            set({ isLoading: true });
            const response = await axiosInstance.get("/items");
            set({ items: response.data.items });
        } catch (error) {
            console.error("Error fetching items:", error);
            toast.error("Failed to load items");
        } finally {
            set({ isLoading: false });
        }
    },

    fetchItemsByUser: async () => {
        try {
            set({ isLoading: true });
            const response = await axiosInstance.get("/items/user");
            set({ items: response.data.items });
        } catch (error) {
            console.error("Error fetching user items:", error);
            toast.error("Failed to load your items");
        } finally {
            set({ isLoading: false });
        }
    },

    addItem: async (newItem) => {
        try {
            set({ isLoading: true });
            const response = await axiosInstance.post("/items", newItem);
            set((state) => ({ items: [response.data.item, ...state.items] }));
            toast.success("Item successfully added!");
        } catch (error) {
            console.error("Error adding item:", error);
            toast.error("Failed to add item");
        } finally {
            set({ isLoading: false });
        }
    },

    fetchItemById: async (itemId: string): Promise<ItemType | null> => {
        try {
            const response = await axiosInstance.get(`/items/${itemId}`);
            return response.data.item as ItemType;
        } catch (error) {
            console.error("Error fetching item:", error);
            toast.error("Failed to load item details");
            return null;
        }
    },

    sendEnquiry: async ({
        itemId,
        itemName,
        userEmail,
        message,
    }: {
        itemId: string;
        itemName: string;
        userEmail: string;
        message: string;
    }) => {
        try {
            const res = await axiosInstance.post("/enquiry", {
                itemId,
                itemName,
                userEmail,
                message,
            });
            
            toast.success(res.data.message || "Enquiry sent successfully");
        } catch (error) {
            console.error("Error sending enquiry:", error);
            toast.error("Failed to send enquiry");
        }
    }
})
);
