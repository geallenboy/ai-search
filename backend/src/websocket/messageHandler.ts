import { WebSocket, EventEmitter } from "ws";
import { BaseMessage, HumanMessage, AIMessage } from "@langchain/core/messages";
import handleWebSearch from "../agents/webSearchAgent";
import handleAcademicSearch from "../agents/academicSearchAgent";
import handleWritingAssistant from "../agents/writingAssistant";
import handleYoutubeSearch from "../agents/youtubeSearchAgent";
import handleRedditSearch from "../agents/redditSearchAgent";
import type { BaseChatModel } from "@langchain/core/language_models/chat_models";
import type { Embeddings } from "@langchain/core/embeddings";

type Message = {
    type: string;
    content: string;
    copilot: string;
    focusMode: string;
    history: Array<[string, string]>;
};

const searchHandlers = {
    webSearch: handleWebSearch,
    academicSearch: handleAcademicSearch,
    writingAssistant: handleWritingAssistant,
    youtubeSearch: handleYoutubeSearch,
    redditSearch: handleRedditSearch,
};

const handleEmitterEvents = (
    emitter: EventEmitter,
    ws: WebSocket,
    id: string
) => {
    emitter.on("data", (data) => {
        const parsedData = JSON.parse(data);
        if (parsedData.type === "response") {
            ws.send(
                JSON.stringify({
                    type: "message",
                    data: parsedData.data,
                    messageId: id,
                })
            );
        } else if (parsedData.type === "sources") {
            ws.send(
                JSON.stringify({
                    type: "sources",
                    data: parsedData.data,
                    messageId: id,
                })
            );
        }
    });
    emitter.on("end", () => {
        ws.send(JSON.stringify({ type: "messageEnd", messageId: id }));
    });
    emitter.on("error", (data) => {
        const parsedData = JSON.parse(data);
        ws.send(JSON.stringify({ type: "error", data: parsedData.data }));
    });
};

export const handleMessage = async (
    message: string,
    ws: WebSocket,
    llm: BaseChatModel,
    embeddings: Embeddings
) => {
    try {
        const paresedMessage = JSON.parse(message) as Message;
        const id = Math.random().toString(36).substring(7);

        if (!paresedMessage.content) {
            return ws.send(
                JSON.stringify({ type: "error", data: "Invalid message format" })
            );
        }

        const history: BaseMessage[] = paresedMessage.history.map((msg) => {
            if (msg[0] === "human") {
                return new HumanMessage({
                    content: msg[1],
                });
            } else {
                return new AIMessage({
                    content: msg[1],
                });
            }
        });

        if (paresedMessage.type === "message") {
            const handler = searchHandlers[paresedMessage.focusMode];
            if (handler) {
                const emitter = handler(
                    paresedMessage.content,
                    history,
                    llm,
                    embeddings
                );
                handleEmitterEvents(emitter, ws, id);
            } else {
                ws.send(JSON.stringify({ type: "error", data: "Invalid focus mode" }));
            }
        }
    } catch (error) {
        console.error("Failed to handle message", error);
        ws.send(JSON.stringify({ type: "error", data: "Invalid message format" }));
    }
};
