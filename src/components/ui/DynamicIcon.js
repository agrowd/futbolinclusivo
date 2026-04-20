import * as Icons from "lucide-react";

export default function DynamicIcon({ name, size = 24, className = "" }) {
  const IconComponent = Icons[name];
  
  if (!IconComponent) {
    // Fallback if icon name is invalid
    return <Icons.HelpCircle size={size} className={className} />;
  }
  
  return <IconComponent size={size} className={className} />;
}
