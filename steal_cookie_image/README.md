### Build guide:

Run the following command:

```
docker build . -t xss-steal-cookie-image
```
This command will build the docker container and name it xss-steal-cookie-image


```
docker run -d -p8083:8083 --name steal-cookie-image xss-steal-cookie-image
```
This command will run the docker contianer in detach mode, it will expose port 8083 and name the container steal-cookie-image

The site will be available at
```
localhost:8083
```
