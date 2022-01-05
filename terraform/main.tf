terraform {
  required_providers {
    heroku = {
      source  = "heroku/heroku"
      version = "~> 4.0"
    }
  }
}

resource "heroku_app" "default" {
    name = "profile-bot"
    region = "eu"
    config_vars = {
        DISCORD_TOKEN = DISCORD_TOKEN
    }
}

resource "heroku_build" "default" {
    app = heroku_app.default.id
    buildpacks = ["heroku/nodejs"]

    source {
      url = "https://github.com/vert3xo/profile-bot/archive/refs/tags/1.0.0.tar.gz"
      version = "1.0.0"
    }
}

resource "heroku_formation" "default" {
    app = heroku_app.default.id
    type = "web"
    quantity = 1
    size = "free"
    depends_on = [
      heroku_build.default
    ]
}

variable "DISCORD_TOKEN" {
    type = string
}
