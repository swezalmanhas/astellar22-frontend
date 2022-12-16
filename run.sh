docker build -t astellar-app .
docker run -d --name astellar -p 7000:80 astellar-app
