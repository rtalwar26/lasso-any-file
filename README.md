# lasso-any-file

Lasso.js bundler to put any file/asset into output static directory

```shell
npm install --save lasso-any-file
```
# Example usage

In your lasso config 
---

```javascript
let lasso_config = {
    "outputDir" : "static",
    "plugins": [
        {
            "plugin":"lasso-any-file",
            "config":{
                "dir_name": "myfiles"  // This copies the bundled assets to static/myfiles
            }
        }
    ]
}
```

In your ***browser.json*** 
---

```javascript
{
  "dependencies": [
    {
      "path": "./path-to/song1.mp3",
      "type": "lasso-any-file",
      "out_dir": "songs" // copies song1.mp3 to static/myfiles/songs/song1.mp3
    },
    {
      "path": "./path-to/file1.pdf",
      "type": "lasso-any-file",
      "out_dir": "docs" // copies file1.pdf to static/myfiles/docs/file1.pdf
    }
  ]
}
```