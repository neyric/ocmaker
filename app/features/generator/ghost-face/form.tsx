import { Image } from "~/components/common";
import { useTranslate } from "~/i18n";
import { type FotoProfissionalItem } from "./index";
import type { FormMethod } from "./use-form";

interface FotoProfissionalFormProps {
  form: FormMethod;
  fotoProfissionalList: FotoProfissionalItem[];
  onCancel: () => void;
  onSubmit: () => void;
}

export function FotoProfissionalForm({
  form,
  fotoProfissionalList,
  onCancel,
  onSubmit,
}: FotoProfissionalFormProps) {
  const t = useTranslate();
  const selectedStyles = form.watch("effectIds") ?? [];

  const handleToggle = (id: string) => {
    const selList = form.getValues("effectIds") ?? [];
    const isSelect = selList.includes(id);
    if (isSelect) form.setValue("effectIds", []);
    else form.setValue("effectIds", [id]);
  };

  return (
    <div className="max-h-[80vh] overflow-y-auto relative">
      <div className="sticky bg-base-100 z-20 top-0 inset-x-0 p-4 border-b border-grid-border">
        <h2 className="font-medium">
          {t("generator.fotoProfissional.form.title")}
        </h2>
        <p className="text-sm text-base-content/60">
          {t("generator.fotoProfissional.form.description")}
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 p-4">
        {fotoProfissionalList.map((item) => {
          const isSelected = selectedStyles.includes(item.id);
          return (
            <div className="cursor-pointer" key={item.id}>
              <div
                className="w-full aspect-[3/4] bg-base-300 rounded-box overflow-hidden relative"
                onClick={() => handleToggle(item.id)}
              >
                <div className="absolute top-2 right-2 z-[1]">
                  <input
                    type="checkbox"
                    name="hairstyles"
                    className="checkbox checkbox-xs block checked:checkbox-primary"
                    checked={isSelected}
                    onChange={() => handleToggle(item.id)}
                  />
                </div>
                <Image
                  className="w-full h-full object-cover"
                  loading="lazy"
                  src={item.image}
                  wsrv={{ output: "webp", h: 400 }}
                  alt="Gemini Ghost Face AI Example"
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex sticky z-1 bottom-0 inset-x-0 bg-base-100 justify-between items-center pt-4 border-t border-grid-border p-4">
        <button type="button" onClick={onCancel} className="btn">
          {t("generator.fotoProfissional.form.button.cancel")}
        </button>
        <button
          onClick={onSubmit}
          disabled={selectedStyles.length === 0}
          className="btn btn-primary"
        >
          {t("generator.fotoProfissional.form.button.confirm")}
        </button>
      </div>
    </div>
  );
}
