import express from "express";
import { getChatModel, getChatModelProvider } from "../config";
import { getAvailableProviders } from "../lib/providers";
import { BaseChatModel } from "@langchain/core/language_models/chat_models";
import { HumanMessage, AIMessage } from "@langchain/core/messages";
import handleVideoSearch from "../agents/videoSearchAgent";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    let { query, chat_history } = req.body;

    chat_history = chat_history.map((msg: any) => {
      if (msg.role === "user") {
        return new HumanMessage(msg.content);
      } else if (msg.rol === "assistant") {
        return new AIMessage(msg.content);
      }
    });

    const models = await getAvailableProviders();
    const provider = getChatModelProvider();
    const chatModel = getChatModel();

    let llm: BaseChatModel | undefined;

    if (models[provider] && models[provider][chatModel]) {
      llm = models[provider][chatModel] as BaseChatModel | undefined;
    }

    if (!llm) {
      res.status(500).json({ message: "Invalid LLM model selected" });
      return;
    }

    const videos = await handleVideoSearch({ query, chat_history }, llm);

    res.status(200).json({ videos });
  } catch (err) {
    res.status(500).json({ message: "An error has occurred." });
    console.log(err.message);
  }
});

export default router;
