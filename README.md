# Personal Tracker

Dashboard cá nhân theo phong cách **Minimalism Bento Grid**. Một màn hình duy nhất gom các công cụ hay dùng: Todo, Ghi chú, Thói quen — toàn bộ dữ liệu lưu ở `localStorage`, không cần backend.

🔗 **Live:** https://buiminhdn.github.io/web-personal_tracker/

## Chạy dự án

```bash
npm install
npm run dev      # mở http://localhost:5173
npm run build    # build production vào dist/
npm run preview  # xem thử bản build
```

Stack: **Vite + React 19 + TypeScript + Tailwind CSS v4 + lucide-react**. Font: Be Vietnam Pro.

## Chức năng

| Card | Mô tả |
|------|-------|
| **Todo** (2x2) | Hai view: **Board** (Kanban kéo-thả 4 cột Backlog / Todo / Doing / Done) và **Lịch** (task hiện theo Due Date). Task gồm Title, Description, Due Date, Status. |
| **Ghi chú** | Một vùng text thuần, tự lưu, đếm số từ. |
| **Thói quen** | Tick hoàn thành hôm nay, xem streak (chuỗi ngày liên tiếp) + lưới 7 ngày gần nhất. |

## Header & Cài đặt (cá nhân hóa)

Header toàn trang: bên trái là **tên board + ngày hôm nay**, bên phải có nút **Cài đặt**. Mỗi trình duyệt là một người dùng riêng (localStorage), tùy biến qua modal Cài đặt:

- **Tên board** — hiện ở header.
- **Màu chủ đạo** — 6 màu, đổi toàn bộ accent tức thì.
- **Xoá data / Tạo data mẫu** — Xoá data giữ lại cài đặt giao diện; tạo data mẫu ghi đè toàn bộ task/note/thói quen.

Theme dùng CSS variable semantic (`--color-surface`, `--color-ink`, `--color-accent`...); màu primary chỉ đổi `--color-accent`, các sắc độ phụ tự suy ra bằng `color-mix`. Settings áp trước khi paint (trong `main.tsx`) để không nháy khi load.

## Thiết kế

- Nền ảnh `src/assets/bg.jpg` cố định → các card trắng bo góc lớn xếp trên nền.
- Quy tắc bo góc: container `2rem` bao card `1.75rem` bao phần tử trong `1rem`.
- Spacing giữa card nhỏ và đồng bộ; không shadow, không emoji.
- Mỗi card dùng chung khung `BentoCard`: header cao cố định (icon + title, action bên phải) + body.
- **Mọi phần tử click được đều có `cursor: pointer`** — rule global trong `src/index.css`; phần tử click không phải `<button>/<a>` (vd span có onClick) thêm class `cursor-pointer` thủ công.

## Cấu trúc

```
src/
├── app.tsx                      # Bố cục Bento Grid + header + settings
├── assets/                      # bg.jpg (ảnh nền, Vite xử lý)
├── components/                  # BentoCard, Modal, header, settings-modal, form controls
├── lib/                         # localStorage, settings, date, id, cn, sample-data
└── features/
    ├── todo/                    # board, calendar, dialog, hook, types
    ├── notes/
    └── habits/
```

Mỗi file giữ < 200 dòng, đặt tên kebab-case mô tả rõ mục đích.

## Triển khai

Tự động deploy lên **GitHub Pages** qua GitHub Actions ([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)): mỗi lần push lên `main`, workflow build và publish thư mục `dist/`. `base` trong `vite.config.ts` đặt theo tên repo (`/web-personal_tracker/`) để asset URL trỏ đúng.
