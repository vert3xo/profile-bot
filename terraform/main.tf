terraform {
  required_providers {
    heroku = {
      source  = "heroku/heroku"
      version = "~> 4.0"
    }
  }
}

provider "heroku" {
    email = var.heroku_credentials.email
    api_key = var.heroku_credentials.api_key
}

resource "heroku_app" "default" {
    name = "discord-profile-bot"
    region = "eu"
    buildpacks = ["heroku/nodejs"]
    config_vars = {
        PORT = var.port
    }
    sensitive_config_vars = {
      DISCORD_TOKEN = var.discord_token
      JWT_SECRET = var.jwt_secret
    }
}

resource "heroku_build" "default" {
    app = heroku_app.default.id

    source {
      url = "https://github.com/vert3xo/profile-bot/archive/refs/tags/1.1.0.tar.gz"
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

output "default_app_url" {
    value = "https://${heroku_app.default.name}.herokuapp.com"
}

variable "heroku_credentials" {
    type = map(string)
}

variable "discord_token" {
    type = string
}

variable "jwt_secret" {
  type = string
}

variable "port" {
    type = number
}
