### Build guide:

Run the following command:

```
docker build . -t xss-alert
```
This command will build the docker container and name it xss-alert


```
docker run -d -p8081:8081 --name alert xss-alert
```
This command will run the docker contianer in detach mode, it will expose port 8081 and name the container alert

The site will be available at
```
localhost:8081
```
