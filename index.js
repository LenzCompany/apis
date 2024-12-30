import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';

import apirouter from './router/api.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Set the views directory

app.get('/swagger.json', (req, res) => {
    res.sendFile(path.join(__dirname, 'swagger.json'))
})
app.get('/', (req, res) => {
    res.send(`<!doctype html> <!-- Important: must specify -->
<html>
<head>
  <meta charset="utf-8"> <!-- Important: rapi-doc uses utf8 characters -->
  <script type="module" src="https://unpkg.com/rapidoc/dist/rapidoc-min.js"></script>
</head>
<body>
  <rapi-doc
    spec-url="/swagger.json"
    theme = "dark"
  > </rapi-doc>
</body>
</html>`)
});

app.use('/api', apirouter)
app.listen('8080', () => {
    console.log(`Online!`)
})

export default app