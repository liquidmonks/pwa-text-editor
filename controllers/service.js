const router = require('express').Router()
const Service = require('../models/Services')
const fs = require('fs');
const path = require('path');
const axios = require('axios');


const updateServices = async () => {
    try {
        const services = await Service.findAll({})

        services.forEach(async (service) => {
            const xmlFilePath = path.join(process.cwd(), 'xml', service.xmlName);
            if (fs.existsSync(xmlFilePath)) {
                fs.unlinkSync(xmlFilePath)
            }

            const response = await axios({
                method: "GET",
                url: service.url,
                responseType: "stream",
            })

            response.data.pipe(fs.createWriteStream(xmlFilePath));
        })
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    servicesRouter: router,
    updateServices
}