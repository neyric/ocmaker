import clsx from "clsx";
import currency from "currency.js";
import {
  ArrowUpRight,
  Calendar,
  CreditCard,
  Crown,
  Mail,
  MonitorDot,
  Settings,
  User,
} from "lucide-react";
import { Link } from "~/components/common";
import { GridSection } from "~/components/ui/grid-section";
import type { Subscription } from "~/drizzle/schema";

interface UserInfoSectionCopy {
  info: {
    title: string;
    editProfile: string;
    avatarAlt: string;
    defaultName: string;
    memberSinceDescription: string;
    emailLabel: string;
    memberSinceLabel: string;
  };
  usage: {
    title: string;
    creditsRemaining: string;
    imageCreated: string;
  };
  subscription: {
    title: string;
    manage: string;
    cancel: string;
    refund: string;
    upgrade: string;
    currentPlanLabel: string;
    defaultPlanName: string;
    statusLabel: string;
    statuses: {
      noActive: string;
      cancelledActive: string;
      active: string;
      cancelled: string;
      expired: string;
      unknown: string;
    };
    expirationLabels: {
      activeUntil: string;
      expiresOn: string;
    };
    benefitsTitle: string;
    benefits: string[];
    upgradeTitle: string;
    upgradeDescription: string;
    viewPlans: string;
  };
  general: {
    notAvailable: string;
  };
}

interface UserInfoSectionProps {
  user: UserInfo;
  credits: number;
  createdCount: number;
  subscription?: Subscription | null;
  onEditInfo?: () => void;
  onSubscriptionCancel: () => void;
  copy: UserInfoSectionCopy;
}

