import { Check, LinkIcon } from "lucide-react";
import { useEffect, useState } from "react";
import {
  FacebookShareButton,
  LineShareButton,
  TelegramShareButton,
  TwitterShareButton,
} from "react-share";

interface ShareToolbarProps {
  url?: string;
  title?: string;
  onFullscreen?: () => void;
  onCopyLink?: () => void;
  onShare?: (platform: string) => void;
}

export const ShareToolbar: React.FC<ShareToolbarProps> = ({
  url = typeof window !== "undefined" ? window.location.href : "",
  title = "分享内容",
  onFullscreen,
  onCopyLink,
  onShare,
}) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => {
        setCopied(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      onCopyLink?.();
    } catch (error) {
      console.error("Failed to copy link:", error);
    }
  };

  const handleShare = (platform: string) => {
    onShare?.(platform);
  };

  return (
    <div className="items-center justify-center gap-2 max-w-xl bg-base-300 rounded-lg p-2 mt-2 flex">
      <button
        onClick={onFullscreen}
        className="flex items-center justify-center p-2 rounded-full bg-primary text-white hover:bg-primary/80 hover:scale-110 transition-all duration-300"
      >
        <svg
          viewBox="0 0 24 24"
          width="1.2em"
          height="1.2em"
          className="w-4 h-4 cursor-pointer"
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m15 15l6 6M15 9l6-6m0 13.2V21h-4.8M21 7.8V3h-4.8M3 16.2V21h4.8M3 21l6-6M3 7.8V3h4.8M9 9L3 3"
          />
        </svg>
      </button>

      <span className="block w-[1px] h-[24px] bg-neutral-content" />

      <div className="flex justify-center items-center gap-2">
        <button
          onClick={handleCopyLink}
          className={`flex items-center justify-center p-2 rounded-full text-white hover:scale-110 transition-all duration-300 ${
            copied
              ? "bg-success hover:bg-success/80"
              : "bg-neutral-500 hover:bg-neutral-600"
          }`}
        >
          {copied ? (
            <Check className="w-4 h-4" />
          ) : (
            <LinkIcon className="w-4 h-4" />
          )}
        </button>

        <LineShareButton
          url={url}
          title={title}
          onClick={() => handleShare("line")}
          className="hover:scale-110 transition-all duration-300"
        >
          <svg viewBox="0 0 64 64" width="30" height="30">
            <circle cx="32" cy="32" r="32" fill="#00b800" />
            <path
              d="M52.62 30.138c0 3.693-1.432 7.019-4.42 10.296h.001c-4.326 4.979-14 11.044-16.201 11.972-2.2.927-1.876-.591-1.786-1.112l.294-1.765c.069-.527.142-1.343-.066-1.865-.232-.574-1.146-.872-1.817-1.016-9.909-1.31-17.245-8.238-17.245-16.51 0-9.226 9.251-16.733 20.62-16.733 11.37 0 20.62 7.507 20.62 16.733zM27.81 25.68h-1.446a.402.402 0 0 0-.402.401v8.985c0 .221.18.4.402.4h1.446a.401.401 0 0 0 .402-.4v-8.985a.402.402 0 0 0-.402-.401zm9.956 0H36.32a.402.402 0 0 0-.402.401v5.338L31.8 25.858a.39.39 0 0 0-.031-.04l-.002-.003-.024-.025-.008-.007a.313.313 0 0 0-.032-.026.255.255 0 0 1-.021-.014l-.012-.007-.021-.012-.013-.006-.023-.01-.013-.005-.024-.008-.014-.003-.023-.005-.017-.002-.021-.003-.021-.002h-1.46a.402.402 0 0 0-.402.401v8.985c0 .221.18.4.402.4h1.446a.401.401 0 0 0 .402-.4v-5.337l4.123 5.568c.028.04.063.072.101.099l.004.003a.236.236 0 0 0 .025.015l.012.006.019.01a.154.154 0 0 1 .019.008l.012.004.028.01.005.001a.442.442 0 0 0 .104.013h1.446a.4.4 0 0 0 .401-.4v-8.985a.402.402 0 0 0-.401-.401zm-13.442 7.537h-3.93v-7.136a.401.401 0 0 0-.401-.401h-1.447a.4.4 0 0 0-.401.401v8.984a.392.392 0 0 0 .123.29c.072.068.17.111.278.111h5.778a.4.4 0 0 0 .401-.401v-1.447a.401.401 0 0 0-.401-.401zm21.429-5.287c.222 0 .401-.18.401-.402v-1.446a.401.401 0 0 0-.401-.402h-5.778a.398.398 0 0 0-.279.113l-.005.004-.006.008a.397.397 0 0 0-.111.276v8.984c0 .108.043.206.112.278l.005.006a.401.401 0 0 0 .284.117h5.778a.4.4 0 0 0 .401-.401v-1.447a.401.401 0 0 0-.401-.401h-3.93v-1.519h3.93c.222 0 .401-.18.401-.402V29.85a.401.401 0 0 0-.401-.402h-3.93V27.93h3.93z"
              fill="white"
            />
          </svg>
        </LineShareButton>

        <TwitterShareButton
          url={url}
          title={title}
          onClick={() => handleShare("twitter")}
          className="hover:scale-110 transition-all duration-300"
        >
          <svg viewBox="0 0 64 64" width="30" height="30">
            <circle cx="32" cy="32" r="32" fill="#000000" />
            <path
              d="M 41.116 18.375 h 4.962 l -10.8405 12.39 l 12.753 16.86 H 38.005 l -7.821 -10.2255 L 21.235 47.625 H 16.27 l 11.595 -13.2525 L 15.631 18.375 H 25.87 l 7.0695 9.3465 z m -1.7415 26.28 h 2.7495 L 24.376 21.189 H 21.4255 z"
              fill="white"
            />
          </svg>
        </TwitterShareButton>

        <FacebookShareButton
          url={url}
          onClick={() => handleShare("facebook")}
          className="hover:scale-110 transition-all duration-300"
        >
          <svg viewBox="0 0 64 64" width="30" height="30">
            <circle cx="32" cy="32" r="32" fill="#0965FE" />
            <path
              d="M34.1,47V33.3h4.6l0.7-5.3h-5.3v-3.4c0-1.5,0.4-2.6,2.6-2.6l2.8,0v-4.8c-0.5-0.1-2.2-0.2-4.1-0.2 c-4.1,0-6.9,2.5-6.9,7V28H24v5.3h4.6V47H34.1z"
              fill="white"
            />
          </svg>
        </FacebookShareButton>

        <TelegramShareButton
          url={url}
          title={title}
          onClick={() => handleShare("telegram")}
          className="hover:scale-110 transition-all duration-300"
        >
          <svg viewBox="0 0 64 64" width="30" height="30">
            <circle cx="32" cy="32" r="32" fill="#25A3E3" />
            <path
              d="m45.90873,15.44335c-0.6901,-0.0281 -1.37668,0.14048 -1.96142,0.41265c-0.84989,0.32661 -8.63939,3.33986 -16.5237,6.39174c-3.9685,1.53296 -7.93349,3.06593 -10.98537,4.24067c-3.05012,1.1765 -5.34694,2.05098 -5.4681,2.09312c-0.80775,0.28096 -1.89996,0.63566 -2.82712,1.72788c-0.23354,0.27218 -0.46884,0.62161 -0.58825,1.10275c-0.11941,0.48114 -0.06673,1.09222 0.16682,1.5716c0.46533,0.96052 1.25376,1.35737 2.18443,1.71383c3.09051,0.99037 6.28638,1.93508 8.93263,2.8236c0.97632,3.44171 1.91401,6.89571 2.84116,10.34268c0.30554,0.69185 0.97105,0.94823 1.65764,0.95525l-0.00351,0.03512c0,0 0.53908,0.05268 1.06412,-0.07375c0.52679,-0.12292 1.18879,-0.42846 1.79109,-0.99212c0.662,-0.62161 2.45836,-2.38812 3.47683,-3.38552l7.6736,5.66477l0.06146,0.03512c0,0 0.84989,0.59703 2.09312,0.68132c0.62161,0.04214 1.4399,-0.07726 2.14229,-0.59176c0.70766,-0.51626 1.1765,-1.34683 1.396,-2.29506c0.65673,-2.86224 5.00979,-23.57745 5.75257,-27.00686l-0.02107,0.08077c0.51977,-1.93157 0.32837,-3.70159 -0.87096,-4.74991c-0.60054,-0.52152 -1.2924,-0.7498 -1.98425,-0.77965l0,0.00176zm-0.2072,3.29069c0.04741,0.0439 0.0439,0.0439 0.00351,0.04741c-0.01229,-0.00351 0.14048,0.2072 -0.15804,1.32576l-0.01229,0.04214l-0.00878,0.03863c-0.75858,3.50668 -5.15554,24.40802 -5.74203,26.96472c-0.08077,0.34417 -0.11414,0.31959 -0.09482,0.29852c-0.1756,-0.02634 -0.50045,-0.16506 -0.52679,-0.1756l-13.13468,-9.70175c4.4988,-4.33199 9.09945,-8.25307 13.744,-12.43229c0.8218,-0.41265 0.68483,-1.68573 -0.29852,-1.70681c-1.04305,0.24584 -1.92279,0.99564 -2.8798,1.47502c-5.49971,3.2626 -11.11882,6.13186 -16.55882,9.49279c-2.792,-0.97105 -5.57873,-1.77704 -8.15298,-2.57601c2.2336,-0.89555 4.00889,-1.55579 5.75608,-2.23009c3.05188,-1.1765 7.01687,-2.7042 10.98537,-4.24067c7.94051,-3.06944 15.92667,-6.16346 16.62028,-6.43037l0.05619,-0.02283l0.05268,-0.02283c0.19316,-0.0878 0.30378,-0.09658 0.35471,-0.10009c0,0 -0.01756,-0.05795 -0.00351,-0.04566l-0.00176,0zm-20.91715,22.0638l2.16687,1.60145c-0.93418,0.91311 -1.81743,1.77353 -2.45485,2.38812l0.28798,-3.98957"
              fill="white"
            />
          </svg>
        </TelegramShareButton>
      </div>
    </div>
  );
};
