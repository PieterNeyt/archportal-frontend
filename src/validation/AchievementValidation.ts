import { z } from "zod";

export const achievementSchema = z.object({
    externalAchId:z.string().min(1,"Achievement ID is required"),
    title: z.string()
        .min(1, "Title is required")
        .max(100, "Title cannot exceed 100 characters"),
    description: z.string()
        .min(1, "Description is required")
        .max(255, "Description cannot exceed 255 characters"),
    imageUrl: z.httpUrl("Must be a valid URL")
        .min(1, "Image URL is required"),
});

export type AchievementFormValues = z.infer<typeof achievementSchema>;