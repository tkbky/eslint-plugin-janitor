# eslint-plugin-janitor

[![Build Status](https://travis-ci.org/tkbky/eslint-plugin-janitor.svg?branch=master)](https://travis-ci.org/tkbky/eslint-plugin-janitor)

Janitor&#39;s favourites.

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-janitor`:

```
$ npm install eslint-plugin-janitor --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-janitor` globally.

## Usage

Add `janitor` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "janitor"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "janitor/spread-props": 2
    }
}
```

## Supported Rules

[spread-props](docs/rules/spread-props.md)
