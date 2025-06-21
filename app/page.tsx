"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { toast } from "react-hot-toast";
import { ImagePlus, UploadCloud, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useItemStore } from "@/stores/itemsStore";
import { ITEM_TYPES } from "./constants/items";
import { resizeImage } from "./utils/resizeImage";

export default function AddItemPage() {
  const [form, setForm] = useState({
    name: "",
    type: "",
    description: "",
    coverImage: "",
    additionalImages: [] as string[],
  });
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [additionalPreviews, setAdditionalPreviews] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);

  const { addItem, isLoading } = useItemStore();
  const router = useRouter();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCoverImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const base64 = await resizeImage(file);
      setForm((prev) => ({ ...prev, coverImage: base64 }));
      setCoverPreview(base64);
    }
  };

  const handleAdditionalImages = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length) {
      const images: string[] = [];
      const previews: string[] = [];

      Array.from(files).forEach(async (file) => {
        const base64 = await resizeImage(file);
        images.push(base64);
        previews.push(base64);

        if (images.length === files.length) {
          setForm((prev) => ({ ...prev, additionalImages: images }));
          setAdditionalPreviews(previews);
        }
      });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.type || !form.coverImage) {
      toast.error("Please fill all required fields.");
      return;
    }

    await addItem({
      ...form,
      _id: "",
      createdAt: new Date().toISOString(),
    });

    setSuccess(true);
    setTimeout(() => {
      router.push("/viewItems");
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-white to-accent/10 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl p-8 mt-10">
        <h1 className="text-3xl font-extrabold text-primary mb-2 flex items-center gap-2">
          <UploadCloud className="w-8 h-8 text-accent" /> Add New Item
        </h1>
        <p className="mb-8 text-base-content/70">
          Fill in the details below to add a new item to your catalog.
        </p>

        {success ? (
          <div className="flex flex-col items-center justify-center py-16">
            <CheckCircle2 className="w-16 h-16 text-success mb-4 animate-bounce" />
            <h2 className="text-2xl font-bold text-success mb-2">
              Item successfully added!
            </h2>
            <p className="text-base-content/70">Redirecting to items page...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Section */}
            <div className="space-y-6">
              <div>
                <label className="label font-semibold">Item Name</label>
                <input
                  type="text"
                  name="name"
                  className="input input-bordered w-full"
                  placeholder="Enter item name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="label font-semibold">Item Type</label>
                <select
                  name="type"
                  className="select select-bordered w-full"
                  value={form.type}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select type</option>
                  {ITEM_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="label font-semibold">Description</label>
                <textarea
                  name="description"
                  className="textarea textarea-bordered w-full"
                  placeholder="Describe the item"
                  value={form.description}
                  onChange={handleChange}
                  rows={6}
                  required
                />
              </div>
            </div>

            {/* Right Section */}
            <div className="space-y-6">
              <div>
                <label className="label font-semibold flex items-center gap-2">
                  <ImagePlus className="w-5 h-5 text-primary" /> Cover Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  className="file-input file-input-bordered w-full"
                  onChange={handleCoverImage}
                  required
                />
                {coverPreview && (
                  <div className="mt-3 flex justify-center">
                    <Image
                      src={coverPreview}
                      alt="Cover Preview"
                      width={160}
                      height={160}
                      className="rounded-xl border-2 border-primary/30 shadow-md object-cover"
                      unoptimized
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="label font-semibold flex items-center gap-2">
                  <ImagePlus className="w-5 h-5 text-accent" /> Additional Images
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="file-input file-input-bordered w-full"
                  onChange={handleAdditionalImages}
                />
                {additionalPreviews.length > 0 && (
                  <div className="flex gap-3 mt-3 flex-wrap">
                    {additionalPreviews.map((img, idx) => (
                      <Image
                        key={idx}
                        src={img}
                        alt={`Preview ${idx + 1}`}
                        width={80}
                        height={80}
                        className="rounded-lg border border-accent/30 object-cover shadow"
                        unoptimized
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="btn btn-primary btn-block text-lg font-bold shadow-lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="loading loading-spinner loading-md"></span>
                  ) : (
                    <>
                      <UploadCloud className="w-5 h-5 mr-2" /> Add Item
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
