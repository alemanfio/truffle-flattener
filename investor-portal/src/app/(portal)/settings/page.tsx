"use client";

import { useState } from "react";
import { useAuth } from "@/components/auth-provider";
import { EXPERT_TAGS, FUND_SUMMARY } from "@/lib/mock-data";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { formatCurrency, formatPercent, cn } from "@/lib/utils";
import { Save, User, Shield, Lock, Wallet } from "lucide-react";

export default function SettingsPage() {
  const { user } = useAuth();

  const [fullName, setFullName] = useState(user?.full_name ?? "");
  const [location, setLocation] = useState(user?.location ?? "");
  const [bio, setBio] = useState(user?.bio ?? "");
  const [linkedinUrl, setLinkedinUrl] = useState(user?.linkedin_url ?? "");
  const [openToHelp, setOpenToHelp] = useState(user?.open_to_help_with ?? "");
  const [selectedTags, setSelectedTags] = useState<string[]>(
    user?.expert_tags?.map((t) => t.id) ?? []
  );
  const [isProfilePublic, setIsProfilePublic] = useState(user?.is_profile_public ?? true);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function toggleTag(tagId: string) {
    setSelectedTags((prev) =>
      prev.includes(tagId) ? prev.filter((id) => id !== tagId) : [...prev, tagId]
    );
  }

  function handleSaveProfile() {
    alert("Profile saved (demo mode)");
  }

  function handleSaveTags() {
    alert("Expertise tags saved (demo mode)");
  }

  function handleSavePrivacy() {
    alert("Privacy settings saved (demo mode)");
  }

  function handleChangePassword() {
    if (!newPassword) {
      alert("Please enter a new password");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    alert("Password changed (demo mode)");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  }

  function getPasswordStrength(): { label: string; color: string; width: string } {
    if (!newPassword) return { label: "", color: "", width: "0%" };
    let score = 0;
    if (newPassword.length >= 8) score++;
    if (/[A-Z]/.test(newPassword)) score++;
    if (/[0-9]/.test(newPassword)) score++;
    if (/[^a-zA-Z0-9]/.test(newPassword)) score++;

    if (score <= 1) return { label: "Weak", color: "bg-red-500", width: "25%" };
    if (score === 2) return { label: "Fair", color: "bg-orange-500", width: "50%" };
    if (score === 3) return { label: "Medium", color: "bg-yellow-500", width: "75%" };
    return { label: "Strong", color: "bg-emerald-500", width: "100%" };
  }

  const strength = getPasswordStrength();
  const userPerformance = ((FUND_SUMMARY.userCurrentValue - FUND_SUMMARY.userCommitted) / FUND_SUMMARY.userCommitted) * 100;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Account Settings</h1>
        <p className="text-muted-foreground">Manage your profile, preferences, and account</p>
      </div>

      <Tabs defaultValue="personal">
        <TabsList>
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="investment">Investment</TabsTrigger>
          <TabsTrigger value="expertise">Expertise</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>

        {/* Personal Info */}
        <TabsContent value="personal">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <User className="h-5 w-5" />
                <CardTitle className="text-xl">Personal Information</CardTitle>
              </div>
              <CardDescription>Update your personal details and bio</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Full Name</label>
                  <Input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Your full name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input
                    value="alex@genseed.vc"
                    disabled
                    className="bg-muted"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Location</label>
                <Input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="City, Country"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium">Bio</label>
                <Textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value.slice(0, 500))}
                  placeholder="Tell others about yourself..."
                  rows={3}
                />
                <p className="text-xs text-muted-foreground text-right">{bio.length}/500</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">LinkedIn URL</label>
                <Input
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  placeholder="https://linkedin.com/in/yourprofile"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium">Open to help with</label>
                <Textarea
                  value={openToHelp}
                  onChange={(e) => setOpenToHelp(e.target.value.slice(0, 300))}
                  placeholder="What areas can you help other LPs or portfolio companies with?"
                  rows={2}
                />
                <p className="text-xs text-muted-foreground text-right">{openToHelp.length}/300</p>
              </div>
              <div className="flex justify-end">
                <Button onClick={handleSaveProfile} className="gap-2">
                  <Save className="h-4 w-4" />
                  Save Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Investment Details (read-only) */}
        <TabsContent value="investment">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Wallet className="h-5 w-5" />
                <CardTitle className="text-xl">Investment Details</CardTitle>
              </div>
              <CardDescription>Your investment summary in GenSeed Capital Fund I</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-lg border p-4">
                  <p className="text-sm text-muted-foreground">Committed Amount</p>
                  <p className="text-2xl font-bold">{formatCurrency(FUND_SUMMARY.userCommitted)}</p>
                </div>
                <div className="rounded-lg border p-4">
                  <p className="text-sm text-muted-foreground">Deployed</p>
                  <p className="text-2xl font-bold">{FUND_SUMMARY.userDeployedPercent}%</p>
                </div>
                <div className="rounded-lg border p-4">
                  <p className="text-sm text-muted-foreground">Current Value</p>
                  <p className="text-2xl font-bold">{formatCurrency(FUND_SUMMARY.userCurrentValue)}</p>
                  <Badge className="mt-1 bg-emerald-100 text-emerald-800 border-transparent">
                    {formatPercent(userPerformance)}
                  </Badge>
                </div>
                <div className="rounded-lg border p-4">
                  <p className="text-sm text-muted-foreground">Fund MOIC</p>
                  <p className="text-2xl font-bold">{FUND_SUMMARY.moic}x</p>
                </div>
                <div className="rounded-lg border p-4">
                  <p className="text-sm text-muted-foreground">Fund IRR</p>
                  <p className="text-2xl font-bold">{FUND_SUMMARY.irr}%</p>
                </div>
                <div className="rounded-lg border p-4">
                  <p className="text-sm text-muted-foreground">Portfolio Companies</p>
                  <p className="text-2xl font-bold">{FUND_SUMMARY.portfolioCount}</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                Contact the GP team to update your investment details.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Expertise Tags */}
        <TabsContent value="expertise">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Expertise Tags</CardTitle>
              <CardDescription>Select areas that match your expertise. Other LPs can find you by these tags.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {EXPERT_TAGS.map((tag) => {
                  const isSelected = selectedTags.includes(tag.id);
                  return (
                    <button key={tag.id} onClick={() => toggleTag(tag.id)} className="focus:outline-none">
                      <Badge
                        variant={isSelected ? "default" : "outline"}
                        className={cn(
                          "cursor-pointer text-sm px-3 py-1.5 transition-colors",
                          isSelected
                            ? "bg-genseed-blue hover:bg-genseed-blue/80"
                            : "hover:bg-accent"
                        )}
                      >
                        {tag.emoji} {tag.name}
                      </Badge>
                    </button>
                  );
                })}
              </div>
              <div className="flex justify-end">
                <Button onClick={handleSaveTags} className="gap-2">
                  <Save className="h-4 w-4" />
                  Save Expertise
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Privacy */}
        <TabsContent value="privacy">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                <CardTitle className="text-xl">Privacy Settings</CardTitle>
              </div>
              <CardDescription>Control who can see your profile information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isProfilePublic}
                  onChange={(e) => setIsProfilePublic(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <div>
                  <p className="text-sm font-medium">Public profile</p>
                  <p className="text-sm text-muted-foreground">
                    When enabled, other LPs can see your name, bio, expertise tags, and location in the LP directory.
                  </p>
                </div>
              </label>
              <div className="rounded-lg border p-4 bg-muted/50">
                <p className="text-sm font-medium mb-2">What&apos;s visible when your profile is public:</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>- Full name and location</li>
                  <li>- Bio and expertise tags</li>
                  <li>- &quot;Open to help with&quot; information</li>
                </ul>
                <p className="text-sm text-muted-foreground mt-2">
                  Your investment amounts and email are <span className="font-medium text-foreground">never</span> shared with other LPs.
                </p>
              </div>
              <div className="flex justify-end">
                <Button onClick={handleSavePrivacy} className="gap-2">
                  <Save className="h-4 w-4" />
                  Save Privacy Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Password */}
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                <CardTitle className="text-xl">Change Password</CardTitle>
              </div>
              <CardDescription>Update your account password</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="max-w-md space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Current Password</label>
                  <Input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter current password"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">New Password</label>
                  <Input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                  />
                  {newPassword && (
                    <div className="space-y-1">
                      <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                        <div
                          className={cn("h-full rounded-full transition-all", strength.color)}
                          style={{ width: strength.width }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Strength: <span className="font-medium">{strength.label}</span>
                      </p>
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Confirm New Password</label>
                  <Input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                  />
                  {confirmPassword && newPassword !== confirmPassword && (
                    <p className="text-xs text-red-500">Passwords do not match</p>
                  )}
                </div>
              </div>
              <Button onClick={handleChangePassword} variant="outline">
                Update Password
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
