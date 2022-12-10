const InternModel = require("../models/internModel");
const CollegeModel = require('../models/collegeModel')


const isValid = function (value) {
    if (typeof (value) === "undefined" || typeof (value) === null) return false;
    if (typeof (value) === "string" && value.trim().length === 0) return false;
    if (typeof (value) === Number && value.trim().length === 0) return false;
    return true
}



const createInterns = async function (req, res) {
    try {
        let data = req.body;

        if (Object.keys(data).length == 0) return res.status(400).send({ status: false, message: "Body must be present." })


        let {name,email,mobile,collegeName} = data

        if (!isValid(name)) return res.status(400).send({ status: false, message: "name is required." })

        if (!name) return res.status(400).send({ status: false, message: "name must be present" })

        if (!email) return res.status(400).send({ status: false, message: "email must be present" })

        const validEmail = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email)

        if (!validEmail) return res.status(400).send({ status: false, message: "email is not valid." })

        const findEmail = await InternModel.findOne({ email: data.email })

        if (findEmail) return res.status(400).send({ status: false, message: "email is already present." })


        if (!mobile) return res.status(400).send({ status: false, message: "mobile must be present" })

        const validMobile = /^(\+\d{1,3}[- ]?)?\d{10}$/.test(mobile)

        if (!validMobile) return res.status(400).send({ status: false, message: "mobile number is invalid." })

        const uniqueMobile = await InternModel.findOne({ mobile:mobile })

        if (uniqueMobile) return res.status(400).send({ status: false, message: "mobile number already exists." })

        if (typeof (data.mobile) === "string") return res.status(400).send({ status: false, message: "mobile number should be in numbers only." })

        if (!collegeName) return res.status(400).send({ status: false, message: "college Name must be present" })

        if (!isValid(collegeName)) return res.status(400).send({ status: false, message: "college Name is Invalid" })

        const CollegeData = await CollegeModel.findOne({name:data.collegeName})

        if (!CollegeData) return res.status(404).send({ status: false, message: "No such College is present" })

        data.collegeId = CollegeData._id

        const createIntenData = await InternModel.create(data)

        res.status(201).send({ status: true, newData: createIntenData })

    } catch (err) {
        res.status(500).send({ status: false, error: err.message })
    }
}





module.exports.createInterns = createInterns