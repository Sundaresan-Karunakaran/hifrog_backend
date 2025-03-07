const express = require('express');
const {exec} = require('child_process');


const app = express();

app.get('/', (req, res) => {
    exec('docker exec 488859e4bce4 /home/hifrog /home/example/hifrogDemo/sin_cos.c', (error, stdout, stderr) => {
        if (error) {
            return res.status(500).send(`Error: ${error.message}`);
        }
        let output = '';
        if (stderr) {
        output += `Stderr: ${stderr}\n\n`;
        }
        if (stdout) {
        output += stdout;
        }
        res.send(`${stdout}`); // Using <pre> for better formatting in browser
    });
});


app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running');
})