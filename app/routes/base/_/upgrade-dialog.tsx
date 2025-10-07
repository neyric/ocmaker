import { useMutation } from "@tanstack/react-query";
import clsx from "clsx";
import currency from "currency.js";
import { Ring2 } from "ldrs/react";
import { Check, ChevronLeft, ChevronRight, Coins } from "lucide-react";
import { useState } from "react";
import { createOrder } from "~/api/order";
import { Dialog, DialogContent } from "~/components/ui/dialog";
import { Drawer, DrawerContent } from "~/components/ui/drawer";
import { useBreakpoint } from "~/hooks/dom";
import { useTranslate } from "~/i18n";
import { type Pricing, products } from "~/routes/base/_.pricing/config";
import { useDialogStore } from "~/store/dialog";

// 只取订阅类型的计划，确保类型安全
const subscriptionPlans = products.subscription.filter(
  (plan): plan is Extract<Pricing, { type: "subscription" }> =>
    plan.type === "subscription",
);

export function UpgradeDialog() {
  const t = useTranslate();
  const visible = useDialogStore((state) => state.visibleUpgradeDialog);
  const setVisible = useDialogStore((state) => state.setVisibleUpgradeDialog);

  const [_, { isMobile }] = useBreakpoint();
  const [loadingPricingId, setLoadingPricingId] = useState("");

  const { mutateAsync } = useMutation({
    mutationFn: createOrder,
    onSuccess(data) {
      if (!window) return;
      location.href = data.checkout_url;
    },
  });

  const handleClose = () => setVisible(false);

  const handleUpgrade = (pricingId: string, type: "monthly" | "annual") => {
    const plan = subscriptionPlans.find((item) => item.id === pricingId);
    if (!plan) return;
    setLoadingPricingId(pricingId);

    // 根据年付或月付选择对应的产品ID
    const productId =
      type === "annual" ? plan.annuallyProductId : plan.productId;

    mutateAsync(productId).finally(() => setLoadingPricingId(""));
  };

  if (isMobile) {
    return (
      <Drawer open={visible} onOpenChange={handleClose}>
        <DrawerContent
          className="border-none bg-transparent"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <UpgradeContent
            pricings={subscriptionPlans}
            loadingPricingId={loadingPricingId}
            onBuy={handleUpgrade}
          />
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={visible} onOpenChange={handleClose}>
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="sm:max-w-5xl overflow-y-auto p-0 border-none"
      >
        <UpgradeContent
          pricings={subscriptionPlans}
          loadingPricingId={loadingPricingId}
          onBuy={handleUpgrade}
        />
      </DialogContent>
    </Dialog>
  );
}

interface UpgradeContentProps {
  pricings: Extract<Pricing, { type: "subscription" }>[];
  loadingPricingId: string;
  onBuy: (id: string, type: "monthly" | "annual") => void;
}

function UpgradeContent({
  pricings,
  loadingPricingId,
  onBuy,
}: UpgradeContentProps) {
  const t = useTranslate();
  const [annually, setAnnually] = useState(false);
  const [current, setCurrent] = useState(0);
  return (
    <div
      className={clsx(
        "bg-base-100 rounded-t-xl md:rounded-xl",
        "overflow-hidden max-h-[90vh]",
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-grid-border">
        <h2 className="text-2xl font-bold text-base-content">
          {t("dialogs.upgrade.title")}
        </h2>
        <p className="text-base-content/70">
          {t("dialogs.upgrade.description")}
        </p>
      </div>

      {/* Pricing Cards - 完全基于定价页面的设计 */}
      <div className="max-md:h-136 overflow-y-auto">
        <div
          className={clsx("grid grid-cols-1 md:grid-cols-3 relative")}
          style={{ "--current": current } as React.CSSProperties}
        >
          {pricings.map((pricing, index, list) => {
            const isCurrent = index === current;

            const price = annually ? pricing.annually : pricing.price;
            const credits = currency(pricing.credits, {
              precision: 0,
              symbol: "",
            }).format();

            const leftIndex = index - 1;
            const disabledLeftIndex = leftIndex < 0;

            const rightIndex = index + 1;
            const disabledRightIndex = rightIndex >= list.length;

            const handleSetLeftIndex = () => {
              if (!disabledLeftIndex) setCurrent(leftIndex);
            };

            const handleSetRightIndex = () => {
              if (!disabledRightIndex) setCurrent(rightIndex);
            };

            return (
              <div
                className={clsx(
                  "w-full h-full relative md:border-r border-grid-border last-of-type:border-r-0",
                  "hidden md:block data-[current=true]:block",
                )}
                data-type={pricing.type}
                key={pricing.id}
                data-current={isCurrent}
              >
                {pricing.popular && (
                  <div
                    className={clsx(
                      "absolute bg-gradient-to-b from-primary/10 to-transparent inset-x-0 top-0 h-40 pointer-events-none",
                    )}
                  />
                )}
                <div className="relative">
                  <div className="p-4 sm:p-6 border-b border-grid-border">
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-semibold">{pricing.title}</h3>
                      {pricing.popular && (
                        <div className="badge badge-primary badge-xs py-2.5 rounded-full uppercase">
                          {t("dialogs.upgrade.popular")}
                        </div>
                      )}
                    </div>
                    <p className="text-lg tabular-nums">
                      <span>US{currency(price).format()} </span>
                      <span className="text-base font-medium opacity-50">
                        {pricing.type === "subscription"
                          ? t("dialogs.upgrade.billing.monthly")
                          : t("dialogs.upgrade.billing.oneTime")}
                      </span>
                    </p>
                    {pricing.type === "subscription" && (
                      <div className="mt-4 mb-2">
                        <label className="label flex items-center gap-2 text-base-content">
                          <input
                            type="checkbox"
                            checked={annually}
                            onChange={() => setAnnually((state) => !state)}
                            className="toggle toggle-sm"
                          />
                          <div>{t("dialogs.upgrade.billing.annually")}</div>
                          {annually && (
                            <div className="badge badge-sm rounded-full border-grid-border badge-outline font-medium">
                              {t("dialogs.upgrade.billing.save")}
                            </div>
                          )}
                        </label>
                      </div>
                    )}
                    <p className="text-sm opacity-70 mt-2 mb-4">
                      {pricing.description}
                    </p>

                    <div className="flex items-center gap-3">
                      <button
                        className="btn bg-base-100 border-base-300 active:bg-base-200 !px-2 md:hidden disabled:!bg-base-100"
                        disabled={disabledLeftIndex}
                        onClick={handleSetLeftIndex}
                      >
                        <ChevronLeft />
                      </button>

                      <button
                        className="btn btn-neutral shadow-none flex-1 min-w-0 disabled:cursor-not-allowed cursor-pointer"
                        disabled={!!loadingPricingId}
                        onClick={() =>
                          onBuy(pricing.id, annually ? "annual" : "monthly")
                        }
                      >
                        {loadingPricingId === pricing.id && <Ring2 size={16} />}
                        {t("dialogs.upgrade.button.upgrade")}
                      </button>

                      <button
                        className="btn bg-base-100 border-base-300 active:bg-base-200 !px-2 md:hidden disabled:!bg-base-100"
                        disabled={disabledRightIndex}
                        onClick={handleSetRightIndex}
                      >
                        <ChevronRight />
                      </button>
                    </div>
                  </div>
                  <div className="px-4 sm:px-6 py-4 border-b border-grid-border">
                    <div className="flex items-center gap-2">
                      <Coins size={20} strokeWidth={1.5} />
                      <p>
                        <span className="text-base">{credits} credits </span>
                        <span className="opacity-60 text-sm">
                          {pricing.type === "subscription"
                            ? "/" +
                              t("dialogs.upgrade.billing.monthly").toLowerCase()
                            : "/" +
                              t(
                                "dialogs.upgrade.billing.oneTime",
                              ).toLowerCase()}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="p-4 sm:p-6">
                    <ul className="list-none space-y-3 mb-8">
                      {pricing.benefits.map((benefit, bi) => (
                        <li className="flex items-start text-sm gap-1" key={bi}>
                          <Check className="text-green-500 mt-px" size={20} />
                          <p className="flex-1 min-w-0">{benefit}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
