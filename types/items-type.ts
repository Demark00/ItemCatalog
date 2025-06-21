export type ItemType = {
  _id: string;
  name: string;
  type: string;
  description: string;
  coverImage: string;
  additionalImages: string[];
  createdBy?: {
    fullName: string;
    email: string;
  };
  createdAt: string;
};


export interface ItemStore {
  items: ItemType[];
  isLoading: boolean;
  fetchItems: () => Promise<void>;
  fetchItemsByUser: () => Promise<void>;
  addItem: (newItem: ItemType) => Promise<void>;
  fetchItemById: (itemId: string) => Promise<ItemType | null>;
  sendEnquiry: (params: {
    itemId: string;
    itemName: string;
    userEmail: string;
    message: string;
  }) => Promise<void>;
}