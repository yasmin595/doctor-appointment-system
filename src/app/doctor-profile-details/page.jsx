"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Pencil } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";



export default function DoctorProfileDetails() {
  const [editing, setEditing] = useState(false);
  const [editingFees, setEditingFees] = useState(false);
  const [editingAvailability, setEditingAvailability] = useState(false);
  const [availability, setAvailability] = useState({
    Monday: { active: true, start: "09:00", end: "17:00" },
    Tuesday: { active: true, start: "09:00", end: "17:00" },
    Wednesday: { active: true, start: "09:00", end: "17:00" },
    Thursday: { active: true, start: "09:00", end: "17:00" },
    Friday: { active: true, start: "09:00", end: "17:00" },
    Saturday: { active: false, start: "09:00", end: "13:00" },
    Sunday: { active: false, start: "09:00", end: "13:00" },
  });
  return (
    <div className="max-w-5xl mx-auto p-6 pt-20 min-h-screen">
      {/* Title */}
      <h1 className="text-2xl font-bold mb-2">My Profile (Doctor)</h1>
      <p className="text-gray-500 mb-6">
        Manage your profile information, fees, and availability
      </p>

      {/* Tabs */}
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="h-full mb-6 flex flex-wrap">
          <TabsTrigger value="profile">Profile Information</TabsTrigger>
          <TabsTrigger value="fees">Consultation Fees</TabsTrigger>
          <TabsTrigger value="availability">Availability</TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Personal Information</CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEditing(!editing)}
              >
                <Pencil className="h-4 w-4 mr-2" />
                {editing ? "Cancel" : "Edit Profile"}
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-2xl font-bold">
                  SJ
                </div>
                <h2 className="text-xl font-semibold mt-3">Dr. Sarah Johnson</h2>
                <p className="text-blue-600">Cardiology</p>
                <p className="text-sm text-gray-500">8 years of experience</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="text-sm font-medium">Email Address</label>
                  <Input
                    type="email"
                    defaultValue="sarah.johnson@medicenter.com"
                    disabled={!editing}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Phone Number</label>
                  <Input
                    type="text"
                    defaultValue="+1 (555) 123-4567"
                    disabled={!editing}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Medical License</label>
                  <Input
                    type="text"
                    defaultValue="MD-12345-2020"
                    disabled={!editing}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Education</label>
                  <Input
                    type="text"
                    defaultValue="Harvard Medical School"
                    disabled={!editing}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm font-medium">Professional Bio</label>
                  <Textarea
                    defaultValue="Experienced cardiologist specializing in preventive cardiology and heart disease management. Committed to providing comprehensive care to patients."
                    disabled={!editing}
                  />
                </div>
              </div>

              {editing && (
                <div className="flex justify-end">
                  <Button onClick={() => { setEditing(false) }} className="bg-blue-600 hover:bg-blue-700">
                    Save Changes
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Security Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="destructive">Change Password</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Fees Tab */}
        <TabsContent value="fees">
          <Card>
            <CardHeader className="flex items-center justify-between">
              <CardTitle>Consultation Fees</CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEditingFees(!editingFees)}
              >
                {editingFees ? "Cancel" : "Edit"}
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Fee Amount</Label>
                  <Input type="number" defaultValue="50" disabled={!editingFees} />
                </div>
                <div className="space-y-2">
                  <Label>Currency</Label>
                  <Select defaultValue="usd" disabled={!editingFees}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usd">USD</SelectItem>
                      <SelectItem value="eur">EUR</SelectItem>
                      <SelectItem value="bdt">BDT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Consultation Duration</Label>
                  <Select defaultValue="30" disabled={!editingFees}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 Minutes</SelectItem>
                      <SelectItem value="30">30 Minutes</SelectItem>
                      <SelectItem value="45">45 Minutes</SelectItem>
                      <SelectItem value="60">1 Hour</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {editingFees && (
                <div className="flex justify-end mt-4">
                  <Button onClick={() => { setEditingFees(false) }} className="bg-blue-600 hover:bg-blue-700">
                    Save Fees
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Availability Tab */}
        <TabsContent value="availability">
          <Card>
            <CardHeader className="flex items-center justify-between">
              <CardTitle>Weekly Availability</CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEditingAvailability(!editingAvailability)}
              >
                {editingAvailability ? "Cancel" : "Edit"}
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(availability).map(([day, { active, start, end }]) => (
                  <div
                    key={day}
                    className="flex flex-col md:flex-row md:items-center justify-between border rounded-lg p-3"
                  >
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={active}
                        disabled={!editingAvailability}
                        onCheckedChange={(checked) =>
                          setAvailability((prev) => ({
                            ...prev,
                            [day]: { ...prev[day], active: checked },
                          }))
                        }
                      />
                      <span className="font-medium">{day}</span>
                    </div>
                    {active ? (
                      <div className="flex items-center gap-2 mt-2 md:mt-0">
                        <Label className="text-sm">From</Label>
                        <Input
                          type="time"
                          value={start}
                          disabled={!editingAvailability}
                          onChange={(e) =>
                            setAvailability((prev) => ({
                              ...prev,
                              [day]: { ...prev[day], start: e.target.value },
                            }))
                          }
                          className="w-28"
                        />
                        <Label className="text-sm">To</Label>
                        <Input
                          type="time"
                          value={end}
                          disabled={!editingAvailability}
                          onChange={(e) =>
                            setAvailability((prev) => ({
                              ...prev,
                              [day]: { ...prev[day], end: e.target.value },
                            }))
                          }
                          className="w-28"
                        />
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400 mt-2 md:mt-0">
                        Not Available
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {editingAvailability && (
                <div className="flex justify-end mt-6">
                  <Button onClick={() => { setEditingAvailability(false) }} className="bg-blue-600 hover:bg-blue-700">
                    Save Availability
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

