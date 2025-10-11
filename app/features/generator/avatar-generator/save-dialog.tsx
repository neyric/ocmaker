import { zodResolver } from "@hookform/resolvers/zod";
import { Download, Eye, Save, Share2, Sparkles, X, Zap } from "lucide-react";
import { forwardRef, useImperativeHandle, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { Character } from "~/.server/libs/db";
import { Image, Link } from "~/components/common";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Dialog, DialogContent } from "~/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Switch } from "~/components/ui/switch";
import { Textarea } from "~/components/ui/textarea";
import { saveCharacterDialogTexts } from "~/routes/base/_._index/contents";
import { type SaveCharacterDTO, saveCharacterSchema } from "~/schema/character";
import { SharePopover } from "../share";

type SaveCharacterFormData = SaveCharacterDTO;

interface Task {
  task_no: string;
  status: "running" | "failed" | "pending" | "succeeded";
  aspect: string;
  result_url?: string | null;
  fail_reason?: string | null;
}

interface SaveCharacterInfo {
  task: Task;
  initialDescription: string;
}

export interface SaveCharacterDialogTexts {
  title: string;
  description: string;
  characterName: string;
  characterNameRequired: string;
  characterNamePlaceholder: string;
  characterDescription: string;
  characterDescriptionPlaceholder: string;
  tags: string;
  addTagPlaceholder: string;
  addButton: string;
  privateCharacter: string;
  premiumFeature: string;
  privateDescription: string;
  upgradeDescription: string;
  cancel: string;
  saveCharacter: string;
  saving: string;
  saveSuccessMessage: string;
  saveFailedMessage: string;
}

export interface SaveCharacterDialogRef {
  open: (info: SaveCharacterInfo) => void;
}

interface SaveCharacterDialogProps {
  texts?: SaveCharacterDialogTexts;
}

export const SaveCharacterDialog = forwardRef<
  SaveCharacterDialogRef,
  SaveCharacterDialogProps
