npm install
cd public
npm install
cd ..
forever stopall
forever start app.js
cd public
ng build --prod
cd dist/staff-planner
pm2 kill
pm2 start /usr/local/bin/http-server --name staff-plan -- -p 8080 -d false