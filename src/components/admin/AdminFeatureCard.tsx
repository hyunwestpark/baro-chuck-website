import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface AdminFeatureCardProps {
  title: string;
  description: string;
  route: string;
  buttonText?: string;
}

const AdminFeatureCard: React.FC<AdminFeatureCardProps> = ({
  title,
  description,
  route,
  buttonText = "관리하기",
}) => {
  const navigate = useNavigate();

  return (
    <div className="bg-card text-card-foreground shadow-sm rounded-lg p-6 border">
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      <p className="text-muted-foreground mb-4">{description}</p>
      <Button
        onClick={() => navigate(route)}
        variant="default"
        className="w-full"
      >
        {buttonText}
      </Button>
    </div>
  );
};

export default AdminFeatureCard;
