"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { ArrowLeft, BadgeInfo, Mail, User, Image } from "lucide-react";
import clsx from "clsx";
import { useItemStore } from "@/stores/itemsStore";
import { ItemType } from "@/types/items-type";

export default function ViewItemPage() {
  const params = useParams();
  const router = useRouter();
  const { fetchItemById, sendEnquiry } = useItemStore();

  const [item, setItem] = useState<ItemType | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const [showEnquiryForm, setShowEnquiryForm] = useState(false);
  const [enquiryMessage, setEnquiryMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const getItem = async () => {
      setLoading(true);
      setNotFound(false);
      if (typeof params.id === "string") {
        const data = await fetchItemById(params.id);
        if (data) {
          setItem(data);
        } else {
          setNotFound(true);
        }
        setLoading(false);
      }
    };
    getItem();
  }, [params.id, fetchItemById]);

  const handleEnquire = () => {
    setShowEnquiryForm(true);
  };

  const handleSubmitEnquiry = async () => {
    if (!enquiryMessage.trim()) {
      toast.error("Please write a message.");
      return;
    }

    if (!item) return;

    try {
      setSubmitting(true);
      await sendEnquiry({
        itemId: item._id,
        itemName: item.name,
        userEmail: item.createdBy?.email || "noreply@example.com",
        message: enquiryMessage,
      });

      toast.success("Your enquiry has been sent!");
      setShowEnquiryForm(false);
      setEnquiryMessage("");
    } catch (err) {
      toast.error("Failed to send enquiry");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (notFound || !item) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-base-200">
        <Image className="w-16 h-16 text-error mb-4" />
        <h2 className="text-2xl font-bold text-error mb-2">Item Not Found</h2>
        <button
          className="btn btn-primary mt-4"
          onClick={() => router.push("/viewItems")}
        >
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Items
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-white to-accent/10 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2">
          <button
            className="btn btn-ghost btn-sm flex items-center gap-1"
            onClick={() => router.push("/viewItems")}
          >
            <ArrowLeft className="w-4 h-4" /> Back to Items
          </button>
          <span className="text-base-content/60">/</span>
          <span className="font-semibold text-primary">{item.name}</span>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white shadow-xl rounded-3xl p-6">
          {/* Left: Info */}
          <div className="flex flex-col justify-between space-y-6">
            {/* Item Name & Type */}
            <div>
              <h1 className="text-3xl font-extrabold text-primary flex items-center gap-2 mb-2">
                <BadgeInfo className="w-7 h-7 text-accent" /> {item.name}
              </h1>
              <span className="badge badge-accent badge-outline text-base px-4 py-2 font-semibold">
                {item.type}
              </span>
            </div>

            {/* Description Block */}
            <div className="bg-base-100 rounded-xl p-4 border border-base-200 shadow-sm">
              <h3 className="text-lg font-semibold text-base-content mb-2">Description</h3>
              <p className="text-base-content/80 text-sm">{item.description}</p>
            </div>

            {/* Seller Info Block */}
            <div className="bg-base-100 rounded-xl p-4 border border-base-200 shadow-sm">
              <h3 className="text-lg font-semibold text-base-content mb-2">Uploader Details</h3>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-sm">
                  <User className="w-4 h-4 text-primary" />
                  <span className="font-medium">
                    {item.createdBy?.fullName || "Unknown"}
                  </span>
                </div>
                {item.createdBy?.email && (
                  <div className="flex items-center gap-2 text-sm text-base-content/70">
                    <Mail className="w-4 h-4 text-accent" />
                    <span>{item.createdBy.email}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Enquire Button or Form */}
            {showEnquiryForm ? (
              <div className="flex flex-col gap-3">
                <textarea
                  className="textarea textarea-bordered w-full"
                  rows={4}
                  placeholder="Write your enquiry here..."
                  value={enquiryMessage}
                  onChange={(e) => setEnquiryMessage(e.target.value)}
                ></textarea>
                <div className="flex gap-2">
                  <button
                    className="btn btn-primary"
                    onClick={handleSubmitEnquiry}
                    disabled={submitting}
                  >
                    {submitting ? (
                      <span className="loading loading-spinner loading-sm"></span>
                    ) : (
                      "Submit Enquiry"
                    )}
                  </button>
                  <button
                    className="btn btn-ghost"
                    onClick={() => {
                      setShowEnquiryForm(false);
                      setEnquiryMessage("");
                    }}
                    disabled={submitting}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                className="btn btn-primary btn-block flex items-center gap-2 text-lg font-semibold"
                onClick={handleEnquire}
              >
                <Mail className="w-5 h-5" /> Enquire
              </button>
            )}
          </div>

          {/* Right: Images */}
          <div className="flex flex-col gap-6">
            {/* Cover Image */}
            <img
              src={item.coverImage}
              alt={item.name}
              className="rounded-xl border-2 border-primary/20 shadow-lg w-full h-72 object-cover"
            />

            {/* Additional Images */}
            {item.additionalImages.length > 0 && (
              <div>
                <h3 className="text-base font-semibold text-base-content/80 mb-2">
                  Additional Images
                </h3>
                <div className="carousel w-full rounded-xl flex gap-3 overflow-x-auto">
                  {item.additionalImages.map((img, idx) => (
                    <div
                      key={idx}
                      className={clsx(
                        "carousel-item w-28 h-28 border border-accent/20 rounded-lg overflow-hidden"
                      )}
                    >
                      <img
                        src={img}
                        alt={`Additional ${idx + 1}`}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
