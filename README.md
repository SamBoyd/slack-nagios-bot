# Nagios Slack Bot

Gives you the ease of sending commands to Nagios via your team's Slack channel. Currently it supports:

- acknowledging a service problem
- adding downtime to a service
- adding downtime to a host

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. This project currently has not been tested in a production environment, so if you choose to do so please proceed with care.

### Prerequisites

Nagios-Slack-Bot requires [nagios-api](https://github.com/zorkian/nagios-api) to be running with your Nagios service. Nagios Api is a service that sits on top of nagios and provides a http interface.

### Installing

How to get the bot running in your local environment

Clone the repo
```
git clone git@github.com:SamBoyd/slack-nagios-bot.git
```

Change directory
```
cd slack-nagios-bot
```


Install the dependencies

```
npm install
```

Set the correct apiToken in auth.js. You can check out the slack docs for creating bot users [here](https://api.slack.com/bot-users)
 
Your auth.js should look something like this
```
export default {
    'apiToken': 'xoxp-XXXXXXXX-XXXXXXXX-XXXXX'
};

```
In nagiosRequest.js and nagiosServiceApi.js replace *http://example.com* with the hostname of your Nagios service

Start the bot

```
npm start
```

After inviting your bot to a channel, you should be able to acknowledge using 

```
@nagiosbot Acknowledge your-service-name on your-host
```

## Running the tests

Run tests with npm

```
npm test
```

## Built With

* [Botkit](https://github.com/howdyai/botkit) - The bot framework used
* [npm](https://www.npmjs.com) - Package Management

## Authors

* **Sam Boyd** - *Initial work* - [Unruly](https://github.com/PurpleBooth)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

