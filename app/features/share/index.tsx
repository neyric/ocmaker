import { Link2 } from "lucide-react";
import { useState } from "react";
import {
  FacebookShareButton,
  PinterestShareButton,
  TwitterShareButton,
} from "react-share";
import { Facebook, Pinterest, Twitter } from "~/components/icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { cn } from "~/lib/utils";

interface SharePopoverProps {
  children: React.ReactNode;
  shareUrl: string;
  shareText?: string;
  shareTitle?: string;
  shareImage?: string;
  className?: string;
  contentClassName?: string;
  // 控制各个分享选项的显示
  allowCopyLink?: boolean;
  allowTwitter?: boolean;
  allowFacebook?: boolean;
  allowPinterest?: boolean;
  // 复制成功回调
  onCopySuccess?: () => void;
}

export function SharePopover({
  children,
  shareUrl,
  shareText,
  shareTitle,
  shareImage,
  className,
  contentClassName,
  allowCopyLink = true,
  allowTwitter = true,
  allowFacebook = true,
  allowPinterest = true,
  onCopySuccess,
}: SharePopoverProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      onCopySuccess?.();

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy link:", error);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild className={className}>
        {children}
      </PopoverTrigger>
      <PopoverContent className={cn("w-40 p-2", contentClassName)}>
        <div className="flex flex-col space-y-1.5">
          {allowCopyLink && (
            <button
              className="btn btn-ghost justify-start !px-3 hover:!bg-neutral-50 bg-transparent text-base-content"
              onClick={handleCopyLink}
            >
              <Link2 className="size-6" />
              <span>{copied ? "Copied" : "Copy Link"}</span>
            </button>
          )}

          {allowTwitter && (
            <TwitterShareButton
              url={shareUrl}
              title={shareText || shareTitle}
              className="btn btn-ghost justify-start !px-3 hover:!bg-blue-50 w-full"
            >
              <Twitter className="size-6" />
              <span>Twitter</span>
            </TwitterShareButton>
          )}

          {allowFacebook && (
            <FacebookShareButton
              url={shareUrl}
              className="btn btn-ghost justify-start !px-3 hover:!bg-violet-50 w-full"
            >
              <Facebook className="size-6" />
              <span>Facebook</span>
            </FacebookShareButton>
          )}

          {allowPinterest && shareImage && (
            <PinterestShareButton
              url={shareUrl}
              media={shareImage}
              description={shareTitle || shareText || ""}
              className="btn btn-ghost justify-start !px-3 hover:!bg-red-50 w-full"
            >
              <Pinterest className="size-6" />
              <span>Pinterest</span>
            </PinterestShareButton>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
