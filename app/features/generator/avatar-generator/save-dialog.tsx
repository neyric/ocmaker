import { zodResolver } from "@hookform/resolvers/zod";
import { Download, Eye, Save, Share2, Sparkles, X, Zap } from "lucide-react";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import type { Character } from "~/.server/libs/db";
import { Image, Link } from "~/components/common";
import { SharePopover } from "~/features/share";
import { type SaveCharacterDTO, saveCharacterSchema } from "~/schema/character";

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

export interface SaveCharacterDialogRef {
  open: (info: SaveCharacterInfo) => void;
}

export const SaveCharacterDialog = forwardRef<
  SaveCharacterDialogRef
>((_, ref) => {
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

  const {
    handleSubmit,
    reset,
    setValue,
    getValues,
    watch,
    register,
    control,
    formState: { errors, isSubmitting },
  } = form;

  const tags = (watch("tags") as string[] | undefined) ?? [];

  useEffect(() => {
    register("tags");
    register("task_no");
  }, [register]);

  // Expose methods to parent component
  useImperativeHandle(ref, () => ({
    open: (info: SaveCharacterInfo) => {
      setSelectedTask(info.task);
      reset({
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
    const currentTags = getValues("tags") as string[] | undefined;
    if (tagInput.trim() && !currentTags?.includes(tagInput.trim())) {
      setValue("tags", [...(currentTags ?? []), tagInput.trim()], {
        shouldDirty: true,
        shouldValidate: true,
      });
      setTagInput("");
    }
  };

  // Remove tag
  const removeTag = (tagToRemove: string) => {
    const currentTags = getValues("tags") as string[] | undefined;
    const updatedTags = (currentTags ?? []).filter(
      (tag) => tag !== tagToRemove,
    );
    setValue(
      "tags",
      updatedTags,
      {
        shouldDirty: true,
        shouldValidate: true,
      },
    );
  };

  // Close save modal
  const closeSaveModal = () => {
    setShowModal(false);
    setSelectedTask(null);
    reset();
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
      {showModal && selectedTask && (
        <div
          className="modal modal-open"
          role="dialog"
          aria-modal="true"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              closeSaveModal();
            }
          }}
        >
          <div className="modal-box w-11/12 max-w-6xl p-0 !overflow-hidden bg-base-100 text-base-content">
            <div className="relative h-[96vh] overflow-hidden">
              <button
                type="button"
                className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 z-10"
                onClick={closeSaveModal}
                disabled={isSubmitting}
                aria-label="Close save dialog"
              >
                <X className="size-4" />
              </button>
              <div className="md:grid md:grid-cols-2 h-full overflow-y-auto">
                <div className="bg-base-200 flex flex-col items-center justify-center p-4">
                  {selectedTask.result_url ? (
                    <div
                      className="w-full"
                      style={{
                        aspectRatio:
                          selectedTask.aspect
                            ? selectedTask.aspect.replace(":", "/")
                            : "1/1",
                      }}
                    >
                      <Image
                        src={selectedTask.result_url}
                        alt="Save Character Preview"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  ) : (
                    <div className="text-base-content/60 text-sm">
                      Preview unavailable
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-4 p-4 md:p-6 md:pt-12 box-border md:relative overflow-y-auto">
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-4 pb-24"
                  >
                    <div className="mb-2">
                      <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Save className="size-6" />
                        Save Character to Portfolio
                      </h2>
                      <p className="text-sm text-base-content/70 mt-2">
                        Add a name and description for your character, set privacy options
                      </p>
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text text-base font-medium">
                          Character Name *
                        </span>
                      </label>
                      <input
                        type="text"
                        placeholder="Give your character a name..."
                        className="input input-bordered h-10 w-full"
                        {...register("name")}
                      />
                      {errors.name?.message && (
                        <span className="text-error text-sm mt-1">
                          {errors.name.message}
                        </span>
                      )}
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text text-base font-medium">
                          Character Description
                        </span>
                      </label>
                      <textarea
                        placeholder="Describe your character..."
                        className="textarea textarea-bordered min-h-32 w-full resize-none"
                        {...register("description")}
                      />
                      {errors.description?.message && (
                        <span className="text-error text-sm mt-1">
                          {errors.description.message}
                        </span>
                      )}
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text text-base font-medium">
                          Tags
                        </span>
                      </label>
                      <div className="flex flex-col gap-2">
                        <div className="flex flex-wrap gap-2 sm:flex-nowrap">
                          <input
                            type="text"
                            placeholder="Add tags..."
                            className="input input-bordered h-10 flex-1 min-w-0"
                            value={tagInput}
                            onChange={(event) => setTagInput(event.target.value)}
                            onKeyDown={(event) => {
                              if (event.key === "Enter") {
                                event.preventDefault();
                                addTag();
                              }
                            }}
                          />
                          <button
                            type="button"
                            className="btn btn-outline h-10 min-w-[5.5rem]"
                            onClick={addTag}
                            disabled={!tagInput.trim()}
                          >
                            Add
                          </button>
                        </div>
                        {tags.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {tags.map((tag) => (
                              <button
                                type="button"
                                key={tag}
                                className="badge badge-neutral gap-2 px-3 cursor-pointer transition-colors hover:bg-base-300"
                                onClick={() => removeTag(tag)}
                              >
                                <span>{tag}</span>
                                <X className="size-3" />
                              </button>
                            ))}
                          </div>
                        )}
                        {errors.tags?.message && (
                          <span className="text-error text-sm">
                            {errors.tags.message}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-4 rounded-xl border border-base-300 bg-base-200/60 p-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-base font-medium">
                            Private Character
                            {!canCreatePrivateCharacter && (
                              <span className="badge badge-outline badge-sm uppercase tracking-wide">
                                Premium Feature
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-base-content/70">
                            {canCreatePrivateCharacter
                              ? "When enabled, only you can see this character"
                              : "Upgrade to premium to set private characters"}
                          </p>
                        </div>
                        <Controller
                          control={control}
                          name="isPrivate"
                          render={({ field }) => (
                            <input
                              type="checkbox"
                              className="toggle toggle-primary"
                              checked={!!field.value}
                              onChange={(event) => field.onChange(event.target.checked)}
                              disabled={!canCreatePrivateCharacter}
                            />
                          )}
                        />
                      </div>
                      {errors.isPrivate?.message && (
                        <span className="text-error text-sm">
                          {errors.isPrivate.message}
                        </span>
                      )}
                    </div>

                    <div className="h-16" />
                    <div className="absolute bottom-0 inset-x-0 border-t border-base-200 h-16 px-4 flex items-center bg-base-100">
                      <div className="flex gap-3 w-full">
                        <button
                          type="button"
                          className="btn btn-outline flex-1 md:flex-initial gap-2"
                          onClick={closeSaveModal}
                          disabled={isSubmitting}
                        >
                          Cancel
                        </button>
                        <div className="grow hidden md:block" />
                        <button
                          type="submit"
                          className="btn btn-primary flex-1 md:flex-initial gap-2"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <Sparkles className="size-4 animate-spin" />
                              <span>Saving...</span>
                            </>
                          ) : (
                            <>
                              <Save className="size-4" />
                              <span>Save Character</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showSuccessDialog && savedCharacterTask && (
        <div
          className="modal modal-open"
          role="dialog"
          aria-modal="true"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setShowSuccessDialog(false);
            }
          }}
        >
          <div className="modal-box w-11/12 max-w-6xl p-0 !overflow-hidden bg-base-100 text-base-content">
            <div className="relative h-[96vh] overflow-hidden">
              <button
                type="button"
                className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 z-10"
                onClick={() => setShowSuccessDialog(false)}
                aria-label="Close success dialog"
              >
                <X className="size-4" />
              </button>
              <div className="md:grid md:grid-cols-2 h-full overflow-y-auto">
                <div className="bg-base-200 flex flex-col items-center justify-center p-4">
                  {savedCharacterTask.image_url ? (
                    <div
                      className="w-full"
                      style={{
                        aspectRatio:
                          savedCharacterTask.aspect
                            ? savedCharacterTask.aspect.replace(":", "/")
                            : "1/1",
                      }}
                    >
                      <Image
                        src={savedCharacterTask.image_url}
                        alt="Saved Character"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  ) : (
                    <div className="text-base-content/60 text-sm">
                      Preview unavailable
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-4 p-4 md:p-6 md:pt-12 box-border md:relative overflow-y-auto">
                  <div className="space-y-4">
                    <div className="text-center md:text-left">
                      <h2 className="text-3xl font-bold text-success flex items-center gap-2 justify-center md:justify-start">
                        <Sparkles className="size-8" />
                        Character Saved Successfully!
                      </h2>
                      <p className="text-base text-base-content/70 leading-relaxed mt-3">
                        Congratulations! You have successfully created a character in OC Maker. Next, you can choose to:
                      </p>
                    </div>

                    <div className="flex flex-col gap-3 mt-6">
                      <Link
                        to={`/characters/${savedCharacterTask.id}`}
                        target="_blank"
                        className="btn btn-outline btn-lg w-full justify-center gap-2"
                      >
                        <Eye className="size-5" />
                        View Character Page
                      </Link>

                      <button
                        type="button"
                        onClick={handleDownloadImage}
                        className="btn btn-outline btn-lg w-full justify-center gap-2"
                      >
                        <Download className="size-5" />
                        Download Image
                      </button>

                      <SharePopover
                        shareUrl={shareUrl ?? ""}
                        shareImage={savedCharacterTask.image_url}
                      >
                        <button
                          type="button"
                          className="btn btn-outline btn-lg w-full justify-center gap-2"
                        >
                          <Share2 className="size-5" />
                          Share Character
                        </button>
                      </SharePopover>
                    </div>

                    <div className="pt-6 border-t border-base-200 space-y-3">
                      <p className="text-sm text-base-content/60 text-center md:text-left">
                        Or continue generating other OCs!
                      </p>
                      <button
                        type="button"
                        onClick={handleContinueGenerate}
                        className="btn btn-primary btn-lg w-full justify-center gap-2"
                      >
                        <Zap className="size-5" />
                        Continue Generating
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
});

SaveCharacterDialog.displayName = "SaveCharacterDialog";
