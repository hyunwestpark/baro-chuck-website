// src/components/navigation/LocationHoverCard.tsx
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface LocationHoverCardProps {
  children: React.ReactNode;
}

export const LocationHoverCard = ({ children }: LocationHoverCardProps) => {
  return (
    <HoverCard openDelay={100} closeDelay={150}>
      <HoverCardTrigger asChild>{children}</HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex flex-col gap-2">
          <div className="font-semibold">카카오 지도로 이동</div>
          <p className="text-sm text-muted-foreground">
            클릭하시면 카카오 지도에서 바로척마취통증의학과 위치를 확인하실 수
            있습니다.
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};
