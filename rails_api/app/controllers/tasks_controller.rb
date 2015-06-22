class TasksController < ApplicationController

  skip_before_filter :verify_authenticity_token

  def index
  	@tasks = Task.all
  	render json: @tasks
  end

  def create
  	@task = Task.create(title: params[:title],
  		description: params[:description],
  		deadline: params[:deadline],
  		urgency: params[:urgency],
  		status: params[:status],
  		point: params[:point])
  	render json: @task
  end
end
