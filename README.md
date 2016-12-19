# pokemon-betting-api-yellow
[![Build Status](https://travis-ci.org/mariokaufmann/pokemon-betting-api-yellow.svg?branch=master)](https://travis-ci.org/mariokaufmann/pokemon-betting-api-yellow)

## Dockerhub container
With every commit to develop a docker image is built on dockerhub. The API can also be run as a docker container by running the following commands:

Pull the image:
```
docker pull mariokaufmann/pokemon-betting-api-yellow
```

Run the image:

```
docker run -d -p 5000:5000 mariokaufmann/pokemon-betting-api-yellow
```

With the default docker machine and configuration the API is then accessible under: http://192.168.99.100:5000/

## Development api
The development api is deployed with [travis-ci](https://travis-ci.org/mariokaufmann/pokemon-betting-api-yellow) with every commit to develop.

http://163.172.151.151/

## Pokéapi
The pokéapi is run on the server on a different port:

http://163.172.151.151:8080/

## Mock api
The mock api is generated from [swagger.yaml](swagger.yaml)

https://private-54f7c-pokemonbettingapiyellow1.apiary-mock.com

## Documentation
The documentation is generated from [swagger.yaml](swagger.yaml)

http://docs.pokemonbettingapiyellow1.apiary.io
