/* eslint-disable @typescript-eslint/no-explicit-any */
interface Window {
  JSBridge: any;
  webkit: any;
  bridge: any;
}

interface Navigator {
  getUserMedia(
      options: { video?: boolean; audio?: boolean; }, 
      success: (stream: any) => void, 
      error?: (error: string) => void
      ) : void;
}