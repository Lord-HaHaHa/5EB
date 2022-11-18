<h1>Installation</h1>

1. Install Docker
2. Open Terminal
3. Go to the 5EB Folder (PS G:\Programming\5EB>)
4. Use Command "docker pull mariadb" to get the MariaDB image
5. Use Command "docker run --mount type=bind,source=$(pwd)/MariaDB,target="/docker-entrypoint-initdb.d" --name mariadb-5EB -p 3306:3306 -e MARIADB_ROOT_PASSWORD=my-secret-pw -e MARIADB_DATABASE=5EB -d mariadb:latest" to Start the SQL Server
6. Use Command "docker run --name phpmyadmin_5EB -d -e PMA_HOST=192.168.100.47 -p 8081:80 phpmyadmin" to Start phpmyadmin to have root access to the 5EB MariaDB

<h1>SETUP WEBSERVER:</h1>

1. Use Command 'npm start' in nodeapp folder

<h3>HOW TO DOCKER BUILD:</h3>

    docker build -t 5eb-dev .

<h3>HOW TO DOCKER RUN:</h3>

    docker run -d -p 8000:3000 --name 5eb-dev 5eb-dev

<h3>HOW TO ENABLE AUTO START / RESTART:</h3>

    docker update --restart=always 5eb-dev6
