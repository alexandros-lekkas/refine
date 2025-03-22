"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import {
  Eye,
  EyeOff,
  Zap,
  Brain,
  Keyboard,
  Moon,
  Sun,
  CircleSlash,
  Image,
  FileText,
  BookOpen,
  Link2,
  Sparkles,
  Focus,
  MousePointerClick,
  Hand,
  Type,
  AlignCenter,
  AlignLeft,
  Droplet,
  Palette,
  RotateCcw,
  MessageSquare,
} from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="max-w-[1600px] mx-auto px-6 py-6 space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">
            Customize your experience with accessibility options
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <RotateCcw className="h-4 w-4" />
            Reset Settings
          </Button>
          <Button variant="outline" className="gap-2">
            <MessageSquare className="h-4 w-4" />
            Statement
          </Button>
          <Button variant="outline" className="gap-2">
            <Eye className="h-4 w-4" />
            Hide Interface
          </Button>
        </div>
      </div>

      {/* Profiles Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Accessibility Profiles</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="p-6 space-y-4">
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <h3 className="font-medium">Seizure Safe Profile</h3>
                <p className="text-sm text-muted-foreground">Clear flashes & reduces color</p>
              </div>
              <Switch />
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <h3 className="font-medium">Vision Impaired Profile</h3>
                <p className="text-sm text-muted-foreground">Enhances website's visuals</p>
              </div>
              <Switch />
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <h3 className="font-medium">ADHD Friendly Profile</h3>
                <p className="text-sm text-muted-foreground">More focus & fewer distractions</p>
              </div>
              <Switch />
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <h3 className="font-medium">Cognitive Disability Profile</h3>
                <p className="text-sm text-muted-foreground">Assists with reading & focusing</p>
              </div>
              <Switch />
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <h3 className="font-medium">Keyboard Navigation</h3>
                <p className="text-sm text-muted-foreground">Use website with the keyboard</p>
              </div>
              <Switch />
            </div>
          </Card>
        </div>
      </div>

      {/* Content Adjustments */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Content Adjustments</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="p-6 space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium flex items-center gap-2">
                  <Type className="h-4 w-4" />
                  Content Scaling
                </h3>
              </div>
              <Slider defaultValue={[100]} max={200} step={10} />
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium flex items-center gap-2">
                <Type className="h-4 w-4" />
                Readable Font
              </h3>
              <Switch />
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium flex items-center gap-2">
                <Type className="h-4 w-4" />
                Highlight Titles
              </h3>
              <Switch />
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium flex items-center gap-2">
                <Link2 className="h-4 w-4" />
                Highlight Links
              </h3>
              <Switch />
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium flex items-center gap-2">
                <Focus className="h-4 w-4" />
                Text Magnifier
              </h3>
              <Switch />
            </div>
          </Card>
        </div>
      </div>

      {/* Color Adjustments */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Color Adjustments</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium flex items-center gap-2">
                <Moon className="h-4 w-4" />
                Dark Contrast
              </h3>
              <Switch />
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium flex items-center gap-2">
                <Sun className="h-4 w-4" />
                Light Contrast
              </h3>
              <Switch />
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium flex items-center gap-2">
                <Zap className="h-4 w-4" />
                High Contrast
              </h3>
              <Switch />
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium flex items-center gap-2">
                <Droplet className="h-4 w-4" />
                High Saturation
              </h3>
              <Switch />
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium flex items-center gap-2">
                <Palette className="h-4 w-4" />
                Monochrome
              </h3>
              <Switch />
            </div>
          </Card>
        </div>
      </div>

      {/* Orientation Adjustments */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Orientation Adjustments</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium flex items-center gap-2">
                <CircleSlash className="h-4 w-4" />
                Mute Sounds
              </h3>
              <Switch />
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium flex items-center gap-2">
                <Image className="h-4 w-4" />
                Hide Images
              </h3>
              <Switch />
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Read Mode
              </h3>
              <Switch />
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Reading Guide
              </h3>
              <Switch />
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Stop Animations
              </h3>
              <Switch />
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium flex items-center gap-2">
                <MousePointerClick className="h-4 w-4" />
                Big Black Cursor
              </h3>
              <Switch />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
} 