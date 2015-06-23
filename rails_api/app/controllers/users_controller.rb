class UsersController < ApplicationController
  
  skip_before_filter :verify_authenticity_token




  def index
  	@users = User.all
  	render json: @users
  end

  




  def create
  	@user = User.create(first_name: params[:first_name],
  		  last_name: params[:last_name],
  		  nickname: params[:nickname],
  		  email: params[:email],
  		  department: params[:department],
  		  password: params[:password])
  	render json: @user
  end

  

  def update
    @user = User.update(first_name: params[:first_name],
        last_name: params[:last_name],
        nickname: params[:nickname],
        email: params[:email],
        department: params[:department])
    render json: @user
  end

  



  def show
    @user = User.find(params[:id])
    render json: @user
  end
end
