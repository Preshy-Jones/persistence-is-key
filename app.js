const express = require('express');
const app = express()
const fs = require('fs');
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/api/delete', (req, res) => {

    fs.unlink('myjsonfile.json', function (err) {
        if (err) throw err;
        // if no error, file has been deleted successfully
        res.send('deleted successfully')
    });
    // fs.writeFile('myjsonfile.json', '', function () { console.log('done') })
    // res.send('all content deleted')
});

app.get('/api/list', (req, res) => {
    res.header("Content-Type", "text/plain");
    fs.readFile('myjsonfile.json', 'utf8', function readFileCallback(err, data) {
        if (err) {
            console.log(err);
        } else {
            obj = JSON.parse(data); //now it an object

            res.end(obj.words.toString())
        }
    });
});


app.get('/api/:something', (req, res) => {

    fs.access('myjsonfile.json', fs.F_OK, (err) => {
        if (err) {
            var obj = {
                words: []
            };
            obj.words.push(req.params.something);
            var json = JSON.stringify(obj);
            fs.writeFile('myjsonfile.json', json, 'utf8', function (err) {
                if (err) throw err;
                res.send('file created and word added')
            });

        } else {
            fs.readFile('myjsonfile.json', 'utf8', function readFileCallback(err, data) {
                if (err) {
                    console.log(err);
                } else {
                    obj = JSON.parse(data); //now it an object
                    obj.words.push(req.params.something); //add some data
                    json = JSON.stringify(obj); //convert it back to json
                    fs.writeFile('myjsonfile.json', json, 'utf8', err => console.log(err)); // write it back 
                    res.send('word added successfully')
                }
            });    // data = req.params.something;

        }
    })
    // fs.appendFile('words.txt', data, function (err) {
    //     if (err) throw err;
    //     res.send('success')
    //});
    // fs.writeFile('words.txt', data, err => console.log(err));
    // res.send('success')
    // db.push(req.params.something); 
    //res.json({ msg: db })
});



app.listen(3000, function () {
    console.log("started server on port 3000");
})

