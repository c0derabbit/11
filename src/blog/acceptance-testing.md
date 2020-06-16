---
layout: post.njk
title:  "Acceptance testing with Cucumber and Capybara"
date:   2018-04-30
---

One of my first tasks as a developer was to migrate endless tests from Twist to [Cucumber](https://docs.cucumber.io). Since then, I have written and refactored countless more, but I never had to set up Cucumber testing from zero. Until now.<!-- more --> It was really not complicated, but it took me a while to get everything going. This is what I’ve come up with.

## Prerequisites
[Bundler](http://bundler.io/) — the Ruby equivalent of npm. Just `gem install bundler`.
phantomjs — get it from [homebrew](https://brew.sh): `brew install phantomjs`

## What to test?
I’m prioritising main user stories — Can they log in and out? Can they navigate the page? Do they see the right content? Are more items loaded after they scroll a table? Can they submit forms and create items (e.g. messages, events)? Do the actions they perform have the right effect? Can they view and download invoices? …and so forth. I have an excel sheet for them — this way, even non-coders can add (request) test cases; and it’s a good way to track progress.
One thing is for sure though: whenever something breaks, if it wasn’t tested before, I write a test for it.

## Setup
I will demo what I did for testing a simple sign in on our client-facing dashboard. I chose Selenium webdriver, because that’s what I’m used to, but [Poltergeist](https://github.com/teampoltergeist/poltergeist) looks very promising as well. I might try it out and compare experiences.

Our directory structure will look something like this:
```
.gitignore
.secrets
Gemfile
Rakefile
features/
	|-- sign.feature
	|-- step_definitions/
		|-- sign.rb
	|-- support/
		|-- env.rb
```

First of all, let’s be secure and not push secrets to GitHub, even if it’s a private repo. Let’s keep them local or on the CI. For this, we have a `.secrets` file that will hold our secrets. (Replace with your own – btw these creds are fake.)
```shell
export TEST_USER=kitten@cats-net.com
export TEST_PW=CorrectHorseBatteryStaple
```
Let’s put this file in our `.gitignore`, to avoid pushing it accidentally.
```shell
# .gitignore

.secrets
```

For JS developers, our `Gemfile` is basically what `package.json`’s `dependencies` or `requirements.txt` does. Once we have it, we can run `bundle install` and it installs all dependencies.
```rb
# Gemfile

source "https://rubygems.org"
gem 'rake'
group(:test) do
	gem 'cucumber'
  gem 'capybara'
  gem 'rspec'
  gem 'poltergeist'
  gem 'selenium-webdriver'
  gem 'chromedriver-helper'
end
```

I think about the `Rakefile` as the `scripts` part of a `package.json`.  
It enables us to call `rake features` from the command line, which in turn will run all our tests.
```rb
# Rakefile

require 'cucumber'
require 'cucumber/rake/task'

task default: :features

Cucumber::Rake::Task.new(:features) do |t|
  t.cucumber_opts = "--format pretty"
end
```

Some more configuration in `env.rb`, and we are good to go. Here, we register a webdriver for the tests to run against, and configure an `app_host`, which will be our base url.
```rb
# features/support/env.rb

require 'capybara'
require 'capybara/cucumber'

Capybara.register_driver :selenium do |app|
  Capybara::Selenium::Driver.new(app, :browser => :chrome)
end

Capybara.configure do |config|
  config.default_driver = :selenium
  config.app_host = 'https://my-awesome-pets.com'
end

World(Capybara)
```

## Ready for our first feature test?
Features are written in [Gherkin](https://github.com/cucumber/cucumber/wiki/Gherkin), an easy-to-read templating language that goes well with Cucumber.
```gherkin
# features/sign.feature

Feature: Sign in

  Scenario: Sign in and see cats
    Given I am on the Sign in page
    When I sign in
    Then I should see cats
```
These `Given`, `When` and `Then` steps are regular expressions, and they can be matched to step definitions like this:
```rb
# features/step_definitions/sign.rb

Given /^I am on the Sign in page$/ do
  visit('/sign-in') # we already have the base_url from env.rb
  expect(page).to have_content('Sign in') # let's check if this really works
end

And /^I sign in$/ do
  fill_in 'email', :with => $test_user
  fill_in 'password', :with => $test_pw
  find('button[type="submit"]').click
end

Then /^I should see (cats|dogs)$/ do |things|
  expect(page).to have_content(things) # in our case, it will look for 'cats'.
end
```
Read more about expects and other matchers [here](https://relishapp.com/rspec/rspec-expectations/docs/built-in-matchers).

That’s it, running `rake features` should fire up a Chrome browser, visit `my-awesome-pets.com`, sign in successfully, and report the results in the command line.
