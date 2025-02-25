import React from "react";
import AdminFeatureCard from "./AdminFeatureCard";

interface AdminFeature {
  id: string;
  title: string;
  description: string;
  route: string;
  buttonText?: string;
}

interface AdminFeaturesGridProps {
  features: AdminFeature[];
  columns?: 1 | 2 | 3 | 4;
}

const AdminFeaturesGrid: React.FC<AdminFeaturesGridProps> = ({
  features,
  columns = 3,
}) => {
  const getGridColsClass = (): string => {
    switch (columns) {
      case 1:
        return "grid-cols-1";
      case 2:
        return "grid-cols-1 md:grid-cols-2";
      case 3:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
      case 4:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-4";
      default:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
    }
  };

  return (
    <div className={`grid ${getGridColsClass()} gap-6`}>
      {features.map((feature) => (
        <AdminFeatureCard
          key={feature.id}
          title={feature.title}
          description={feature.description}
          route={feature.route}
          buttonText={feature.buttonText}
        />
      ))}
    </div>
  );
};

export default AdminFeaturesGrid;
