const fs = require("fs");
const path = require("path");
const DocBlock = require("docblock");
const { Item } = require("postman-collection");
const Collection = require('postman-collection').Collection;

const server = process.env.SERVER || 'localhost';
const port = process.env.PORT || 3000;


const myCollection = new Collection({
    name: "Song APIs",
    variable: [
        {
            key: 'server',
            value: server,
            type: 'string'
        },
        {
            key: 'port',
            value: port,
            type: 'number'
        }
    ],
});

const routerFile = fs.readFileSync(path.resolve(__dirname, "../routes/songs.js"));
const docblock = new DocBlock();
const result = docblock.parse(routerFile, 'js');

const typeRegex = /(?<=\{)(.*?)(?=\})/g;
const typedefs = result.filter(r => r.tags.typedef).map(t => ({ 
    typedef: t.tags.typedef.split(' ')[1], 
    params: t.tags.params,
    type: t.tags.typedef.match(typeRegex) && t.tags.typedef.match(typeRegex)[0]
}));
console.log(typedefs);

const routes = result.filter(r => r.tags.route);
console.log(routes);

const getResponses = (route) => {
    const responses = [];
    for (const [key, value] of Object.entries(route.tags)) {
        if(key.startsWith('http')){
            const matches = value.match(typeRegex);
            responses.push({
                code: parseInt(key.substring(key.indexOf('http') + 4, key.length)),
                name: key,
                returns: matches[0],
                contentType: matches[1]
            });
        }
    }
    return responses;
}
console.log(getResponses(routes[0]));

const buildRoute = (name, url, description, method, body, contentType, responses) => {
    return new Item({
        name: name,
        request: {
            url: `{{server}}:{{port}}${url}`,
            description: description,
            method: method,
            header: [{
                'key': 'content-type',
                'value': contentType
            }],
            body: {
                mode: "raw",
                raw: body
            },
        },
        response: responses
    });
}

routes.map(route => {
    const responses = getResponses(routes[0]);
    const item = buildRoute(route.name, route.tags.route, route.description, route.tags.method, route.tags.examples[0], route.tags.contenttype, responses );
    myCollection.items.add(item);
});

fs.writeFileSync('postmancollection.json', JSON.stringify(myCollection, null, 2));