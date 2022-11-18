docker stop 5eb-dev
docker container rm 5eb-dev
docker image rm 5eb-dev

docker build -t 5eb-dev .
docker run -d -p 8000:3000 --name 5eb-Dev 5eb-dev
docker update --restart=always 5eb-deb