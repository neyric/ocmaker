import { z } from "zod";

// 保存角色的schema
export const saveCharacterSchema = z.object({
  task_no: z.string().min(1, "Task number is required"),
  name: z
    .string()
    .min(1, "Character name is required")
    .max(100, "Character name too long"),
  description: z.string().max(1000, "Description too long").optional(),
  isPrivate: z.coerce.boolean().default(false),
  tags: z
    .array(z.string().max(20, "Tag too long"))
    .max(10, "Too many tags")
    .default([]),
});

export type SaveCharacterDTO = z.infer<typeof saveCharacterSchema>;

// 更新角色的schema
export const updateCharacterSchema = z.object({
  name: z
    .string()
    .min(1, "Character name is required")
    .max(100, "Character name too long")
    .optional(),
  description: z.string().max(1000, "Description too long").optional(),
  is_public: z.coerce.boolean().optional(),
  category: z.string().max(50, "Category too long").optional(),
  tags: z
    .array(z.string().max(20, "Tag too long"))
    .max(10, "Too many tags")
    .optional(),
});

export type UpdateCharacterDTO = z.infer<typeof updateCharacterSchema>;

// 获取角色列表的查询参数schema
export const getCharactersQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  pageSize: z.coerce.number().min(1).max(100).default(50),
  category: z.string().optional(),
  includePrivate: z.coerce.boolean().default(false),
});

export type GetCharactersQueryDTO = z.infer<typeof getCharactersQuerySchema>;
