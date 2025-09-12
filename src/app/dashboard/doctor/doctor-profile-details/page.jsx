"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Pencil } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { doctorProfile } from "@/app/actions/user/doctorProfile";
import { useSession } from "next-auth/react";
import { updateDoctorProfile } from "@/app/actions/user/updateDoctorProfile";
import { useForm } from "react-hook-form";
import { toast } from "sonner";



export default function DoctorProfileDetails() {
  const { data: session } = useSession()
  const [loading,setLoading]=useState(true)
  const [user, setUser] = useState({})
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

  const fetchData = async () => {
    try {
      const res = await doctorProfile(session.user.email, session.user.role);
      console.log(res);
      if (res.availability && Object.keys(res.availability).length > 0) {
        setAvailability(res.availability);
      }
      setUser(res);
      setLoading(false)
    } catch (err) {
      console.error("Error fetching doctor profile:", err);
    }
  };

  useEffect(() => {
    fetchData()
  }, [editing, editingAvailability, editingFees])

  const { register, handleSubmit, reset } = useForm();
  const onSubmit = async (formData) => {
    const updates = {
      phone: formData.phone || user.phone,
      Med_id: formData.Med_id || user.Med_id || "",
      education: formData.education || user.education || "",
      bio: formData.bio || user.bio,
    };
    console.log(updates)
    const response = await updateDoctorProfile(user._id, updates);
    if (response.success) {
      toast.success("user updated!!");
      setEditing(false);
      reset()
    }else{
      toast.error("update failed!")
    }

  };
  if(loading) return <p className="text-center">Loading.....</p>

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
                  img
                </div>
                <h2 className="text-xl font-semibold mt-3">{user.name}</h2>
                <p className="text-blue-600">{user.specialization}</p>
                <p className="text-sm text-gray-500">{user.experience} years of experience</p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="text-sm font-medium">Email Address</label>
                  <Input defaultValue={user.email} type="email" {...register("email")} disabled />
                </div>

                <div>
                  <label className="text-sm font-medium">Phone Number</label>
                  <Input defaultValue={user.phone} type="text" {...register("phone")} disabled={!editing} />
                </div>

                <div>
                  <label className="text-sm font-medium">Medical License</label>
                  <Input defaultValue={user.Med_id || ""} type="text" {...register("Med_id")} placeholder="MD-12345-2020" disabled={!editing} />
                </div>

                <div>
                  <label className="text-sm font-medium">Education</label>
                  <Input defaultValue={user.education || ""} type="text" {...register("education")} placeholder="Harvard Medical School" disabled={!editing} />
                </div>

                <div className="md:col-span-2">
                  <label className="text-sm font-medium">Professional Bio</label>
                  <Textarea {...register("bio")} defaultValue={user.bio} disabled={!editing} />
                </div>

                {editing && (
                  <div className="md:col-span-2 flex justify-end">
                    <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                      Save Changes
                    </Button>
                  </div>
                )}
              </form>
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
                  <Input type="number" value={user.fee ? user.fee.amount : ""}
                    onChange={(e) => setUser(prev => ({
                      ...prev,
                      fee: { ...prev.fee, amount: e.target.value }
                    }))}
                    placeholder="ex-50" disabled={!editingFees} />
                </div>
                <div className="space-y-2">
                  <Label>Currency</Label>
                  <Select defaultValue={user.fee ? user.fee.currency : ""}
                    onValueChange={(value) => setUser(prev => ({
                      ...prev,
                      fee: { ...prev.fee, currency: value }
                    }))}
                    disabled={!editingFees}>
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
                  <Select defaultValue={user.fee ? user.fee.duration : ""}
                    onValueChange={(value) => setUser(prev => ({
                      ...prev,
                      fee: { ...prev.fee, duration: value }
                    }))}
                    disabled={!editingFees}>
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
                  <Button onClick={async () => {
                    const updatedFee = {
                      fee: {
                        amount: user.fee?.amount,
                        currency: user.fee?.currency,
                        duration: user.fee?.duration,
                      }
                    };

                    await updateDoctorProfile(user._id, updatedFee);

                    setEditingFees(false)
                  }} className="bg-blue-600 hover:bg-blue-700">
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
                  <Button onClick={async () => {
                    await updateDoctorProfile(user._id, {
                      availability: availability
                    });
                    setEditingAvailability(false)
                  }} className="bg-blue-600 hover:bg-blue-700">
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

