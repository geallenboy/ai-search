import { Dialog, Transition } from "@headlessui/react";
import { CloudUpload, RefreshCcw } from "lucide-react";
import { Fragment, useEffect, useState } from "react";

interface SettingsType {
  providers: {
    [key: string]: string[];
  };
  selectedProvider: string;
  selectedChatModel: string;
  openaiApiKey: string;
  gropApiKey?: string;
  ollamaApiUrl: string;
}

const SettingsDialog = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const [config, setConfig] = useState<SettingsType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const fetchConfig = async () => {
        setIsLoading(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/config`);
        const data = await res.json();
        setConfig(data);
        setIsLoading(false);
      };

      fetchConfig();
    }
  }, [isOpen]);

  const handleSubmit = async () => {
    setIsUpdating(true);

    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/config`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(config),
      });
    } catch (err) {
      console.log(err);
    } finally {
      setIsUpdating(false);
      setIsOpen(false);

      window.location.reload();
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => setIsOpen(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-100"
              leaveFrom="opacity-100 scale-200"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={
                  "w-full max-w-md transform rounded-2xl border border-[#1c1c1c] bg-[#111111] p-6 text-left align-middle shadow-xl transition-all"
                }
              >
                <Dialog.Title
                  className={"text-white text-xl font-medium leading-6"}
                >
                  Settings
                </Dialog.Title>
                {config && !isLoading && (
                  <div className="flex flex-col space-y-4 mt-6 pr-2">
                    {config.providers && (
                      <div className="flex flex-col space-y-1">
                        <p className="text-white/70 text-sm">LLM Provider</p>
                        <select
                          onChange={(e) =>
                            setConfig({
                              ...config,
                              selectedProvider: e.target.value,
                              selectedChatModel:
                                config.providers[e.target.value][0],
                            })
                          }
                          className="bg-[#111111] px-3 py-2 flex items-center overflow-hidden border border-[#1C1C1C] text-white rounded-lg text-sm"
                        >
                          {Object.keys(config.providers).map((provider) => (
                            <option
                              key={provider}
                              value={provider}
                              selected={provider === config.selectedProvider}
                            >
                              {provider.charAt(0).toUpperCase() +
                                provider.slice(1)}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                    {config.selectedProvider && (
                      <div className="flex flex-col space-y-1">
                        <p className="text-white/70 text-sm">Chat Model</p>
                        <select
                          onChange={(e) =>
                            setConfig({
                              ...config,
                              selectedChatModel: e.target.value,
                            })
                          }
                          className="bg-[#111111] px-3 py-2 flex items-center overflow-hidden border border-[#1C1C1C] text-white rounded-lg text-sm"
                        >
                          {config.providers[config.selectedProvider] ? (
                            config.providers[config.selectedProvider].length >
                            0 ? (
                              config.providers[config.selectedProvider].map(
                                (model) => (
                                  <option
                                    key={model}
                                    value={model}
                                    selected={
                                      model === config.selectedChatModel
                                    }
                                  >
                                    {model}
                                  </option>
                                )
                              )
                            ) : (
                              <option value="" disabled selected>
                                No models available
                              </option>
                            )
                          ) : (
                            <option value="" disabled selected>
                              Invalid provider
                            </option>
                          )}
                        </select>
                      </div>
                    )}
                  </div>
                )}
                {config?.selectedProvider === "openai" && (
                  <div className="flex flex-col space-y-1">
                    <p className="text-white/70 text-sm">OpenAI API Key</p>
                    <input
                      type="text"
                      defaultValue={config.openaiApiKey}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          openaiApiKey: e.target.value,
                        })
                      }
                      className="bg-[#111111] px-3 py-2 flex items-center overflow-hidden border border-[#1C1C1C] text-white rounded-lg text-sm"
                    />
                  </div>
                )}
                {config?.selectedProvider === "ollama" && (
                  <div className="flex flex-col space-y-1">
                    <p className="text-white/70 text-sm">Ollama API URL</p>
                    <input
                      type="text"
                      defaultValue={config.ollamaApiUrl}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          ollamaApiUrl: e.target.value,
                        })
                      }
                      className="bg-[#111111] px-3 py-2 flex items-center overflow-hidden border border-[#1C1C1C] text-white rounded-lg text-sm"
                    />
                  </div>
                )}
                {config?.selectedProvider === "groq" && (
                  <div className="flex flex-col space-y-1">
                    <p className="text-white/70 text-sm">GROQ API Key</p>
                    <input
                      type="text"
                      defaultValue={config?.gropApiKey}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          gropApiKey: e.target.value,
                        })
                      }
                      className="bg-[#111111] px-3 py-2 flex items-center overflow-hidden border border-[#1C1C1C] text-white rounded-lg text-sm"
                    />
                  </div>
                )}

                {isLoading && (
                  <div className="w-full flex items-center justify-center mt-6  text-white/70 py-6">
                    <RefreshCcw className="animate-spin" />
                  </div>
                )}
                <div className="w-full mt-6 space-y-2">
                  <p className="text-xs text-white/50">
                    we&apos;ll refresh the page after updating the settings.
                  </p>
                  <button
                    onClick={handleSubmit}
                    disabled={isLoading || isUpdating}
                    className="
                  bg-[#24A0ED] flex flex-row items-center space-x-2 text-white disabled:text-white/50 hover:bg-opacity-85 transition duration-100 disabled:bg-[#ececec21] rounded-full px-4 py-2"
                  >
                    {isUpdating ? (
                      <RefreshCcw size={20} className="animate-spin" />
                    ) : (
                      <CloudUpload size={20} />
                    )}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default SettingsDialog;
