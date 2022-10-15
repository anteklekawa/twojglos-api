echo "Switch to master branch"
git checkout master

echo "Building app..."
npm run build

echo "Deploying..."
scp -r dist/* root@207.154.194.78:~/twojglos/

echo "Essa zrobione kox"