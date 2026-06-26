import { Check, Copy, Globe } from "lucide-react";
import { useState } from "react";

const STARTUP_URL = "chrome://settings/onStartup";
const SITE_URL = "https://buiminhdn.github.io/web-personal_tracker/";

/** Reusable guide: make this site Chrome's default startup page. */
export function ChromeStartupGuide() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedKey(value);
      window.setTimeout(() => setCopiedKey(null), 2000);
    } catch {
      // Clipboard có thể bị chặn (HTTP, quyền) — bỏ qua, user vẫn copy tay được.
    }
  };

  const renderCopyRow = (value: string) => {
    const copied = copiedKey === value;
    return (
      <div className="mt-2 flex items-center gap-2 rounded-(--radius-inner) bg-surface p-2 pl-3">
        <span className="min-w-0 flex-1 truncate text-sm text-ink-soft">
          {value}
        </span>
        <button
          type="button"
          onClick={() => handleCopy(value)}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-blue-700"
        >
          {copied ? <Check size={13} /> : <Copy size={13} />}
          {copied ? "Đã copy" : "Copy"}
        </button>
      </div>
    );
  };

  return (
    <div className="rounded-(--radius-inner) border border-line bg-surface-sunken p-3.5">
      <p className="flex items-center gap-1.5 text-sm font-medium text-ink">
        <Globe size={14} /> Đặt làm trang mặc định khi mở Chrome
      </p>
      <ol className="mt-2.5 space-y-2.5 text-sm leading-relaxed text-ink-soft">
        <li>
          <strong className="text-ink">B1:</strong> Mở đường dẫn sau:
          {renderCopyRow(STARTUP_URL)}
        </li>
        <li>
          <strong className="text-ink">B2:</strong> Chọn{" "}
          <span className="text-ink">
            “Mở một trang hoặc một tập hợp các trang cụ thể”
          </span>
        </li>
        <li>
          <strong className="text-ink">B3:</strong> Bấm{" "}
          <span className="text-ink">“Thêm trang mới”</span> và dán link:
          {renderCopyRow(SITE_URL)}
        </li>
      </ol>
    </div>
  );
}
