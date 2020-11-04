#!/usr/bin/env sh
check_error()
{
    if [ ! $? -eq 0 ]; then
        echo "failed************"
        exit 1
    fi
}

BRANCH=main
ENV=$1
MAIN_DIR=telega
echo "Deploy script started"
if [ ! -d ${MAIN_DIR} ]; then
   echo "Cloning git repo"
   git clone https://github.com/SatanaCSharp/telega.git -b ${BRANCH}
   check_error
fi
cd ${MAIN_DIR} || exit
echo "Stopping pm2 instance"
pm2 stop all
#echo "Deleting pm2 instance"
#pm2 delete Telega
echo "Pulling repo"
git pull origin ${BRANCH}
check_error

echo "Copying env file"
cp /home/kirani/telega-ads/.env /home/kirani/${MAIN_DIR}/
check_error
echo "Remove old static server build"
rm -rf /home/kirani/telega/dist/*
echo "Installing sever dependencies"
yarn install
yarn build
check_error
echo "Executing migrations"
yarn db:migrate:prod
check_error
echo "Remove old static build"
rm -rf /home/kirani/telega/client/build/*
cd client || exit
yarn install
yarn build
cd ../
#unzip /home/kirani/telega/client/static.zip -d /home/kirani/telega/client/build/
#rm -rf /home/kirani/telega/client/static.zip
echo "Starting pm2 instance"
pm2 start pm2.config.json --env "${ENV}"
check_error
echo "Deploy script finished"
exit 0