export function UserInfoSection({
  user,
  credits,
  createdCount,
  subscription,
  onEditInfo,
  onSubscriptionCancel,
  copy,
}: UserInfoSectionProps) {
  const hasActiveSubscription = subscription?.status === "active";

  const formatDate = (timestamp?: string | number | Date) => {
    if (!timestamp) return copy.general.notAvailable;
    const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getSubscriptionStatus = () => {
    if (!subscription) return copy.subscription.statuses.noActive;

    if (subscription.cancel_at) {
      return copy.subscription.statuses.cancelledActive;
    }

    switch (subscription.status) {
      case "active":
        return copy.subscription.statuses.active;
      case "cancelled":
        return copy.subscription.statuses.cancelled;
      case "expired":
        return copy.subscription.statuses.expired;
      default:
        return copy.subscription.statuses.unknown;
    }
  };

  const getStatusColor = () => {
    if (!subscription) return "text-base-content/60";

    if (subscription.cancel_at) {
      return "text-warning";
    }

    switch (subscription.status) {
      case "active":
        return "text-success";
      case "cancelled":
        return "text-error";
      case "expired":
        return "text-error";
      default:
        return "text-base-content/60";
    }
  };

  const handleEditProfile = () => {
    onEditInfo?.();
  };

  return (
    <GridSection withPadding={false}>
      <div className="relative grid grid-cols-1 md:grid-cols-2">
        <div className="p-4 sm:p-6 space-y-6 md:border-r border-b md:border-b-0 border-grid-border">
          <div className="flex items-start justify-between">
            <h2 className="text-2xl font-bold text-base-content">
              {copy.info.title}
            </h2>
            <button
              className="btn btn-sm bg-white text-black gap-2"
              onClick={handleEditProfile}
            >
              <Settings className="h-4 w-4" />
              {copy.info.editProfile}
            </button>
          </div>

          {/* Avatar and Name Section */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name || copy.info.avatarAlt}
                  className="h-16 w-16 rounded-full object-cover ring-2 ring-primary/10"
                />
              ) : (
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-8 w-8 text-primary/60" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-semibold text-base-content truncate">
                {user.name || copy.info.defaultName}
              </h3>
              <p className="text-sm text-base-content/60">
                {copy.info.memberSinceDescription.replace(
                  "{date}",
                  formatDate(user.created_at)
                )}
              </p>
            </div>
          </div>

          {/* Account Details */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-base-content/60" />
              <div>
                <p className="text-xs font-medium text-base-content/60">
                  {copy.info.emailLabel}
                </p>
                <p className="text-base text-base-content">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Calendar className="h-5 w-5 text-base-content/60" />
              <div>
                <p className="text-xs font-medium text-base-content/60">
                  {copy.info.memberSinceLabel}
                </p>
                <p className="text-base text-base-content">
                  {formatDate(user.created_at)}
                </p>
              </div>
            </div>
          </div>

          {/* Usage Statistics */}
          <div className="border-t border-grid-border/50 pt-4">
            <h4 className="text-lg font-semibold text-base-content mb-3">
              {copy.usage.title}
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-base-200/50 rounded-lg">
                <p className="text-2xl font-bold text-primary">
                  {currency(credits || 0, { precision: 0 }).format({
                    symbol: "",
                  })}
                </p>
                <p className="text-sm text-base-content/60">
                  {copy.usage.creditsRemaining}
                </p>
              </div>
              <div className="text-center p-3 bg-base-200/50 rounded-lg">
                <p className="text-2xl font-bold text-primary">
                  {currency(createdCount || 0, { precision: 0 }).format({
                    symbol: "",
                  })}
                </p>
                <p className="text-sm text-base-content/60">
                  {copy.usage.imageCreated}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 sm:p-6 space-y-6 bg-base-200">
          <div className="space-y-6">
            <div className="flex items-start justify-between">
              <h2 className="text-2xl font-bold text-base-content">
                {copy.subscription.title}
              </h2>
              {hasActiveSubscription ? (
                <button
                  className="btn btn-outline btn-sm gap-2"
                  onClick={() => onSubscriptionCancel()}
                >
                  <CreditCard className="h-4 w-4" />
                  {copy.subscription.cancel}
                </button>
              ) : (
                <Link to="/pricing" autoLang>
                  <button className="btn btn-sm bg-white text-black gap-2">
                    <Crown className="h-4 w-4" />
                    {copy.subscription.upgrade}
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                </Link>
              )}
            </div>

            {/* Subscription Status */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Crown className="h-5 w-5 text-primary/60" />
                <div>
                  <p className="text-xs font-medium text-base-content/60">
                    {copy.subscription.currentPlanLabel}
                  </p>
                  <p className="text-base text-base-content">
                    {copy.subscription.defaultPlanName}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <MonitorDot
                  className={clsx("h-5 w-5", "text-base-content/80")}
                />

                <div>
                  <p className="text-xs font-medium text-base-content/60">
                    {copy.subscription.statusLabel}
                  </p>
                  <p className={`text-base ${getStatusColor()}`}>
                    {getSubscriptionStatus()}
                  </p>
                </div>
              </div>

              {subscription?.expired_at && (
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-base-content/60" />
                  <div>
                    <p className="text-sm font-medium text-base-content/60">
                      {subscription.cancel_at
                        ? copy.subscription.expirationLabels.activeUntil
                        : copy.subscription.expirationLabels.expiresOn}
                    </p>
                    <p className="text-base text-base-content">
                      {formatDate(subscription.expired_at)}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Plan Features or Upgrade Prompt */}
            {subscription ? (
              <div className="border-t border-grid-border/50 pt-4">
                <h4 className="text-lg font-semibold text-base-content mb-3">
                  {copy.subscription.benefitsTitle}
                </h4>
                <div className="space-y-2 text-sm text-base-content/70">
                  {copy.subscription.benefits.map((benefit) => (
                    <div key={benefit} className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="border-t border-grid-border/50 pt-4">
                <h4 className="text-lg font-semibold text-base-content mb-3">
                  {copy.subscription.upgradeTitle}
                </h4>
                <p className="text-sm text-base-content/70 mb-4">
                  {copy.subscription.upgradeDescription}
                </p>
                <Link to="/pricing" autoLang>
                  <button className="btn btn-primary w-full gap-2">
                    <Crown className="h-4 w-4" />
                    {copy.subscription.viewPlans}
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </GridSection>
  );
}

export type { UserInfoSectionCopy };
