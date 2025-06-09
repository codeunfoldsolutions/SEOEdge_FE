import { RefreshCw } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "../ui/dialog";
import { Input } from "../ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";

interface AddAuditDialogProps {
  url: string;
}

const AddAuditDialog = ({ url }: AddAuditDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="h-8">
          <RefreshCw size={14} className="mr-1" />
          Run New Audit
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Run New Audit</DialogTitle>
          <DialogDescription>
            Configure your audit settings below.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">URL to Audit</label>
            <Input defaultValue={url} />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Audit Depth</label>
            <Select defaultValue="comprehensive">
              <SelectTrigger>
                <SelectValue placeholder="Select audit depth" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="quick">
                  Quick Scan (up to 50 pages)
                </SelectItem>
                <SelectItem value="comprehensive">
                  Comprehensive (up to 500 pages)
                </SelectItem>
                <SelectItem value="complete">
                  Complete Site (unlimited pages)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Audit Focus</label>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="seo" defaultChecked />
                <label htmlFor="seo" className="text-sm">
                  SEO
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="performance" defaultChecked />
                <label htmlFor="performance" className="text-sm">
                  Performance
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="accessibility" defaultChecked />
                <label htmlFor="accessibility" className="text-sm">
                  Accessibility
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="best-practices" defaultChecked />
                <label htmlFor="best-practices" className="text-sm">
                  Best Practices
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="security" defaultChecked />
                <label htmlFor="security" className="text-sm">
                  Security
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="mobile" defaultChecked />
                <label htmlFor="mobile" className="text-sm">
                  Mobile Friendliness
                </label>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button>Start Audit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddAuditDialog;