>(({ texts = saveCharacterDialogTexts }, ref) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [tagInput, setTagInput] = useState("");

  // Alert dialog states
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [savedCharacterTask, setSavedCharacterTask] =
    useState<Character | null>(null);

  const canCreatePrivateCharacter = false;

  const shareUrl = useMemo(() => {
    if (!globalThis.window) return null;
    if (!savedCharacterTask) return null;
    return new URL(
      `/characters/${savedCharacterTask.id}`,
      location.origin,
    ).toString();
  }, [savedCharacterTask]);

  // Form setup
  const form = useForm({
    resolver: zodResolver(saveCharacterSchema),
    defaultValues: {
      task_no: "",
      name: "",
      description: "",
      isPrivate: false,
      tags: [],
    },
  });

  // Expose methods to parent component
  useImperativeHandle(ref, () => ({
    open: (info: SaveCharacterInfo) => {
      setSelectedTask(info.task);
      form.reset({
        task_no: info.task.task_no,
        name: "",
        description: info.initialDescription,
        isPrivate: false,
        tags: [],
      });
      setShowModal(true);
    },
  }));

  // Add tag
  const addTag = () => {
    const currentTags = form.getValues("tags");
    if (tagInput.trim() && !currentTags?.includes(tagInput.trim())) {
      form.setValue("tags", [...(currentTags ?? []), tagInput.trim()]);
      setTagInput("");
    }
  };

  // Remove tag
  const removeTag = (tagToRemove: string) => {
    const currentTags = form.getValues("tags");
    form.setValue(
      "tags",
      currentTags?.filter((tag) => tag !== tagToRemove) ?? [],
    );
  };

  // Close save modal
  const closeSaveModal = () => {
    setShowModal(false);
    setSelectedTask(null);
    form.reset();
    setTagInput("");
  };

  // Save character
  const onSubmit = async (data: SaveCharacterFormData) => {
    if (!selectedTask) return;

    try {
      const response = await fetch("/api/save-character", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      const result = await response.json<{
        success: boolean;
        message?: string;
        character: Character;
      }>();

      if (result.success) {
        // Save successful, show success page
        setSavedCharacterTask(result.character);
        setShowSuccessDialog(true);
        closeSaveModal();
        toast.success("Character saved successfully!");
      } else {
        throw new Error(result.message || "Save failed");
      }
    } catch (error) {
      console.error("Save failed:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Save failed, please try again later",
      );
    }
  };

  const handleDownloadImage = () => {
    if (!savedCharacterTask) return;

    // TODO: Implement download image logic
    if (savedCharacterTask.image_url) {
      const link = document.createElement("a");
      link.target = "_blank";
      link.href = savedCharacterTask.image_url;
      link.download = `character-${savedCharacterTask.name}.png`;

      link.click();
    }
  };
  const handleContinueGenerate = () => {
    // Close success dialog and continue generating
    setShowSuccessDialog(false);
    setSavedCharacterTask(null);
  };

  return (
    <>
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-11/12 md:max-w-3xl lg:max-w-5xl xl:max-w-6xl h-[96vh] overflow-y-auto p-0 border-none">
          <div className="h-[96vh] overflow-hidden relative">
            {selectedTask && (
              <div className="md:grid md:grid-cols-2 h-full overflow-y-auto">
                {/* 左侧 - 预览图片 */}
                <div className="bg-gray-100 flex flex-col items-center justify-center">
                  {selectedTask.result_url && (
                    <div
                      style={{
                        aspectRatio:
                          selectedTask.aspect.replace(":", "/") || "1/1",
                      }}
                    >
                      <Image
                        src={selectedTask.result_url}
                        alt="Save Character Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>

                {/* 右侧 - 表单内容 */}
                <div className="flex flex-col gap-4 p-4 md:p-6 md:pt-12 box-border md:relative">
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-4"
                    >
                      {/* 标题 */}
                      <div className="mb-4">
                        <h2 className="text-2xl font-bold flex items-center gap-2">
                          <Save className="w-6 h-6" />
                          {texts.title}
                        </h2>
                        <p className="text-sm text-gray-600 mt-2">
                          {texts.description}
                        </p>
                      </div>

                      {/* 角色名称 */}
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-medium">
                              {texts.characterNameRequired}
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder={texts.characterNamePlaceholder}
                                className="h-10"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* 角色描述 */}
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-medium">
                              {texts.characterDescription}
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder={
                                  texts.characterDescriptionPlaceholder
                                }
                                className="min-h-32 resize-none"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* 标签输入 */}
                      <FormField
                        control={form.control}
                        name="tags"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-medium">
                              {texts.tags}
                            </FormLabel>
                            <FormControl>
                              <div>
                                <div className="flex gap-2">
                                  <Input
                                    placeholder={texts.addTagPlaceholder}
                                    value={tagInput}
                                    onChange={(e) =>
                                      setTagInput(e.target.value)
                                    }
                                    onKeyDown={(e) => {
                                      if (e.key === "Enter") {
                                        e.preventDefault();
                                        addTag();
                                      }
                                    }}
                                    className="h-10"
                                  />
                                  <Button
                                    type="button"
                                    variant="outline"
                                    onClick={addTag}
                                    disabled={!tagInput.trim()}
                                    className="h-10 px-4"
                                  >
                                    {texts.addButton}
                                  </Button>
                                </div>
                                {/* 显示已添加的标签 */}
                                {(field.value?.length ?? 0) > 0 && (
                                  <div className="flex flex-wrap gap-2 mt-2">
                                    {field.value!.map((tag, index) => (
                                      <Badge
                                        key={index}
                                        asChild
                                        variant="secondary"
                                        className="flex items-center gap-1 cursor-pointer hover:bg-gray-200"
                                      >
                                        <div
                                          onClick={() => {
                                            removeTag(tag);
                                          }}
                                        >
                                          <span>{tag}</span>
                                          <X className="w-3 h-3 cursor-pointer hover:text-red-500 ml-1" />
                                        </div>
                                      </Badge>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* 私密角色开关 */}
                      <FormField
                        control={form.control}
                        name="isPrivate"
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
                              <div className="space-y-1">
                                <FormLabel className="text-base font-medium flex items-center gap-2">
                                  {texts.privateCharacter}
                                  {!canCreatePrivateCharacter && (
                                    <Badge
                                      variant="outline"
                                      className="text-xs"
                                    >
                                      {texts.premiumFeature}
                                    </Badge>
                                  )}
                                </FormLabel>
                                <FormDescription className="text-sm text-gray-600">
                                  {canCreatePrivateCharacter
                                    ? texts.privateDescription
                                    : texts.upgradeDescription}
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value as boolean}
                                  onCheckedChange={field.onChange}
                                  disabled={!canCreatePrivateCharacter}
                                />
                              </FormControl>
                            </div>
                          </FormItem>
                        )}
                      />

                      {/* 底部操作按钮 */}
                      <div className="h-16" />
                      <div className="absolute bottom-0 inset-x-0 border-t border-neutral-200 h-16 px-4 flex items-center bg-white">
                        <div className="flex gap-3 w-full">
                          <Button
                            type="button"
                            variant="outline"
                            size="lg"
                            onClick={closeSaveModal}
                            disabled={form.formState.isSubmitting}
                            className="flex-1 md:flex-initial"
                          >
                            {texts.cancel}
                          </Button>
                          <div className="grow hidden md:block" />
                          <Button
                            type="submit"
                            size="lg"
                            disabled={form.formState.isSubmitting}
                            className="flex-1 md:flex-initial"
                          >
                            {form.formState.isSubmitting ? (
                              <>
                                <Sparkles className="w-4 h-4 animate-spin mr-2" />
                                {texts.saving}
                              </>
                            ) : (
                              <>
                                <Save className="w-4 h-4 mr-2" />
                                {texts.saveCharacter}
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </form>
                  </Form>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="max-w-11/12 md:max-w-3xl lg:max-w-5xl xl:max-w-6xl h-[96vh] overflow-y-auto p-0 border-none">
          <div className="h-[96vh] overflow-hidden relative">
            {savedCharacterTask && (
              <div className="md:grid md:grid-cols-2 h-full overflow-y-auto">
                {/* 左侧 - 图片预览 */}
                <div className="bg-gray-100 flex flex-col items-center justify-center">
                  {savedCharacterTask.image_url && (
                    <div
                      style={{
                        aspectRatio:
                          savedCharacterTask.aspect?.replace(":", "/") || "1/1",
                      }}
                    >
                      <Image
                        src={savedCharacterTask.image_url}
                        alt="Saved Character"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>

                {/* 右侧 - 成功信息 */}
                <div className="flex flex-col gap-4 p-4 md:p-6 md:pt-12 box-border md:relative">
                  <div className="space-y-4">
                    <div className="text-center md:text-left">
                      <h2 className="text-3xl font-bold text-green-600 mb-3 flex items-center gap-2 justify-center md:justify-start">
                        <Sparkles className="w-8 h-8" />
                        Character Saved Successfully!
                      </h2>
                      <p className="text-gray-600 text-base leading-relaxed">
                        Congratulations! You have successfully created a
                        character in OC Maker. Next, you can choose to:
                      </p>
                    </div>

                    <div className="flex flex-col gap-3 mt-6">
                      <Button size="lg" variant="outline" asChild>
                        <Link
                          to={`/characters/${savedCharacterTask.id}`}
                          target="_blank"
                          className="w-full"
                        >
                          <Eye className="w-5 h-5" />
                          View Character Page
                        </Link>
                      </Button>

                      <Button
                        onClick={handleDownloadImage}
                        size="lg"
                        variant="outline"
                        className="w-full"
                      >
                        <Download className="w-5 h-5" />
                        Download Image
                      </Button>

                      <SharePopover
                        shareUrl={shareUrl ?? ""}
                        shareImage={savedCharacterTask.image_url}
                      >
                        <Button variant="outline" size="lg" className="w-full">
                          <Share2 className="w-5 h-5" />
                          Share Character
                        </Button>
                      </SharePopover>
                    </div>

                    <div className="pt-6 border-t border-gray-200">
                      <p className="text-sm text-gray-500 text-center md:text-left mb-3">
                        Or continue generating other OCs!
                      </p>
                      <Button
                        onClick={handleContinueGenerate}
                        className="w-full h-12"
                        variant="default"
                        size="lg"
                      >
                        <Zap className="w-5 h-5" />
                        Continue Generating
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
});

SaveCharacterDialog.displayName = "SaveCharacterDialog";
