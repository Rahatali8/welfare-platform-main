"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Shield, Eye, Save, Edit, Camera, CheckCircle, AlertCircle } from "lucide-react"

export default function UserProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [profileData, setProfileData] = useState({
    firstName: "Ahmed",
    lastName: "Hassan",
    email: "ahmed.hassan@email.com",
    phone: "+92 300 1234567",
    cnic: "42101-1234567-8",
    dateOfBirth: "1985-06-15",
    address: "123 Main Street, Karachi",
    city: "Karachi",
    province: "Sindh",
    occupation: "Teacher",
    monthlyIncome: "45000",
    familySize: "5",
    bio: "I am a dedicated teacher working to support my family and contribute to my community's education.",
  })

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: true,
    applicationUpdates: true,
    programAnnouncements: false,
    marketingEmails: false,
  })

  const [privacy, setPrivacy] = useState({
    profileVisibility: "private",
    showContactInfo: false,
    allowDataSharing: true,
  })

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSaving(false)
    setIsEditing(false)
  }

  const handleInputChange = (field: string, value: string) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleNotificationChange = (field: string, value: boolean) => {
    setNotifications((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handlePrivacyChange = (field: string, value: string | boolean) => {
    setPrivacy((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-blue-900">Profile Settings</h1>
          <p className="text-gray-600 mt-2">Manage your account information and preferences</p>
        </div>

        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="family">Family Details</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>

          {/* Personal Information Tab */}
          <TabsContent value="personal">
            <Card className="border-0 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-xl text-blue-900">Personal Information</CardTitle>
                  <p className="text-gray-600">Update your personal details and contact information</p>
                </div>
                <Button
                  variant={isEditing ? "outline" : "default"}
                  onClick={() => setIsEditing(!isEditing)}
                  className={isEditing ? "" : "bg-blue-600 hover:bg-blue-700"}
                >
                  {isEditing ? (
                    <>
                      <Eye className="h-4 w-4 mr-2" />
                      View Mode
                    </>
                  ) : (
                    <>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </>
                  )}
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Profile Picture */}
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="h-12 w-12 text-blue-600" />
                    </div>
                    {isEditing && (
                      <Button size="sm" className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0">
                        <Camera className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-blue-900">
                      {profileData.firstName} {profileData.lastName}
                    </h3>
                    <p className="text-gray-600">{profileData.email}</p>
                    <Badge className="mt-1 bg-green-100 text-green-800">Verified Account</Badge>
                  </div>
                </div>

                {/* Personal Details */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={profileData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={profileData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cnic">CNIC Number</Label>
                    <Input
                      id="cnic"
                      value={profileData.cnic}
                      onChange={(e) => handleInputChange("cnic", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={profileData.dateOfBirth}
                      onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                {/* Address */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-blue-900">Address Information</h4>
                  <div className="space-y-2">
                    <Label htmlFor="address">Street Address</Label>
                    <Input
                      id="address"
                      value={profileData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={profileData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="province">Province</Label>
                      <Input
                        id="province"
                        value={profileData.province}
                        onChange={(e) => handleInputChange("province", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={profileData.bio}
                    onChange={(e) => handleInputChange("bio", e.target.value)}
                    disabled={!isEditing}
                    rows={3}
                  />
                </div>

                {isEditing && (
                  <div className="flex justify-end space-x-4">
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleSave} disabled={isSaving} className="bg-blue-600 hover:bg-blue-700">
                      {isSaving ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Family Details Tab */}
          <TabsContent value="family">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-blue-900">Family Information</CardTitle>
                <p className="text-gray-600">Provide details about your family for assistance evaluation</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="occupation">Occupation</Label>
                    <Input
                      id="occupation"
                      value={profileData.occupation}
                      onChange={(e) => handleInputChange("occupation", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="monthlyIncome">Monthly Income (PKR)</Label>
                    <Input
                      id="monthlyIncome"
                      type="number"
                      value={profileData.monthlyIncome}
                      onChange={(e) => handleInputChange("monthlyIncome", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="familySize">Family Size</Label>
                    <Input
                      id="familySize"
                      type="number"
                      value={profileData.familySize}
                      onChange={(e) => handleInputChange("familySize", e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Save className="h-4 w-4 mr-2" />
                    Update Family Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <div className="space-y-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-blue-900">Password & Security</CardTitle>
                  <p className="text-gray-600">Manage your account security settings</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input id="currentPassword" type="password" placeholder="Enter current password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input id="newPassword" type="password" placeholder="Enter new password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input id="confirmPassword" type="password" placeholder="Confirm new password" />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Shield className="h-4 w-4 mr-2" />
                      Update Password
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-blue-900">Account Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                        <div>
                          <p className="font-semibold text-green-800">Email Verified</p>
                          <p className="text-sm text-green-600">Your email address has been verified</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                        <div>
                          <p className="font-semibold text-green-800">Phone Verified</p>
                          <p className="text-sm text-green-600">Your phone number has been verified</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                      <div className="flex items-center">
                        <AlertCircle className="h-5 w-5 text-yellow-600 mr-3" />
                        <div>
                          <p className="font-semibold text-yellow-800">Two-Factor Authentication</p>
                          <p className="text-sm text-yellow-600">Enable 2FA for enhanced security</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Enable
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Preferences Tab */}
          <TabsContent value="preferences">
            <div className="space-y-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-blue-900">Notification Preferences</CardTitle>
                  <p className="text-gray-600">Choose how you want to receive updates and notifications</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-gray-600">Receive notifications via email</p>
                      </div>
                      <Switch
                        checked={notifications.emailNotifications}
                        onCheckedChange={(checked) => handleNotificationChange("emailNotifications", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">SMS Notifications</p>
                        <p className="text-sm text-gray-600">Receive notifications via SMS</p>
                      </div>
                      <Switch
                        checked={notifications.smsNotifications}
                        onCheckedChange={(checked) => handleNotificationChange("smsNotifications", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Application Updates</p>
                        <p className="text-sm text-gray-600">Get notified about application status changes</p>
                      </div>
                      <Switch
                        checked={notifications.applicationUpdates}
                        onCheckedChange={(checked) => handleNotificationChange("applicationUpdates", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Program Announcements</p>
                        <p className="text-sm text-gray-600">Receive updates about new programs</p>
                      </div>
                      <Switch
                        checked={notifications.programAnnouncements}
                        onCheckedChange={(checked) => handleNotificationChange("programAnnouncements", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Marketing Emails</p>
                        <p className="text-sm text-gray-600">Receive promotional content and newsletters</p>
                      </div>
                      <Switch
                        checked={notifications.marketingEmails}
                        onCheckedChange={(checked) => handleNotificationChange("marketingEmails", checked)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-blue-900">Privacy Settings</CardTitle>
                  <p className="text-gray-600">Control your privacy and data sharing preferences</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Show Contact Information</p>
                        <p className="text-sm text-gray-600">Allow others to see your contact details</p>
                      </div>
                      <Switch
                        checked={privacy.showContactInfo}
                        onCheckedChange={(checked) => handlePrivacyChange("showContactInfo", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Allow Data Sharing</p>
                        <p className="text-sm text-gray-600">Share anonymized data for research purposes</p>
                      </div>
                      <Switch
                        checked={privacy.allowDataSharing}
                        onCheckedChange={(checked) => handlePrivacyChange("allowDataSharing", checked)}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Save className="h-4 w-4 mr-2" />
                      Save Preferences
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
