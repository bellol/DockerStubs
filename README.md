## Installation
Make sure you have Docker installed and running, then:
```shell
npm install
docker build -t mocker .
docker run -d -p 8080:8080 mocker
```
## Configuration
Mock cases can be added to `Mockerfile.json`. 

## TODO
* Add request/response condition checking
* Add DELETE/PUT support
* Add SOAP support
