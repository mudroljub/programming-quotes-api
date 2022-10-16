import { Router } from "express";
import QuoteController from "../controllers/Quote.controller";

const router = Router();

router.post("/create", QuoteController.createQuote);
router.get("/get/:quoteId", QuoteController.readQuote);
router.get("/get/", QuoteController.readAll);
router.patch("/update/:quoteId", QuoteController.updateQuote);
router.delete("/delete/:quoteId", QuoteController.deleteQuote);
// router.put("/put", QuoteController.backupLocal);

export default router;
