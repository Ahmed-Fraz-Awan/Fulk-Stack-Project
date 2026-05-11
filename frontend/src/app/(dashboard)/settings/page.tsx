"use client";

import * as React from "react";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

export default function SettingsPage() {
  const { data: session } = useSession();
  const [name, setName] = React.useState(session?.user?.name || "");
  const [email, setEmail] = React.useState(session?.user?.email || "");
  const [prefs, setPrefs] = React.useState({
    weeklyDigest: true,
    burnoutAlerts: true,
    studyReminders: false,
    moodNudges: true,
  });

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <p className="text-xs uppercase tracking-widest text-muted-foreground">
          Settings
        </p>
        <h1 className="font-display text-3xl md:text-4xl font-bold mt-1">
          Account & preferences
        </h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="sm:col-span-2 flex justify-end">
            <Button
              variant="gradient"
              onClick={() => toast.success("Profile saved")}
            >
              Save profile
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          {[
            { key: "weeklyDigest", label: "Weekly digest", hint: "Mondays at 9 AM" },
            { key: "burnoutAlerts", label: "Burnout alerts", hint: "When risk exceeds 60%" },
            { key: "studyReminders", label: "Study reminders", hint: "30 min before scheduled deep work" },
            { key: "moodNudges", label: "Mood check‑in", hint: "Once per evening" },
          ].map((row) => (
            <div
              key={row.key}
              className="flex items-center justify-between py-3"
            >
              <div>
                <p className="text-sm font-medium">{row.label}</p>
                <p className="text-xs text-muted-foreground">{row.hint}</p>
              </div>
              <Switch
                checked={(prefs as any)[row.key]}
                onCheckedChange={(v) =>
                  setPrefs((p) => ({ ...p, [row.key]: v }))
                }
              />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>AI Twin</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium">Model version</p>
              <p className="text-xs text-muted-foreground">
                Last retrained today at 06:00
              </p>
            </div>
            <Badge variant="success">v2.0.3 · stable</Badge>
          </div>
          <Separator />
          <div className="flex justify-between gap-3">
            <Button variant="outline">Retrain twin</Button>
            <Button variant="destructive">Reset twin data</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
