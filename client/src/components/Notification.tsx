import { useEffect } from "react";

type NotificationProps = {
  message: string;
  type: "success" | "error";
  onClose: () => void;
};

export default function Notification({
  message,
  type,
  onClose,
}: NotificationProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  const isSuccess = type === "success";

  return (
    <div
      role={isSuccess ? "status" : "alert"}
      className={`fixed right-5 top-5 z-50 flex w-[calc(100%-40px)] max-w-sm items-start gap-3 border-2 border-black p-4 shadow-[5px_5px_0_#171717] animate-in slide-in-from-right duration-300 ${
        isSuccess ? "bg-[#D9F99D]" : "bg-red-100"
      }`}
    >
      <span className="grid h-8 w-8 shrink-0 place-items-center border-2 border-black bg-white font-black">
        {isSuccess ? "✓" : "!"}
      </span>

      <div className="flex-1">
        <p className="font-black">
          {isSuccess ? "Success!" : "Something went wrong"}
        </p>
        <p className="mt-1 text-sm font-medium">{message}</p>
      </div>

      <button
        type="button"
        onClick={onClose}
        aria-label="Dismiss notification"
        className="font-black hover:text-neutral-500"
      >
        ✕
      </button>
    </div>
  );
}