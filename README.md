# sr-condition-wercker

[semantic-release](https://github.com/semantic-release/semantic-release) verifyConditions plugin for wercker

## Usage

Install as devDependencies:

```
$ npm install --save-dev sr-condition-wercker
```

Set `verifyConditions` in your package.json:

```json
"release": {
    "verifyConditions": "sr-condition-wercker"
}
```

You are recommended to use [io-monad/semantic-release step](https://app.wercker.com/#applications/57251c8a742fcc85460eb324/tab/details/) in your wercker.yml:

```
box: node
build:
  steps:
    - npm-install
    - npm-test
    - io-monad/semantic-release:
        github_token: $GH_TOKEN
        npm_token: $NPM_TOKEN
```

`GH_TOKEN` and `NPM_TOKEN` are generated by [semantic-release-cli](https://github.com/semantic-release/cli) and should be set as [environment variables](http://devcenter.wercker.com/docs/environment-variables/index.html) in your wercker project settings.

## License

[The MIT License](LICENSE)