### …or create a new repository on the command line

**origin代表是远程地址的意思**

**master代表的是本地主分支意思**

```
echo "# cesium_app" >> README.md
git init
git add README.md
git commit -m "first commit"

git remote add origin git@github.com:Speacnow/cesium_app.git
git push -u origin m
```

### …or push an existing repository from the command line



```
git remote add origin git@github.com:Speacnow/cesium_app.git
git branch -M main
git push -u origin main
```