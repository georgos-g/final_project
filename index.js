const express = require('express');
const app = express();
const compression = require('compression');

app.use(compression());

app.use('/static', express.static('static'));
app.use('/public', express.static('public'));
app.use('/assets', express.static('assets'));
app.use('/portfolio', express.static('portfolio'));
app.use('/public', express.static('public'));

if (process.env.NODE_ENV != 'production') {
    app.use(
        '/bundle.js',
        require('http-proxy-middleware')({
            target: 'http://localhost:8081/'
        })
    );
} else {
    app.use('/bundle.js', (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

app.get('*', function(req, res) {
    res.sendFile(__dirname + '/index_react.html');
});


  


app.listen(8080, function() {
    console.log("I'm listening.");
});
