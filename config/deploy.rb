require "rvm/capistrano"

set :user, "choochburger"
set :domain, "chrislyons.net"
set :applicationdir, "/srv/www/staging.chrislyons.net/cldn/"

set :rvm_type, :system

set :application, "cldn"
set :repository,  "https://github.com/choochburger/cldn.git"

set :scm, "git"

role :web, "chrislyons.net"                          # Your HTTP server, Apache/etc
role :app, "chrislyons.net"                          # This may be the same as your `Web` server
role :db,  "chrislyons.net", :primary => true # This is where Rails migrations will run

set :deploy_to, "/srv/www/staging.chrislyons.net/cldn/"
set :deploy_via, :export

ssh_options[:keys] = %w(/Users/chrislyons/.ssh/id_rsa)

default_run_options[:pty] = true

# if you want to clean up old releases on each deploy uncomment this:
after "deploy:restart", "deploy:cleanup"

# if you're still using the script/reaper helper you will need
# these http://github.com/rails/irs_process_scripts

# If you are using Passenger mod_rails uncomment this:
namespace :deploy do
  task :start, :roles => :app do
    run "touch #{current_release}/tmp/restart.txt"
  end

  task :stop, :roles => :app do
    # Do nothing.
  end

  desc "reload the database with seed data"
  task :seed do
    run "cd #{current_path}; bundle exec rake db:seed RAILS_ENV=#{rails_env}"
  end
end
