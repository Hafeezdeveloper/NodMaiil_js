const express = require("express")
const Studentrouter = express.Router()
const StudentModel = require("../Modal/StudentModel")
const { sendResponse } = require("../Helper/sendRespose")

Studentrouter.get("/", async (req, res) => {
    try {
        let result = await StudentModel.find()
        if (!result) {
            res.send(sendResponse(false, null, "Empty", "Error")).status(404)
        } else {
            res.send(sendResponse(true, result, "Data Avalible", "succ")).status(200)
        }
    } catch (e) {
        console.log(e)
    }
})

Studentrouter.post("/", async (req, res) => {
    try {
        let { name, fatherName } = req.body
        let obj = { name, fatherName }
        let reqArr = ["name", "fatherName"]
        let errArr = []

        reqArr.map((x) => {
            if (!obj[x]) {
                errArr.push(x)
            }
        })

        if (errArr.length > 0) {
            res.send(sendResponse(false, errArr, "Required Feild", "error")).status(404)
        } else {
            let result = StudentModel(obj)
            await result.save()

            if (!result) {
                res.send(sendResponse(false, null, "Cannot save", "error")).status(404)
            } else {
                res.send(sendResponse(false, result, "Save Succssfully", "Success")).status(200)
            }
        }
    } catch (e) {
        console.log(e)
    }
})

Studentrouter.put("/:id", async (req, res) => {
    try {
        let id = req.params.id
        let result = await StudentModel.findById(id)

        if (!result) {
            res.send(sendResponse(false, null, "Data Un Found", "ERrror")).status(404)
        } else {
            let updateData = await StudentModel.findByIdAndUpdate(id, req.body, { new: true })
            if (!updateData) {
                res.send(sendResponse(false, null, "Data UnEdit", "ERrror")).status(404)
            } else {
                res.send(sendResponse(false, null, "Data Edit Sucessfully", "Sucess")).status(200)
            }

        }
    } catch (e) {
        console.log(e)
    }
})

Studentrouter.delete("/:id", async (req, res) => {
    try {
        let id = req.params.id
        let result = await StudentModel.findById(id)

        if (!result) {
            res.send(sendResponse(false, null, "Data Un Found", "ERrror")).status(404)
        } else {
            let deleteData = await StudentModel.findByIdAndDelete(id)
            if (!deleteData) {
                res.send(sendResponse(false, null, "Data UnDeleted", "ERrror")).status(404)
            } else {
                res.send(sendResponse(false, null, "Data Delete Sucessfully", "Sucess")).status(200)
            }
        }
    } catch (e) {
        console.log(e)
    }
})

module.exports = Studentrouter