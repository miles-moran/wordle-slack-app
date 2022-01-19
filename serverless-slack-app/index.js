'use strict';

class ServerlessPlugin {
  constructor(serverless, options) {
    this.serverless = serverless;
    this.options = options;

    console.log('my god did this work')

    this.commands = {
      welcome: {
        usage: 'Helps you start your first Serverless plugin',
        lifecycleEvents: ['aws:deploy:finalize:cleanup', 'invoke:invoke'],
        options: {
          message: {
            usage:
              'Specify the message you want to deploy ' +
              '(e.g. "--message \'My Message\'" or "-m \'My Message\'")',
            required: true,
            shortcut: 'm',
          },
        },
      },
    };

    this.hooks = {
      'before:welcome:hello': this.beforeWelcome.bind(this),
      'welcome:hello': this.welcomeUser.bind(this),
      'welcome:world': this.displayHelloMessage.bind(this),
      'after:welcome:world': this.afterHelloWorld.bind(this),
    };
  }

  beforeWelcome() {
    this.serverless.cli.log('Hello from Serverless!');
  }

  welcomeUser() {
    console.log(this.serverless)
    this.serverless.cli.log('Your message:');
  }

  displayHelloMessage() {
    this.serverless.cli.log(`${this.options.message}`);
  }

  afterHelloWorld() {
    this.serverless.cli.log('Please come again!');
  }
}

module.exports = ServerlessPlugin;
