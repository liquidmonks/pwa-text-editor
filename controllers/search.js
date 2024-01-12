const router = require('express').Router()
const fs = require('fs')
const path = require('path')
const Service = require('../models/Services')
const momentTz = require('moment-timezone')
const { XMLParser } = require('fast-xml-parser')
const { promisify } = require('util')
const readFileAsync = promisify(fs.readFile)
const uniqid = require('uniqid')
const { execute } = require('../db/xuidb')

router.post('/', async (req, res) => {
    const { query, timezone } = req.body
    const timestamp = new Date().getTime()

    const service = await Service.findByPk(req.session.verificationId)
    const xmlFilePath = path.join(process.cwd(), 'xml', service.xmlName);

    if (!service || !fs.existsSync(xmlFilePath)) {
        return res.render('main', {
            message: "Loaded",
            query,
            count: 0,
            results: []
        })
    }

    let xuiResults = await execute(`SELECT \`stream_display_name\` FROM \`streams\` WHERE \`stream_display_name\` LIKE '%${query.trim()}%'`)

    if (xuiResults.length) {
        xuiResults = xuiResults.map(xr => xr.stream_display_name)
    }

    const xmlData = await readFileAsync(xmlFilePath, { encoding: 'utf8' });

    const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '' });
    const result = parser.parse(xmlData);

    const programmes = result?.tv?.programme?.filter(p => {
        const regex = new RegExp(query.trim(), 'i')
        return regex.test(p.title)
    })
        .sort((a, b) => b.start_timestamp - a.start_timestamp)
        .map(p => {
            const startTime = momentTz.unix(p.start_timestamp).tz(timezone);
            const stopTime = momentTz.unix(p.stop_timestamp).tz(timezone);

            const isPast = stopTime.isBefore(momentTz.unix(timestamp / 1000).tz(timezone));
            const isBetween = momentTz.unix(timestamp / 1000).tz(timezone).isBetween(startTime, stopTime)

            return `Airing On: ${p.channel} | ${p.title} | ${isBetween ? 'Playing now' : isPast ? 'Ended ' + stopTime.fromNow() : `Date: ${startTime.format('DD/MM/YYYY')} | Time: ${startTime.format('hh:mm A')}`}`;
        })

    const channels = result?.tv?.channel?.filter(c => {
        const regex = new RegExp(query, 'i')
        return regex.test(c['display-name'])
    }).map(c => c['display-name'])


    const results = [...programmes, ...channels, ...xuiResults]
        .map(r => ({ id: uniqid(), label: r }))
        .slice(0, 10)

    res.render('main', {
        message: "Loaded",
        query,
        count: results.length,
        results
    })
})

module.exports = router