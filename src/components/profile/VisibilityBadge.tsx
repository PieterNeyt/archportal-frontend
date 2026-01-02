import { Chip } from "@heroui/react";
import { Lock, Globe, Users } from "lucide-react";
import { Visibility, SectionDto } from "@/model/profileSyncDto.ts";

export interface VisibilityBadgeProps {
  section: SectionDto;
  size?: "sm" | "md" | "lg";
}

export function VisibilityBadge({ section, size = "md" }: VisibilityBadgeProps) {
  const getVisibilityConfig = (visibility: Visibility) => {
    switch (visibility) {
      case Visibility.PUBLIC:
        return {
          icon: <Globe size={16} />,
          label: "Public",
          color: "success" as const,
          variant: "flat" as const,
        };
      case Visibility.FRIENDS:
        return {
          icon: <Users size={16} />,
          label: "Friends",
          color: "warning" as const,
          variant: "flat" as const,
        };
      case Visibility.PRIVATE:
        return {
          icon: <Lock size={16} />,
          label: "Private",
          color: "danger" as const,
          variant: "flat" as const,
        };
      default:
        return {
          icon: <Lock size={16} />,
          label: "Unknown",
          color: "default" as const,
          variant: "flat" as const,
        };
    }
  };

  const config = getVisibilityConfig(section.visibility);

  return (
    <Chip
      startContent={config.icon}
      color={config.color}
      variant={config.variant}
      size={size}
      className="font-medium"
    >
      {config.label}
    </Chip>
  );
}

