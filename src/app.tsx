import { motion } from "motion/react";
import { useState } from "react";
import { DashboardHeader } from "./components/dashboard-header";
import { SettingsModal } from "./components/settings-modal";
import { WelcomeModal } from "./components/welcome-modal";
import { useLocalStorage } from "./lib/use-local-storage";
import { useSettings } from "./lib/use-settings";
import { HabitCard } from "./features/habits/habit-card";
import { NotesCard } from "./features/notes/notes-card";
import { TodoCard } from "./features/todo/todo-card";

/**
 * Bento dashboard shell: a photographic background, a translucent padded
 * container with a page header. Todo stands alone across the left two
 * columns; the right column stacks Habits (hugging its content) over Notes
 * (filling the rest). Personalization lives in settings and is applied to
 * the DOM by useSettings.
 */
export function App() {
  const { settings, update } = useSettings();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [welcomed, setWelcomed] = useLocalStorage("pt.welcomed", false);

  return (
    <div className="min-h-screen p-2">
      <div className="flex flex-col gap-2 rounded-4xl p-2 lg:h-[calc(100dvh-1rem)]">
        <DashboardHeader
          title={settings.boardTitle}
          onOpenSettings={() => setSettingsOpen(true)}
        />
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
          className="grid min-h-0 flex-1 grid-cols-1 gap-2 lg:grid-cols-[repeat(3,minmax(0,1fr))]"
        >
          <TodoCard className="min-h-115 lg:col-span-2 lg:min-h-0" />

          {/* Right column: Habits hugs its content, Notes fills the rest. */}
          <div className="flex min-h-0 flex-col gap-2 lg:col-start-3">
            <HabitCard className="min-h-80 lg:min-h-0 lg:shrink-0" />
            <NotesCard className="min-h-80 lg:min-h-0 lg:flex-1" />
          </div>
        </motion.div>
      </div>

      <SettingsModal
        open={settingsOpen}
        settings={settings}
        onClose={() => setSettingsOpen(false)}
        onUpdate={update}
      />

      <WelcomeModal open={!welcomed} onClose={() => setWelcomed(true)} />
    </div>
  );
}
