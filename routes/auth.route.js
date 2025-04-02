import express from "express";
import { linkedInCallback } from "../controller/Auth.js";

const router = express.Router();

router.get("/linkedin/callback", linkedInCallback);

export default router;