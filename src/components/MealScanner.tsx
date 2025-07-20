
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/GlassCard';
import { toast } from '@/hooks/use-toast';
import { Camera, Upload, Loader2, X } from 'lucide-react';

interface NutritionData {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
  sodium: number;
  foods: string[];
}

interface MealScannerProps {
  onScanComplete?: (data: NutritionData) => void;
}

export const MealScanner = ({ onScanComplete }: MealScannerProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [nutritionData, setNutritionData] = useState<NutritionData | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          title: "File too large",
          description: "Please select an image smaller than 5MB",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setNutritionData(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeMeal = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    try {
      // Simulate AI analysis (replace with actual AI API call)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock nutrition data (replace with actual AI response)
      const mockData: NutritionData = {
        calories: 450,
        protein: 25,
        carbs: 40,
        fat: 18,
        fiber: 8,
        sugar: 12,
        sodium: 320,
        foods: ['Grilled Chicken Breast', 'Brown Rice', 'Steamed Broccoli', 'Olive Oil']
      };

      setNutritionData(mockData);
      onScanComplete?.(mockData);
      
      toast({
        title: "Meal analyzed successfully!",
        description: "Nutrition information has been calculated",
      });
    } catch (error) {
      toast({
        title: "Analysis failed",
        description: "Failed to analyze the meal. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const clearImage = () => {
    setSelectedImage(null);
    setNutritionData(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <GlassCard className="p-6">
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-2">Meal Scanner</h3>
          <p className="text-muted-foreground text-sm">
            Upload a photo of your meal to get detailed nutrition information
          </p>
        </div>

        {/* Main Content: Show either scanner or result */}
        {nutritionData ? (
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-stretch">
            {/* Left: Meal Image */}
            <div className="md:w-1/2 w-full flex flex-col items-center justify-center">
              <div className="relative w-full flex justify-center">
                <img
                  src={selectedImage!}
                  alt="Analyzed meal"
                  className="w-full max-w-xs h-56 object-cover rounded-lg shadow"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 md:static md:mt-4 md:self-end"
                  onClick={clearImage}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            {/* Right: Nutrition Details */}
            <div className="md:w-1/2 w-full flex flex-col justify-center">
              <h4 className="font-semibold text-lg mb-2">Nutrition Information</h4>
              {/* Detected Foods */}
              <div className="mb-2">
                <h5 className="font-medium mb-1">Detected Foods:</h5>
                <div className="flex flex-wrap gap-2 mb-2">
                  {nutritionData.foods.map((food, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm"
                    >
                      {food}
                    </span>
                  ))}
                </div>
              </div>
              {/* Nutrition Grid */}
              <div className="flex flex-row flex-wrap gap-3 w-full">
                <div className="text-center p-2 bg-muted/50 rounded-lg min-w-[90px]">
                  <div className="text-lg font-bold text-primary">{nutritionData.calories}</div>
                  <div className="text-xs text-muted-foreground">Calories</div>
                </div>
                <div className="text-center p-2 bg-muted/50 rounded-lg min-w-[90px]">
                  <div className="text-lg font-bold text-neon-blue">{nutritionData.protein}g</div>
                  <div className="text-xs text-muted-foreground">Protein</div>
                </div>
                <div className="text-center p-2 bg-muted/50 rounded-lg min-w-[90px]">
                  <div className="text-lg font-bold text-neon-green">{nutritionData.carbs}g</div>
                  <div className="text-xs text-muted-foreground">Carbs</div>
                </div>
                <div className="text-center p-2 bg-muted/50 rounded-lg min-w-[90px]">
                  <div className="text-lg font-bold text-coral-pink">{nutritionData.fat}g</div>
                  <div className="text-xs text-muted-foreground">Fat</div>
                </div>
                <div className="text-center p-2 bg-muted/50 rounded-lg min-w-[90px]">
                  <div className="text-lg font-bold text-accent">{nutritionData.fiber}g</div>
                  <div className="text-xs text-muted-foreground">Fiber</div>
                </div>
                <div className="text-center p-2 bg-muted/50 rounded-lg min-w-[90px]">
                  <div className="text-lg font-bold text-primary">{nutritionData.sugar}g</div>
                  <div className="text-xs text-muted-foreground">Sugar</div>
                </div>
                <div className="text-center p-2 bg-muted/50 rounded-lg min-w-[90px]">
                  <div className="text-lg font-bold text-primary">{nutritionData.sodium}mg</div>
                  <div className="text-xs text-muted-foreground">Sodium</div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Scanner UI
          <>
        {/* Image Upload Area */}
        <div className="space-y-4">
          {!selectedImage ? (
            <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-8 text-center">
              <Camera className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground mb-4">
                Take a photo or upload an image of your meal
              </p>
              <div className="flex gap-2 justify-center">
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Image
                </Button>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          ) : (
            <div className="relative">
              <img
                src={selectedImage}
                alt="Selected meal"
                className="w-full h-64 object-cover rounded-lg"
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2"
                onClick={clearImage}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Action Button */}
        {selectedImage && !nutritionData && (
          <Button
            className="w-full bg-gradient-to-r from-primary to-accent"
            onClick={analyzeMeal}
            disabled={isAnalyzing}
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Analyzing meal...
              </>
            ) : (
              'Analyze Nutrition'
            )}
          </Button>
        )}
          </>
        )}
      </div>
    </GlassCard>
  );
};
