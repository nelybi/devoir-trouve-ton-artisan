import { Router } from "express";
import {
  getCategories,
  seedCategories,
  getSpecialtiesByCategory,
} from "../controllers/categories.controller.js";

const router = Router();

router.get("/categories", getCategories);
router.get("/categories/:slug/specialties", getSpecialtiesByCategory);

// Route temporaire de seed
router.post("/_seed/categories", seedCategories);

export default router;
