import express from "express";
import Controllers from "../http/controllers/loader";

const router:express.Router = express.Router();

router.post('/users/register', Controllers.auth.register);
router.post('/users/login', Controllers.auth.login);

export = router;