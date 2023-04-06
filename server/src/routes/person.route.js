import express from "express"
import personControllers from "../controllers/person.controller.js"

const router=express.Router({mergeParams:true})

router.get("/:personId/medias",personControllers.personMedias)

router.get("/:personId",personControllers.personDetail)

export default router 


