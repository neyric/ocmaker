import clsx from "clsx";
import currency from "currency.js";
import { Ring2 } from "ldrs/react";
import { Check, ChevronLeft, ChevronRight, Coins } from "lucide-react";
import { useEffect, useState } from "react";
import type { Pricing, PricingType } from "~/.server/constants/pricing";
import { GridSection } from "~/components/ui/grid-section";
import { useTranslate } from "~/i18n";

interface PricingSectionProps {
  pricingType: PricingType;
  pricings: Pricing[];
  loadingPricingId?: string;
  onBuy: (id: string, productId: string) => void;
}

export function PricingSection({
  pricingType,
  pricings,
  loadingPricingId,
  onBuy,
}: PricingSectionProps) {
  const t = useTranslate();

  const [annually, setAnnually] = useState(false);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (pricingType) setCurrent(0);
  }, [pricingType]);

  return (
    <GridSection withPadding={false}>
      <div className="relative">
        {/* Pricing Cards */}
        <div
          className={clsx(
            "grid grid-cols-1 lg:grid-cols-3 data-[count=2]:lg:grid-cols-2 relative"
          )}
          data-count={pricings.length}
          style={{ "--current": current } as React.CSSProperties}
        >
          {pricings.map((pricing, index, list) => {
            const isCurrent = index === current;
            const price =
              pricing.type === "credits"
                ? pricing.price
                : annually
                  ? pricing.annually
                  : pricing.price;
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
                  "w-full relative lg:border-r border-grid-border last-of-type:border-r-0",
                  "hidden lg:block data-[current=true]:block"
                )}
                data-type={pricing.type}
                key={pricing.id}
                data-current={isCurrent}
              >
                {pricing.popular && (
                  <div
                    className={clsx(
                      "absolute bg-gradient-to-b from-primary/10 to-transparent inset-x-0 top-0 h-40 pointer-events-none"
                    )}
                  />
                )}
                <div className="relative">
                  <div className="p-4 sm:p-6 border-b border-grid-border">
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-semibold">{pricing.title}</h3>
                      {pricing.popular && (
                        <div className="badge badge-primary badge-xs py-2.5 rounded-full uppercase">
                          {t("pricing.common.mostPopular")}
                        </div>
                      )}
                    </div>
                    <p className="text-lg tabular-nums">
                      <span>US{currency(price).format()} </span>
                      <span className="text-base font-medium opacity-50">
                        {pricing.type === "subscription"
                          ? t("pricing.common.monthPer")
                          : t("pricing.common.oneTime")}
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
                          <div>{t("pricing.common.billedAnnually")}</div>
                          <div className="badge badge-sm rounded-full border-grid-border badge-outline font-medium">
                            {t("pricing.common.save", { rate: 20 })}
                          </div>
                        </label>
                      </div>
                    )}
                    <p className="text-sm opacity-70 mt-2 mb-4">
                      {pricing.description}
                    </p>

                    <div className="flex items-center gap-3">
                      <button
                        className="btn bg-base-100 border-base-300 active:bg-base-200 !px-2 lg:hidden disabled:!bg-base-100"
                        disabled={disabledLeftIndex}
                        onClick={handleSetLeftIndex}
                      >
                        <ChevronLeft />
                      </button>

                      <button
                        className="btn btn-neutral shadow-none flex-1 min-w-0 disabled:cursor-not-allowed cursor-pointer"
                        disabled={!!loadingPricingId}
                        onClick={() =>
                          onBuy(
                            pricing.id,
                            pricing.type === "subscription" && annually
                              ? pricing.annuallyProductId
                              : pricing.productId
                          )
                        }
                      >
                        {loadingPricingId === pricing.id && <Ring2 size={16} />}
                        {pricing.type === "credits"
                          ? t("pricing.common.buyNow")
                          : t("pricing.common.upgrade")}
                      </button>

                      <button
                        className="btn bg-base-100 border-base-300 active:bg-base-200 !px-2 lg:hidden disabled:!bg-base-100"
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
                            ? "/" + t("pricing.common.month")
                            : "/" + t("pricing.common.oneTime")}
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
    </GridSection>
  );
}
