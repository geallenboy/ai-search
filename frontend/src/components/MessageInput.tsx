import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { Attach, CopilotToggle } from "./MessageInputActions";
import { ArrowUp } from "lucide-react";

const MessageInput = ({
  sendMessage,
  loading,
}: {
  sendMessage: (message: string) => void;
  loading: boolean;
}) => {
  const [copilotEnabled, setCopilotEnabled] = useState(false);
  const [message, setMessage] = useState("");
  const [textareaRows, setTextareaRows] = useState(1);
  const [mode, setMode] = useState<"multi" | "single">("single");

  useEffect(() => {
    if (textareaRows >= 2 && message && mode === "single") {
      setMode("multi");
    } else if (!message && mode === "multi") {
      setMode("single");
    }
  }, [textareaRows, mode, message]);
  console.log("mode：", mode);
  return (
    <form
      onSubmit={(e) => {
        if (loading) return;
        e.preventDefault();
        sendMessage(message);
        setMessage("");
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" && !e.shiftKey && !loading) {
          e.preventDefault();
          sendMessage(message);
          setMessage("");
        }
      }}
      className={cn(
        "bg-[#111111] p-4 flex items-center overflow-hidden border border-[#1C1C1C]",
        mode === "multi" ? "flex-col rounded-lg" : "flex-row rounded-full"
      )}
    >
      {mode === "single" && <Attach />}
      <TextareaAutosize
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onHeightChange={(height, props) => {
          setTextareaRows(Math.ceil(height / props.rowHeight));
        }}
        className="transition bg-transparent placeholder:text-white/50 placeholder:text-sm text-sm text-white resize-none focus:outline-none w-full max-h-24 lg:max-h-36 xl:max-h-48 flex-grow flex-shrink"
        placeholder="Ask a follow up"
      />
      {mode === "single" && (
        <div className="flex flex-row items-center space-x-4">
          <CopilotToggle
            copilotEnabled={copilotEnabled}
            setCopilotEnabled={setCopilotEnabled}
          />
          <button
            disabled={message.trim().length === 0 || loading}
            className="bg-[#24A0ED] text-white disabled:text-white/50 hover:bg-opacity-85 transition duration-100 disabled:bg-[#ececec21] rounded-full p-2"
          >
            <ArrowUp size={17} />
          </button>
        </div>
      )}
      {mode === "multi" && (
        <div className="flex flex-row items-center justify-between w-full pt-2">
          <Attach />
          <div className="flex flex-row items-center space-x-4">
            <CopilotToggle
              copilotEnabled={copilotEnabled}
              setCopilotEnabled={setCopilotEnabled}
            />
            <button
              disabled={message.trim().length === 0 || loading}
              className="bg-[#24A0ED] text-white disabled:text-white/50 hover:bg-opacity-85 transition duration-100 disabled:bg-[#ececec21] rounded-full p-2"
            >
              <ArrowUp size={17} />
            </button>
          </div>
        </div>
      )}
    </form>
  );
};

export default MessageInput;
