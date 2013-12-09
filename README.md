frontend
========

### Install system requirements

  First of all, install nodejs, then:

    npm install -g grunt grunt-cli

### Install dependencies

    npm install

### Start application

    grunt

### Last but not least

Open browser at the location specified in grunt output.

## Heroku

You can deploy to heroku this way:

    # you may use a different name here:
    heroku create littleexplorers-frontend --region eu 
    git push heroku master

After a ton of output, you will be able to connect to your web deployed app just typing the url prompted from git at execution end, in example:

    http://littleexplorers-frontend.herokuapp.com
