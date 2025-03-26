import express from "express";
import { getChatModel, getChatModelProvider } from "../config";
import { getAvailableProviders } from "../lib/providers";
import { BaseChatModel } from "@langchain/core/language_models/chat_models";
import { HumanMessage, AIMessage } from "@langchain/core/messages";
import generateSuggestions from "../agents/suggestionGeneratorAgent";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    let { chat_history, chat_model, chat_model_provider } = req.body;

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

    const suggestions = await generateSuggestions({ chat_history }, llm);

    res.status(200).json({ suggestions: suggestions });
  } catch (err) {
    res
      .status(500)
      .json({ message: `An error has occurred. : ${err.message}` });
    console.log(err.message);
  }
});

export default router;
