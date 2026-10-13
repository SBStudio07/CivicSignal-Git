import { Construction, Lightbulb, Droplets, Trash2, CircleHelp } from 'lucide-react';

const ICONS = { Construction, Lightbulb, Droplets, Trash2 };

export default function CategoryIcon({ name, ...props }) {
  const Icon = ICONS[name] ?? CircleHelp;
  return <Icon aria-hidden="true" {...props} />;
}
