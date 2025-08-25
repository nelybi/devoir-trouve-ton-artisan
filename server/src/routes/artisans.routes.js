import { Router } from "express";
import {
  getArtisansBySpecialty,
  seedSpecialties,
  seedArtisans,
} from "../controllers/artisans.controller.js";

const router = Router();

router.get("/artisans", getArtisansBySpecialty);

// Routes temporaires de seed
router.post("/_seed/specialties", seedSpecialties);
router.post("/_seed/artisans", seedArtisans);

export default router;
