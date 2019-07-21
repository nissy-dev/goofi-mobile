#!/bin/bash

if [ "$1" = "" ]
then
    echo "There is no argument for the Expo verison which you want to install"
    exit
fi

# set the verison you want to install
curl -O "https://dpq5q02fu5f55.cloudfront.net/Exponent-$1.tar.gz"
mkdir -p "bin/Exponent-$1.app"
tar -zxvf "Exponent-$1.tar.gz" -C "bin/Exponent-$1.app"
rm -rf "Exponent-$1.tar.gz"
