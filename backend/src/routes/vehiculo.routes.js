"use strict";
import { Router } from "express";
import { isAdmin } from "../middlewares/authorization.middleware.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import {
  deleteVehiculo,
  getVehiculo,
  getVehiculos,
  updateVehiculo,
} from "../controllers/vehiculo.controller.js";

const router = Router();

router
  .use(authenticateJwt)
  .use(isAdmin);

router
  .get("/", isAdmin, getVehiculos)
  .get("/id:", isAdmin, getVehiculo)
  .patch("/id:", isAdmin, updateVehiculo)
  .delete("/id:", isAdmin, deleteVehiculo);

export default router;