import express from "express";
import imagesRouter from "./images";
import configRouter from "./config";
import videoRouter from "./videos";
import suggestionsRouter from "./suggestions";

const router = express.Router();

router.use("/images", imagesRouter);
router.use("/config", configRouter);
router.use("/videos", videoRouter);
router.use("/suggestions", suggestionsRouter);

export default router;
