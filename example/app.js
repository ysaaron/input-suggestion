const express = require('express')
const path = require('path')
const router = express.Router()
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackDevCofig = require('./webpack.config')

const compiler = webpack(webpackDevCofig)
const app = express()

app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackDevCofig.output.publicPath
}))
app.use('/public', express.static(path.join(__dirname, 'public')))
app.get('/linesuggestions', (req, res) => {
    res.json({
        total: 15,
        items: [
            { name: 'B612', logo: './public/img/b612.png' },
            { name: 'LOOKS', logo: './public/img/linelooks.png' },
            { name: 'LINE MAN', logo: './public/img/lineman.png' },
            { name: 'Emoji LINE', logo: './public/img/emojiline.png' },
            { name: 'LINE@', logo: './public/img/lineat.png' },
            { name: 'LINE TV', logo: './public/img/linetools.jpg' },
            { name: 'LINE Camera', logo: './public/img/linecamera.png' },
            { name: 'LINE Dictionary English-Indonesian', logo: '' },
            { name: 'LINE DECO', logo: './public/img/linedeco.jpg' },
            { name: 'LINE PLAY', logo: './public/img/lineplay.png' },
            { name: 'LINE Antivirus', logo: './public/img/lineantivirus.jpg' },
            { name: 'LINE Tools', logo: './public/img/linetools.jpg' },
            { name: 'LINE Dictionary English-Thai', logo: './public/img/enth.png' },
            { name: 'LINE Dictionary Chinese-English', logo: './public/img/cnen.png' },
            { name: 'LINE SHOP', logo: './public/img/lineshop.png' },
        ]
    })
})
app.get('/', (req, res) => {
    res.sendFile('example.html', { root: path.resolve(__dirname, './')})
})
app.listen(3000)
