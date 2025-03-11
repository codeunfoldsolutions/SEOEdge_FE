"use client";

import { useState } from "react";
import { CalendarIcon, Clock, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { format } from "date-fns";

export function ScheduleAuditModal() {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date>();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1">
          <CalendarIcon size={14} />
          <span>Schedule Audit</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Schedule Audit</DialogTitle>
          <DialogDescription>
            Set up automated or one-time audits for your websites.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Project to Audit</Label>
            <Select defaultValue="example.com">
              <SelectTrigger>
                <SelectValue placeholder="Select project" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="example.com">example.com</SelectItem>
                <SelectItem value="myshop.com">myshop.com</SelectItem>
                <SelectItem value="blog.example.com">
                  blog.example.com
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Frequency</Label>
            <RadioGroup defaultValue="once" className="space-y-2">
              <div className="flex items-center space-x-2 rounded-md border p-3">
                <RadioGroupItem value="once" id="once" />
                <Label htmlFor="once" className="flex-1">
                  One-time audit
                </Label>

                <div className="ml-auto space-x-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className="w-[200px] justify-start text-left font-normal"
                        disabled={!date}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="flex items-center space-x-2 rounded-md border p-3">
                <RadioGroupItem value="weekly" id="weekly" />
                <Label htmlFor="weekly" className="flex-1">
                  Weekly
                </Label>

                <div className="ml-auto">
                  <Select defaultValue="monday">
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Select day" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monday">Monday</SelectItem>
                      <SelectItem value="tuesday">Tuesday</SelectItem>
                      <SelectItem value="wednesday">Wednesday</SelectItem>
                      <SelectItem value="thursday">Thursday</SelectItem>
                      <SelectItem value="friday">Friday</SelectItem>
                      <SelectItem value="saturday">Saturday</SelectItem>
                      <SelectItem value="sunday">Sunday</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center space-x-2 rounded-md border p-3">
                <RadioGroupItem value="monthly" id="monthly" />
                <Label htmlFor="monthly" className="flex-1">
                  Monthly
                </Label>

                <div className="ml-auto">
                  <Select defaultValue="1">
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Select day" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 28 }, (_, i) => (
                        <SelectItem key={i} value={(i + 1).toString()}>
                          {i + 1}
                          {i === 0
                            ? "st"
                            : i === 1
                            ? "nd"
                            : i === 2
                            ? "rd"
                            : "th"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>Time of Day</Label>
            <div className="flex items-center space-x-4">
              <Clock size={16} className="text-gray" />
              <div className="grid grid-cols-2 gap-2">
                <Select defaultValue="10">
                  <SelectTrigger>
                    <SelectValue placeholder="Hour" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 12 }, (_, i) => (
                      <SelectItem key={i} value={(i + 1).toString()}>
                        {i + 1}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select defaultValue="00">
                  <SelectTrigger>
                    <SelectValue placeholder="Minute" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="00">00</SelectItem>
                    <SelectItem value="15">15</SelectItem>
                    <SelectItem value="30">30</SelectItem>
                    <SelectItem value="45">45</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Select defaultValue="am">
                <SelectTrigger className="w-[70px]">
                  <SelectValue placeholder="AM/PM" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="am">AM</SelectItem>
                  <SelectItem value="pm">PM</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Audit Options</Label>
            <div className="space-y-2">
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
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="notifications" defaultChecked />
              <Label htmlFor="notifications" className="text-sm">
                <div className="flex items-center">
                  <Bell size={14} className="mr-1 text-gray" />
                  Send email notifications when audit completes
                </div>
              </Label>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setOpen(false)}>Schedule Audit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
