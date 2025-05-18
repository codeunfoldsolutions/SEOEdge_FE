import { Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { AddProjectModal } from "../modals/add-project-modal";

export function AddProjectCard() {
  return (
    <Card className="border border-dashed border-gray flex flex-col items-center justify-center p-6">
      <Plus size={24} className="text-gray mb-2" />
      <p className="text-sm font-medium mb-1">Add New Project</p>
      <p className="text-xs text-gray text-center mb-3">
        Track SEO performance for another website
      </p>
      <AddProjectModal />
    </Card>
  );
}
