## Installation
Make sure you have Docker installed and running, then:
```shell
npm install
docker build -t mocker .
docker run -d -p 8080:8080 mocker
```

If you want to run this locally, and not in a Docker container:
```shell
npm install
npm start
```

## Configuration
Mock cases can be added to `Mockerfile.json`.
