const express = require('express');
const {exec} = require('child_process');


const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
})
app.get('/', (req, res) => {
    res.send('You have contacted the other side of the program - the sun never sets here :)\nCall a valid endpoint to get a proper response');
    // exec('docker exec 488859e4bce4 /home/hifrog /home/example/hifrogDemo/sin_cos.c', (error, stdout, stderr) => {
    //     if (error) {
    //         return res.status(500).send(`Error: ${error.message}`);
    //     }
    //     let output = '';
    //     if (stderr) {
    //     output += `Stderr: ${stderr}\n\n`;
    //     }
    //     if (stdout) {
    //     output += stdout;
    //     }
    //     res.send(`${stdout}`); // Using <pre> for better formatting in browser
    // });
});

app.get('/runHifrog', (req, res) => {
    const fileName = req.query.fileName;
    exec('docker exec 488859e4bce4 /home/hifrog /home/'+fileName, { maxBuffer: 1024 * 1024 * 10 }, (error, stdout, stderr) => {
        if (error) {
            if(error.message.includes('Error opening file')){
                return res.status(404).send(`Error: ${error.message}`);
            }
            return res.status(500).send(`Error: ${error.message}`);
        }
        let output = '';
        if (stderr) {
        output += `Stderr: ${stderr}\n\n`;
        }
        if (stdout) {
        output += stdout;
        }
        res.send(`${output}`);
    });
    
})

app.get('/deleteSummary', (req, res) => {
    exec('docker exec 488859e4bce4 rm __summaries', (error, stdout, stderr) => {
        if (error) {
            if(error.message.includes('No such file or directory')){
                return res.status(404).send(`Error: ${error.message}`);}
            return res.status(500).send(`Error: ${error.message}`);
        }
        let output = '';
        if (stderr) {
        output += `Stderr: ${stderr}\n\n`;
        }
        if (stdout) {
        output += stdout;
        }
        res.send(`${stdout}`); 
    })
})

app.get('/viewSummary', (req, res) => {
    exec('docker exec 488859e4bce4 cat __summaries', (error, stdout, stderr) => {
        if (error) {
            if(error.message.includes('No such file or directory')){
                return res.status(404).send(`Error: ${error.message}`);}
            return res.status(500).send(`Error: ${error.message}`);
        }
        let output = '';
        if (stderr) {
        output += `Stderr: ${stderr}\n\n`;
        }
        if (stdout) {
        output += stdout;
        }
        res.send(`${stdout}`); 
    })
})

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running');
})