package = "voxgig-sdk-brasil"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/brasil-sdk.git"
}
description = {
  summary = "Brasil SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["brasil_sdk"] = "brasil_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
