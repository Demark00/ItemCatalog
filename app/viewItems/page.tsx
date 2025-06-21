"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Tag, Info, User } from "lucide-react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { UserType } from "@/types/user-type";
import { ItemType } from "@/types/items-type";

export default function ItemsPage() {
  const [items, setItems] = useState<ItemType[]>([]);
  const [authUser, setAuthUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  // Fetch items and user
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [itemsRes, userRes] = await Promise.all([
          axios.get("/api/items"),
          axios
            .get("/api/auth/checkAuth")
            .catch(() => ({ data: { user: null } })),
        ]);
        setItems(itemsRes.data.items || []);
        setAuthUser(userRes.data.user);
      } catch {
        toast.error("Failed to load items.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const myItems = authUser
    ? items.filter((item) => item.createdBy === authUser._id)
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-white to-accent/10 py-12 px-4">
      <div className="max-w-7xl mx-auto mt-10">
        <h1 className="text-3xl font-extrabold text-primary mb-8 flex items-center gap-2">
          <Tag className="w-8 h-8 text-accent" /> View Items
        </h1>

        {/* My Items Section */}
        {authUser && myItems.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <User className="w-6 h-6 text-primary" /> My Items
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {myItems.map((item) => (
                <ItemCard
                  key={item._id}
                  item={item}
                  onClick={() => router.push(`/viewItems/${item._id}`)}
                />
              ))}
            </div>
          </section>
        )}

        {/* All Items Section */}
        <section>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Info className="w-6 h-6 text-accent" /> All Items
          </h2>
          {loading ? (
            <div className="flex justify-center py-16">
              <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {items.map((item) => (
                <ItemCard
                  key={item._id}
                  item={item}
                  onClick={() => router.push(`/viewItems/${item._id}`)}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function ItemCard({ item, onClick }: { item: ItemType; onClick: () => void }) {
  return (
    <div
      className="card bg-base-100 shadow-xl hover:shadow-2xl transition cursor-pointer group"
      onClick={onClick}
    >
      <figure className="relative">
        <img
          src={item.coverImage}
          alt={item.name}
          className="w-full h-48 object-cover rounded-t-xl group-hover:scale-105 transition"
        />
        <span className="absolute top-2 left-2 badge badge-primary badge-outline text-xs">
          {item.type}
        </span>
      </figure>
      <div className="card-body p-4">
        <h2 className="card-title text-lg font-bold text-primary flex items-center gap-2">
          <Tag className="w-4 h-4 text-accent" /> {item.name}
        </h2>
      </div>
    </div>
  );
}
