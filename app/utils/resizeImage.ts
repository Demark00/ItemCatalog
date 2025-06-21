// ✅ Utility to resize image
export const resizeImage = (file: File, maxSize = 600): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const scale = maxSize / Math.max(img.width, img.height);
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.7)); // JPEG format for smaller size
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
};