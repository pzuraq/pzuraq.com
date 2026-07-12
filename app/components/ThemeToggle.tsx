import { useEffect, useId } from 'react';
import { signal } from 'signalium';
import { component } from 'signalium/react';

type Theme = 'light' | 'dark' | 'system';

const theme = signal<Theme>(
  typeof document === 'undefined'
    ? 'system'
    : ((localStorage.getItem('theme') as Theme | null) ?? 'system'),
);

const prefersTheme = (): Theme =>
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

const toggleTheme = () => {
  const current = theme.value;

  document.body.classList.remove(current);

  // If the theme is set to system, then set it to the preferred default
  // theme and toggle based on that.
  const base = current === 'system' ? prefersTheme() : current;
  const next = base === 'light' ? 'dark' : 'light';

  theme.value = next;
  document.body.classList.add(next);
  localStorage.setItem('theme', next);
};

let globalHandlerExists = false;

const handleGlobalShortcut = (e: KeyboardEvent) => {
  if (e.code === 'KeyD' && e.ctrlKey && e.altKey) {
    toggleTheme();
  }
};

export default component(function ThemeToggle() {
  const id = useId();

  useEffect(() => {
    if (globalHandlerExists) return;

    globalHandlerExists = true;

    document.addEventListener('keyup', handleGlobalShortcut);

    return () => {
      globalHandlerExists = false;
      document.removeEventListener('keyup', handleGlobalShortcut);
    };
  }, []);

  const isDark =
    theme.value === 'dark' ||
    (theme.value === 'system' && typeof window !== 'undefined' && prefersTheme() === 'dark');

  return (
    <label className="toggle text-lg md:text-base" htmlFor={`toggle-${id}`}>
      <input
        className="toggle__input"
        checked={isDark}
        type="checkbox"
        id={`toggle-${id}`}
        onChange={() => toggleTheme()}
      />
      <div className="toggle__fill" />
    </label>
  );
});
