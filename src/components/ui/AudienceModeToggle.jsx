import { BriefcaseBusiness, Code2 } from 'lucide-react';
import { useAudienceMode } from '../../hooks/useAudienceMode';

const options = [
  { id: 'recruiter', label: 'Recruiter', icon: BriefcaseBusiness },
  { id: 'engineer', label: 'Engineer', icon: Code2 },
];

const AudienceModeToggle = ({ compact = false }) => {
  const { mode, setMode } = useAudienceMode();

  return (
    <div
      className={`grid grid-cols-2 border border-white/10 bg-white/[0.035] p-1 ${
        compact ? 'w-full' : 'min-w-56'
      }`}
      role="group"
      aria-label="Audience mode"
    >
      {options.map((option) => {
        const Icon = option.icon;
        const active = mode === option.id;

        return (
          <button
            key={option.id}
            type="button"
            onClick={() => setMode(option.id)}
            className={`inline-flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold transition ${
              active
                ? 'bg-cyan-300 text-slate-950'
                : 'text-slate-300 hover:bg-white/5 hover:text-white'
            }`}
            aria-pressed={active}
          >
            <Icon className="h-3.5 w-3.5" />
            {option.label}
          </button>
        );
      })}
    </div>
  );
};

export default AudienceModeToggle;
