import clsx from "clsx";
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

interface UserInfoSectionProps {
  user: UserInfo;
  credits: number;
  subscription?: Subscription | null;
  onEditInfo?: () => void;
}

export function UserInfoSection({
  user,
  credits,
  subscription,
  onEditInfo,
}: UserInfoSectionProps) {
  const hasActiveSubscription = subscription?.status === "active";

  const formatDate = (timestamp?: string | number | Date) => {
    if (!timestamp) return "N/A";
    const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getSubscriptionStatus = () => {
    if (!subscription) return "No active subscription";

    if (subscription.cancel_at) {
      return "Cancelled (Active until expiration)";
    }

    switch (subscription.status) {
      case "active":
        return "Active";
      case "cancelled":
        return "Cancelled";
      case "expired":
        return "Expired";
      default:
        return "Unknown";
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
              User Information
            </h2>
            <button
              className="btn btn-sm bg-white text-black gap-2"
              onClick={handleEditProfile}
            >
              <Settings className="h-4 w-4" />
              Edit Profile
            </button>
          </div>

          {/* Avatar and Name Section */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name || "User avatar"}
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
                {user.name || "User"}
              </h3>
              <p className="text-sm text-base-content/60">
                Member since {formatDate(user.created_at)}
              </p>
            </div>
          </div>

          {/* Account Details */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-base-content/60" />
              <div>
                <p className="text-xs font-medium text-base-content/60">
                  Email
                </p>
                <p className="text-base text-base-content">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Calendar className="h-5 w-5 text-base-content/60" />
              <div>
                <p className="text-xs font-medium text-base-content/60">
                  Member Since
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
              Usage Statistics
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-base-200/50 rounded-lg">
                <p className="text-2xl font-bold text-primary">
                  {credits || 0}
                </p>
                <p className="text-sm text-base-content/60">
                  Credits Remaining
                </p>
              </div>
              <div className="text-center p-3 bg-base-200/50 rounded-lg">
                <p className="text-2xl font-bold text-primary">0</p>
                <p className="text-sm text-base-content/60">Videos Created</p>
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 sm:p-6 space-y-6 bg-base-200">
          <div className="space-y-6">
            <div className="flex items-start justify-between">
              <h2 className="text-2xl font-bold text-base-content">
                Subscription
              </h2>
              {hasActiveSubscription ? (
                <button className="btn btn-outline btn-sm gap-2">
                  <CreditCard className="h-4 w-4" />
                  Manage
                </button>
              ) : (
                <Link to="/pricing">
                  <button className="btn btn-sm bg-white text-black gap-2">
                    <Crown className="h-4 w-4" />
                    Upgrade
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
                    Current Plan
                  </p>
                  <p className="text-base text-base-content">
                    {subscription?.plan_type || "Free"}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <MonitorDot
                  className={clsx(
                    "h-5 w-5",
                    hasActiveSubscription
                      ? "text-success"
                      : "text-base-content/30"
                  )}
                />

                <div>
                  <p className="text-xs font-medium text-base-content/60">
                    Status
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
                      {subscription.cancel_at ? "Active Until" : "Expires On"}
                    </p>
                    <p className="text-base text-base-content">
                      {formatDate(subscription.expired_at)}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Plan Features or Upgrade Prompt */}
            {hasActiveSubscription ? (
              <div className="border-t border-grid-border/50 pt-4">
                <h4 className="text-lg font-semibold text-base-content mb-3">
                  Current Plan Benefits
                </h4>
                <div className="space-y-2 text-sm text-base-content/70">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                    <span>Unlimited video generation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                    <span>Priority processing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                    <span>Advanced customization options</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                    <span>Email support</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="border-t border-grid-border/50 pt-4">
                <h4 className="text-lg font-semibold text-base-content mb-3">
                  Upgrade to Premium
                </h4>
                <p className="text-sm text-base-content/70 mb-4">
                  Get unlimited access to all features and create amazing videos
                  without limitations.
                </p>
                <Link to="/pricing">
                  <button className="btn btn-primary w-full gap-2">
                    <Crown className="h-4 w-4" />
                    View Plans
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
