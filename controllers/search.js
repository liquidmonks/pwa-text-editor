const router = require('express').Router()
const fs = require('fs');
const path = require('path');
const Service = require('../models/Services');
const moment = require('moment')
const { XMLParser } = require('fast-xml-parser');
const { promisify } = require('util');
const readFileAsync = promisify(fs.readFile);
const uniqid = require('uniqid');

router.post('/', async (req, res) => {
    const { query, timestamp } = req.body

    const service = await Service.findByPk(req.session.verificationId)
    const xmlFilePath = path.join(process.cwd(), 'xml', service.xmlName);
    const xmlData = await readFileAsync(xmlFilePath, { encoding: 'utf8' });
    const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '' });
    const result = parser.parse(xmlData);

    const programmes = result?.tv?.programme?.filter(p => {
        const regex = new RegExp(query, 'i')
        return regex.test(p.title)
    })
        .filter((record, index, arr) => {
            return index === arr.findIndex((r) => r.title === record.title);
        })
        .splice(0, 20)
        .sort((a, b) => b.start_timestamp - a.start_timestamp)
        .map(p => {
            const startTime = moment.unix(p.start_timestamp);
            const isPast = startTime.isBefore(moment.unix(timestamp / 1000));
            return `Airing On: ${p.channel} | ${p.title} | ${isPast ? 'Ended ' + startTime.fromNow() : `Date: ${startTime.format('DD/MM/YYYY')} | Time: ${startTime.format('hh:mm A')}`}`;
        })

    const channels = result?.tv?.channel?.filter(c => {
        const regex = new RegExp(query, 'i')
        return regex.test(c['display-name'])
    })
        .splice(0, 20)
        .map(c => c['display-name'])

    const results = programmes
        .concat(channels)
        .map(r => ({ id: uniqid(), label: r }))

    res.render('main', {
        message: "Loaded",
        query,
        count: results.length,
        results
    })
})

module.exports = router