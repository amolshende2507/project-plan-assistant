import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom'; // 👈 Import this
import { motion } from 'framer-motion';
import { Send, Link2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ProjectInput, SkillLevel, TeamSize, Platform } from '@/types/analyzer';
import { defaultInput } from '@/data/mockData';


interface InputFormProps {
  onSubmit: (input: ProjectInput) => void;
  isLoading?: boolean;
}

export function InputForm({ onSubmit, isLoading }: InputFormProps) {
  const [formData, setFormData] = useState<ProjectInput>(defaultInput);
  const [searchParams, setSearchParams] = useSearchParams();

  // 1. Load Data from URL on Mount
  useEffect(() => {
    const idea = searchParams.get('idea');
    if (idea) {
      setFormData({
        projectIdea: idea,
        skillLevel: (searchParams.get('skill') as SkillLevel) || 'intermediate',
        teamSize: (searchParams.get('team') as TeamSize) || 'solo',
        totalWeeks: parseInt(searchParams.get('weeks') || '4'),
        hoursPerWeek: parseInt(searchParams.get('hours') || '20'),
        platform: (searchParams.get('platform') as Platform) || 'web',
        useAI: searchParams.get('ai') === 'true'
      });
    }
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-card rounded-lg border border-border shadow-card p-6"
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-1">
        <h2 className="font-semibold text-lg text-foreground">Project Details</h2>
        {/* Shareable indicator */}
        <div className="bg-primary/10 p-1.5 rounded-full">
          <Link2 className="h-3 w-3 text-primary" />
        </div>
      </div>

      <p className="text-sm text-muted-foreground mb-6">
        Provide your project constraints for accurate analysis
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Project Idea */}
        <div className="space-y-2">
          <Label htmlFor="projectIdea">Project Idea</Label>
          <Textarea
            id="projectIdea"
            placeholder="Describe your project in a few sentences..."
            value={formData.projectIdea}
            onChange={(e) =>
              setFormData({ ...formData, projectIdea: e.target.value })
            }
            className="min-h-[100px] resize-none"
          />
        </div>

        {/* Skill Level */}
        <div className="space-y-3">
          <Label>Skill Level</Label>
          <RadioGroup
            value={formData.skillLevel}
            onValueChange={(value: SkillLevel) =>
              setFormData({ ...formData, skillLevel: value })
            }
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="beginner" id="beginner" />
              <Label
                htmlFor="beginner"
                className="font-normal cursor-pointer"
              >
                Beginner
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="intermediate" id="intermediate" />
              <Label
                htmlFor="intermediate"
                className="font-normal cursor-pointer"
              >
                Intermediate
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Team Size */}
        <div className="space-y-3">
          <Label>Team Size</Label>
          <RadioGroup
            value={formData.teamSize}
            onValueChange={(value: TeamSize) =>
              setFormData({ ...formData, teamSize: value })
            }
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="solo" id="solo" />
              <Label htmlFor="solo" className="font-normal cursor-pointer">
                Solo
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="small-team" id="small-team" />
              <Label
                htmlFor="small-team"
                className="font-normal cursor-pointer"
              >
                Small Team
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Time Availability */}
        <div className="space-y-3">
          <Label>Time Availability</Label>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="totalWeeks"
                className="text-xs text-muted-foreground"
              >
                Total Weeks
              </Label>
              <Input
                id="totalWeeks"
                type="number"
                min={1}
                max={52}
                value={formData.totalWeeks}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    totalWeeks: parseInt(e.target.value) || 1,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="hoursPerWeek"
                className="text-xs text-muted-foreground"
              >
                Hours/Week
              </Label>
              <Input
                id="hoursPerWeek"
                type="number"
                min={1}
                max={60}
                value={formData.hoursPerWeek}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    hoursPerWeek: parseInt(e.target.value) || 1,
                  })
                }
              />
            </div>
          </div>
        </div>

        {/* Optional Constraints */}
        <div className="space-y-3 pt-4 border-t border-border">
          <Label className="text-muted-foreground">
            Optional Constraints
          </Label>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="platform"
                className="text-xs text-muted-foreground"
              >
                Platform
              </Label>
              <Select
                value={formData.platform}
                onValueChange={(value: Platform) =>
                  setFormData({ ...formData, platform: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="web">Web</SelectItem>
                  <SelectItem value="mobile">Mobile</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label className="text-xs text-muted-foreground">
                AI Usage
              </Label>
              <RadioGroup
                value={formData.useAI ? "yes" : "no"}
                onValueChange={(value) =>
                  setFormData({
                    ...formData,
                    useAI: value === "yes",
                  })
                }
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="ai-yes" />
                  <Label
                    htmlFor="ai-yes"
                    className="font-normal cursor-pointer text-sm"
                  >
                    Yes
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="ai-no" />
                  <Label
                    htmlFor="ai-no"
                    className="font-normal cursor-pointer text-sm"
                  >
                    No
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          className="w-full gap-2 h-12 text-lg font-medium shadow-md hover:shadow-lg transition-all"
          size="lg"
          disabled={!formData.projectIdea.trim() || isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span className="animate-pulse">Reasoning...</span>
            </>
          ) : (
            <>
              Analyze Project <Send className="h-4 w-4 ml-1" />
            </>
          )}
        </Button>

      </form>
    </motion.div>
  );
}