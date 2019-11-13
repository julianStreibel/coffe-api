const Gpio = require('onoff').Gpio;
const LED = new Gpio(4, 'out');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080;

app.use(cors({
    origin:"http://rp.local:3000"
}));

app.get('/On', function (req, res) {
    try {
        LED.writeSync(1)
        res.send('turned on')
    } catch (err) {
        console.error(err)
    }
});

app.get('/Off', function (req, res) {
    try {
        LED.writeSync(0)
        res.send('turned off')
    } catch (err) {
        console.error(err)
    }
})

app.get('/Status', function (req, res) {
    try {
        res.json({ status: LED.readSync() })
    } catch (err) {
        console.error(err)
    }
})


app.listen(port, function () {
    console.log('Example app listening on port 8080!');
});
