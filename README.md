# CRUD Mock API Example

Example API for mocking a typescript base CRUD.

## Install requirements

```bash
sudo apt update
sudo apt install npm nodejs -y
```
## Deploy application

Application can be launched with the following script:
1. install requirements
2. build the application

```bash
npm install
npm run build
```

### Docker deployment

Application can be deployed also with docker. For that purpose, first is neccesary to build the image as follows:

```bash
docker build . -t [<your-dockerhub-user>/]mock-api-crud
```

### GitHub Actions deployment

There is a GitHub actions script to build the docker image on each push on main branch.

## Run application

For running directly the application in a "raw" way:

```bash
npm run start
```

However also you can start the application with docker as follows:

```bash
docker run [<your-dockerhub-user>/]mock-api-crud -p 80:<port to publish the API>
```

## Configuration

The configuration is performed via enviroment variables. This ones can be defined either in the Docker container  when deployed, or directly in the run enviroment of the application. Also this ones can be defined in an .env file.

The configuration variables are described in the following table:

| **Environment Variable** | **Default Value** | **Description**                                                                                                                                                                               |
|--------------------------|-------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **REDIRECT**             | false             | Specifies whether the server should redirect HTTP requests to HTTPS. False means no redirection should occur.                                                                                 |
| **CHARACTERS_FILE**      | characters.json   | Specifies the name of the JSON file containing data about characters in the API.                                                                                                              |
| **HTTP_PORT**            | 80                | Specifies the port number that the server should listen on for HTTP requests. Default port number for HTTP.                                                                                   |
| **HTTP_BIND**            | 0.0.0.0           | Specifies the IP address that the server should bind to for HTTP requests. Binds to all available IP addresses on the machine.                                                                |
| **HTTPS_PORT**           | 443               | Specifies the port number that the server should listen on for HTTPS requests. Default port number for HTTPS.                                                                                 |
| **HTTPS_BIND**           | 0.0.0.0           | Specifies the IP address that the server should bind to for HTTPS requests. Binds to all available IP addresses on the machine.                                                               |
| **HTTPS_CA_FILE**        | null              | Specifies the path to a file containing a trusted SSL/TLS CA certificate for client authentication. Null means the server may not use client authentication or may use a different mechanism. |
| **HTTPS_KEY_FILE**       | null              | Specifies the path to a file containing the SSL/TLS private key for the server. Null means the server may not use HTTPS or may use a different mechanism to secure connections.               |
| **HTTPS_CERT_FILE**      | null              | Specifies the path to a file containing the SSL/TLS certificate for the server. Null means the server may not use HTTPS or may use a different mechanism to secure connections.               |

## Another documentation

The file `characters.postman.json` has a postman collection to test the application. Also there is a file `swagger.yml` with the specification in openAPI format. 
Also for performing tests, with the command `npm run test` all tests are performed autmatically with jest.

## Disclaimer

Component developed by Francisco Pinto Santos (@GandalFran on GitHub) on 2022. For manteinance and bug reports please contact the developer at franpintosantos@gmail.com.
Copyright Francisco Pinto Santos 2023. All rights reserved. See license for details.