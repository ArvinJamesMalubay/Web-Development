const express = require("express")
const router = express.Router()

const studController = require("../controller/stud.controller")

router.get("/", studController.getAll)
router.get("/:id", studController.getById)
router.post("/", studController.create)
router.put("/:id", studController.update)
router.delete("/:id", studController.delete)

module.exports = router