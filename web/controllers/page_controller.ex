defmodule CreepyFriends.PageController do
  use CreepyFriends.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
