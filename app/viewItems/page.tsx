"use client";

import { useEffect } from "react";
import { Tag, Info, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useItemStore } from "@/stores/itemsStore";
import useAuthStore from "@/stores/authStore";
import { ItemType } from "@/types/items-type";
import Image from "next/image";

export default function ItemsPage() {
  const { fetchItems, items, isLoading } = useItemStore();
  const { authUser, checkAuth } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    fetchItems();
    checkAuth();
  }, [fetchItems, checkAuth]);

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
            <ItemGrid items={myItems} router={router} />
          </section>
        )}

        {/* All Items Section */}
        <section>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Info className="w-6 h-6 text-accent" /> All Items
          </h2>
          {isLoading ? (
            <div className="flex justify-center py-16">
              <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
          ) : (
            <ItemGrid items={items} router={router} />
          )}
        </section>
      </div>
    </div>
  );
}

function ItemGrid({ items, router }: { items: ItemType[]; router: any }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
      {items.map((item) => (
        <ItemCard
          key={item._id}
          item={item}
          onClick={() => router.push(`/viewItems/${item._id}`)}
        />
      ))}
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
        <Image
          src={item.coverImage}
          alt={item.name}
          width={400}
          height={300}
          className="w-full h-48 object-cover rounded-t-xl group-hover:scale-105 transition"
          unoptimized
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
