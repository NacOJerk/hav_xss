### Build guide:

Run the following command:

```
docker build . -t xss-steal-cookie
```
This command will build the docker container and name it xss-steal-cookie


```
docker run -d -p8082:8082 --name steal-cookie xss-steal-cookie
```
This command will run the docker contianer in detach mode, it will expose port 8082 and name the container steal-cookie

The site will be available at
```
localhost:8082
```
